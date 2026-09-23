export type ProductCategory = 'celulares' | 'computadoras' | 'zapatos';

export interface MerchantListing {
  id: string;
  merchantName: string; // e.g., Amazon, MercadoLibre, Best Buy, eBay, B&H, Nike Store, Newegg
  merchantLogo: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number; // 1-5
  reviewCount: number;
  shipping: string; // e.g., "Envío Gratis", "$5.99"
  stockStatus: 'In Stock' | 'Low Stock' | 'Pre-order';
  productUrl: string;
  verifiedMerchant: boolean;
}

export interface PriceHistoryPoint {
  date: string; // YYYY-MM
  amazonPrice?: number;
  bestbuyPrice?: number;
  ebayPrice?: number;
  mercadoLibrePrice?: number;
  [key: string]: number | string | undefined;
}

export interface PhoneSpecs {
  processor: string; // e.g., Snapdragon 8 Gen 3, Apple A18 Pro
  ram: string; // e.g., 12GB LPDDR5X
  storage: string; // e.g., 256GB NVMe
  screen: string; // e.g., 6.7" LTPO OLED 120Hz 2600 nits
  camera: string; // e.g., 50MP Main OIS + 50MP Ultrawide + 50MP Periscope 5x
  battery: string; // e.g., 5000 mAh + 90W Fast Charge
  os: string; // e.g., Android 14 / iOS 18
  buildMaterial: string; // e.g., Titanium Frame, Victus 2 Glass
}

export interface ComputerSpecs {
  processor: string; // e.g., Intel Core i7-14700HX / Apple M3 Pro / Ryzen 7 8845HS
  ram: string; // e.g., 16GB DDR5 5600MHz
  storage: string; // e.g., 1TB PCIe 4.0 NVMe SSD
  gpu: string; // e.g., NVIDIA RTX 4060 8GB / Integrated M3 Pro 18-Core
  screen: string; // e.g., 15.6" QHD+ 165Hz IPS 100% sRGB / 14.2" Liquid Retina XDR
  batteryLife: string; // e.g., 8-10 horas / 18 horas
  weight: string; // e.g., 1.4 kg / 2.3 kg
  os: string; // e.g., Windows 11 Home / macOS Sonoma
}

export interface ShoeSpecs {
  material: string; // e.g., Malla Transpirable Flyknit / Cuero Genuino / Gore-Tex
  cushioning: string; // e.g., Espuma ZoomX / Boost / GEL Technology / Fresh Foam X
  soleType: string; // e.g., Goma Vibram / Caucho Antiabrasión Continental
  drop: string; // e.g., 8mm / 10mm / Zero Drop
  useCase: string; // e.g., Running Maratón, Entrenamiento Diario, Casual / Urbano
  weightPerShoe: string; // e.g., 260g (Talla 42)
  breathabilityScore: number; // 1-10
  durabilityRating: number; // 1-10
}

export type AnySpecs = PhoneSpecs | ComputerSpecs | ShoeSpecs;

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  imageUrl: string;
  summary: string;
  overallRating: number; // 1-5
  totalReviewsCount: number;
  
  // Custom ML Scores (calculated by Hybrid ML Engine)
  qpiScore: number; // Quality-Price Index (0 - 100)
  qualityScore: number; // Specs & materials score (0 - 100)
  valueGrade: 'A+' | 'A' | 'B+' | 'B' | 'C';
  lstmTrend: 'DIP_EXPECTED' | 'STABLE' | 'RISING' | 'HISTORIC_LOW';
  
  specs: AnySpecs;
  listings: MerchantListing[];
  priceHistory: PriceHistoryPoint[];
  
  aiPros: string[];
  aiCons: string[];
  targetAudience: string;
  
  // ML Feature Vectors (for inspection)
  transformerEmbeddings?: number[]; // [dim 8]
  cnnVisualFeatures?: number[]; // [dim 8]
  lstmHiddenState?: number[]; // [dim 4]
}

export interface MLWeights {
  priceWeight: number; // 0 - 100
  ratingWeight: number; // 0 - 100
  qualityWeight: number; // 0 - 100
  specsWeight: number; // 0 - 100
  merchantTrustWeight: number; // 0 - 100
}

export interface SearchFilterState {
  category: ProductCategory | 'all';
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: 'qpi' | 'price_asc' | 'price_desc' | 'rating' | 'quality';
  selectedBrand: string;
}

export interface CustomEvaluationRequest {
  title: string;
  category: ProductCategory;
  descriptionText: string;
  imageUrl?: string;
  declaredPrice: number;
  sourceUrl?: string;
}

export interface ArchitectureDetail {
  id: string;
  name: string;
  type: 'Transformer' | 'CNN' | 'LSTM' | 'Gradient Boosting / ML';
  role: string;
  technicalJustification: string;
  inputTensorShape: string;
  outputTensorShape: string;
  mathematicalFormula: string;
  hyperparameters: Record<string, string | number>;
}

// Genetic Algorithm Types & Structures
export interface GeneticParams {
  populationSize: number; // e.g. 40, 60, 100
  generations: number; // e.g. 30, 50, 80
  mutationRate: number; // 0.05 to 0.25
  crossoverRate: number; // 0.70 to 0.95
  elitismCount: number; // e.g. 2 to 6
  selectionMethod: 'tournament' | 'roulette' | 'rank';
}

export type UserPriorityProfile = 'balanced' | 'power' | 'budget_hunter' | 'trust_speed';

export interface UserPurchaseCriteria {
  category: ProductCategory | 'all';
  maxBudget: number;
  priorityProfile: UserPriorityProfile;
  minRating: number;
  preferVerifiedOnly: boolean;
  preferFreeShipping: boolean;
  urgencyDays: number;
}

export interface ChromosomeGenes {
  priceSensitivity: number; // [0, 1]
  specsImportance: number; // [0, 1]
  qualityFocus: number; // [0, 1]
  merchantTrustWeight: number; // [0, 1]
  timingTrendWeight: number; // [0, 1]
  shippingSpeedWeight: number; // [0, 1]
}

export interface Chromosome {
  id: string;
  productId: string;
  listingId: string;
  genes: ChromosomeGenes;
  fitness: number;
  rawMetrics: {
    budgetEfficiency: number; // 0-100
    specsScore: number; // 0-100
    trustScore: number; // 0-100
    timingScore: number; // 0-100
    penalty: number;
  };
}

export interface GenerationSnapshot {
  generation: number;
  bestFitness: number;
  averageFitness: number;
  worstFitness: number;
  diversityIndex: number; // Population variance
  bestChromosome: Chromosome;
}

export interface DetectedUserPreferences {
  priceWeight: number; // %
  specsWeight: number; // %
  qualityWeight: number; // %
  merchantTrustWeight: number; // %
  timingWeight: number; // %
  detectedPersona: string;
  tradeoffReason: string;
}

export interface ParetoSolution {
  rank: number;
  product: Product;
  listing: MerchantListing;
  fitness: number;
  title: string;
  price: number;
  savingsVsBudget: number;
  tradeoffLabel: string;
  highlights: string[];
}

export interface CartItem {
  productId: string;
  productName: string;
  brand: string;
  category: ProductCategory;
  imageUrl: string;
  merchantName: string;
  merchantLogo?: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  qpiScore: number;
}

export interface PurchaseOrder {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  createdAt: string;
  status: 'completada' | 'procesando';
}

export interface IntelligentSearchAnalysis {
  userQuery: string;
  detectedNeed: string;
  explicitRequirements: string[];
  implicitRequirements: string[];
  rentabilityStrategy: string;
  suggestedCategory: ProductCategory | 'all';
  confidenceScore: number;
}

export interface IntelligentRecommendation {
  product: Product;
  bestOffer: MerchantListing;
  matchScore: number;
  matchReason: string;
  prosForUser: string[];
  rentabilityTag: string;
}

export interface GeneticOptimizationResult {
  generationsHistory: GenerationSnapshot[];
  bestChromosome: Chromosome;
  bestProduct: Product;
  bestListing: MerchantListing;
  paretoSolutions: ParetoSolution[];
  detectedPreferences: DetectedUserPreferences;
  totalEvaluations: number;
  executionTimeMs: number;
  convergedAtGen: number;
}
