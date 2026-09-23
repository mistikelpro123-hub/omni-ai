import { Product, MLWeights } from '../types/product';

export const DEFAULT_ML_WEIGHTS: MLWeights = {
  priceWeight: 35,
  ratingWeight: 25,
  qualityWeight: 20,
  specsWeight: 10,
  merchantTrustWeight: 10
};

/**
 * Calculates a normalized Quality-Price Index (QPI Score from 0 to 100)
 * based on user custom hyperparameter weights or default weights.
 */
export function calculateProductQPI(
  product: Product,
  weights: MLWeights = DEFAULT_ML_WEIGHTS
): {
  qpiScore: number;
  priceScore: number;
  ratingScore: number;
  qualityScoreNormalized: number;
  merchantTrustScore: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C';
} {
  // 1. Minimum price across available listings
  const minPrice = Math.min(...product.listings.map(l => l.price));
  
  // Reference category baselines for price normalization
  let categoryBaselineMaxPrice = 1500;
  if (product.category === 'celulares') categoryBaselineMaxPrice = 1400;
  else if (product.category === 'computadoras') categoryBaselineMaxPrice = 2200;
  else if (product.category === 'zapatos') categoryBaselineMaxPrice = 220;

  // Price Score (Inverted: lower price relative to benchmark category yields higher score)
  // S_price = 100 * (1 - (minPrice / categoryBaselineMaxPrice)^0.85)
  const priceRatio = Math.min(1, minPrice / categoryBaselineMaxPrice);
  const priceScore = Math.max(10, Math.round(100 * (1 - Math.pow(priceRatio, 0.75))));

  // Rating Score (Scale 1-5 to 0-100)
  const ratingScore = Math.round((product.overallRating / 5) * 100);

  // Quality Score (0-100)
  const qualityScoreNormalized = product.qualityScore;

  // Merchant Trust Score (based on verified merchants and review count)
  const verifiedListingsCount = product.listings.filter(l => l.verifiedMerchant).length;
  const merchantTrustScore = Math.min(100, Math.round((verifiedListingsCount / product.listings.length) * 80 + 20));

  // Compute total normalized weight sum
  const totalWeightSum =
    weights.priceWeight +
    weights.ratingWeight +
    weights.qualityWeight +
    weights.specsWeight +
    weights.merchantTrustWeight;

  const wP = weights.priceWeight / totalWeightSum;
  const wR = weights.ratingWeight / totalWeightSum;
  const wQ = weights.qualityWeight / totalWeightSum;
  const wS = weights.specsWeight / totalWeightSum;
  const wT = weights.merchantTrustWeight / totalWeightSum;

  const rawQpi =
    priceScore * wP +
    ratingScore * wR +
    qualityScoreNormalized * wQ +
    qualityScoreNormalized * wS +
    merchantTrustScore * wT;

  const qpiScore = Math.min(99, Math.max(30, Math.round(rawQpi)));

  let grade: 'A+' | 'A' | 'B+' | 'B' | 'C' = 'B';
  if (qpiScore >= 93) grade = 'A+';
  else if (qpiScore >= 88) grade = 'A';
  else if (qpiScore >= 82) grade = 'B+';
  else if (qpiScore >= 75) grade = 'B';
  else grade = 'C';

  return {
    qpiScore,
    priceScore,
    ratingScore,
    qualityScoreNormalized,
    merchantTrustScore,
    grade
  };
}

/**
 * Predicts price tendency (LSTM Temporal Model simulation)
 */
export function predictLSTMPriceTrend(priceHistory: { date: string; amazonPrice?: number; bestbuyPrice?: number; mercadoLibrePrice?: number; [key: string]: any }[]): {
  trend: 'DIP_EXPECTED' | 'STABLE' | 'RISING' | 'HISTORIC_LOW';
  confidence: number;
  predicted30DayPrice: number;
  discountPercentage: number;
} {
  if (!priceHistory || priceHistory.length === 0) {
    return { trend: 'STABLE', confidence: 0.85, predicted30DayPrice: 100, discountPercentage: 0 };
  }

  // Get average price per month
  const monthlyAverages = priceHistory.map(ph => {
    const prices = Object.entries(ph)
      .filter(([k, v]) => k.includes('Price') && typeof v === 'number')
      .map(([_, v]) => v as number);
    if (prices.length === 0) return 0;
    return prices.reduce((a, b) => a + b, 0) / prices.length;
  }).filter(p => p > 0);

  if (monthlyAverages.length < 2) {
    return { trend: 'STABLE', confidence: 0.85, predicted30DayPrice: monthlyAverages[0] || 100, discountPercentage: 0 };
  }

  const initialPrice = monthlyAverages[0];
  const currentPrice = monthlyAverages[monthlyAverages.length - 1];
  const priceChangeRatio = (currentPrice - initialPrice) / initialPrice;

  const recentDiff = monthlyAverages[monthlyAverages.length - 1] - monthlyAverages[monthlyAverages.length - 2];

  let predicted30DayPrice = Math.round(currentPrice + recentDiff * 0.7);
  let trend: 'DIP_EXPECTED' | 'STABLE' | 'RISING' | 'HISTORIC_LOW' = 'STABLE';

  if (priceChangeRatio <= -0.18) {
    trend = 'HISTORIC_LOW';
  } else if (recentDiff < -10) {
    trend = 'DIP_EXPECTED';
  } else if (recentDiff > 10) {
    trend = 'RISING';
  } else {
    trend = 'STABLE';
  }

  const discountPercentage = Math.round(Math.max(0, ((initialPrice - currentPrice) / initialPrice) * 100));

  return {
    trend,
    confidence: 0.92,
    predicted30DayPrice,
    discountPercentage
  };
}
