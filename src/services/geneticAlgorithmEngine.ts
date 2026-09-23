import {
  Product,
  MerchantListing,
  GeneticParams,
  UserPurchaseCriteria,
  Chromosome,
  ChromosomeGenes,
  GenerationSnapshot,
  DetectedUserPreferences,
  ParetoSolution,
  GeneticOptimizationResult
} from '../types/product';
import { INITIAL_PRODUCTS_DATASET } from '../data/productsDatabase';

export const DEFAULT_GENETIC_PARAMS: GeneticParams = {
  populationSize: 60,
  generations: 40,
  mutationRate: 0.12,
  crossoverRate: 0.85,
  elitismCount: 3,
  selectionMethod: 'tournament'
};

export const DEFAULT_PURCHASE_CRITERIA: UserPurchaseCriteria = {
  category: 'all',
  maxBudget: 850,
  priorityProfile: 'balanced',
  minRating: 4.0,
  preferVerifiedOnly: true,
  preferFreeShipping: true,
  urgencyDays: 7
};

/**
 * Creates random chromosome genes normalized between 0 and 1
 */
function createRandomGenes(criteria: UserPurchaseCriteria): ChromosomeGenes {
  // Bias initialization slightly towards user profile to give a realistic starting search space
  let basePrice = 0.5;
  let baseSpecs = 0.5;
  let baseTrust = 0.5;

  if (criteria.priorityProfile === 'budget_hunter') {
    basePrice = 0.8;
    baseSpecs = 0.3;
  } else if (criteria.priorityProfile === 'power') {
    basePrice = 0.3;
    baseSpecs = 0.85;
  } else if (criteria.priorityProfile === 'trust_speed') {
    baseTrust = 0.85;
  }

  const jitter = () => Math.max(0.05, Math.min(0.95, (Math.random() - 0.5) * 0.4));

  return {
    priceSensitivity: Math.max(0.05, Math.min(0.95, basePrice + jitter())),
    specsImportance: Math.max(0.05, Math.min(0.95, baseSpecs + jitter())),
    qualityFocus: Math.max(0.05, Math.min(0.95, 0.5 + jitter())),
    merchantTrustWeight: Math.max(0.05, Math.min(0.95, baseTrust + jitter())),
    timingTrendWeight: Math.max(0.05, Math.min(0.95, 0.4 + jitter())),
    shippingSpeedWeight: Math.max(0.05, Math.min(0.95, criteria.preferFreeShipping ? 0.7 : 0.4 + jitter()))
  };
}

/**
 * Filter available products according to criteria
 */
export function getEligibleProducts(
  products: Product[],
  criteria: UserPurchaseCriteria
): Product[] {
  let list = products;
  if (criteria.category !== 'all') {
    list = list.filter(p => p.category === criteria.category);
  }
  if (list.length === 0) {
    list = products; // Fallback so population is never empty
  }
  return list;
}

/**
 * Generates an initial population of chromosomes
 */
export function initializePopulation(
  params: GeneticParams,
  criteria: UserPurchaseCriteria,
  products: Product[]
): Chromosome[] {
  const eligibleProducts = getEligibleProducts(products, criteria);
  const population: Chromosome[] = [];

  for (let i = 0; i < params.populationSize; i++) {
    const randomProduct = eligibleProducts[Math.floor(Math.random() * eligibleProducts.length)];
    const randomListing = randomProduct.listings[Math.floor(Math.random() * randomProduct.listings.length)];

    const genes = createRandomGenes(criteria);

    const chromosome: Chromosome = {
      id: `chrom-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 5)}`,
      productId: randomProduct.id,
      listingId: randomListing.id,
      genes,
      fitness: 0,
      rawMetrics: {
        budgetEfficiency: 0,
        specsScore: 0,
        trustScore: 0,
        timingScore: 0,
        penalty: 0
      }
    };

    population.push(chromosome);
  }

  return population;
}

/**
 * Evaluates the fitness function for a chromosome against user criteria
 */
export function evaluateFitness(
  chromosome: Chromosome,
  criteria: UserPurchaseCriteria,
  productMap: Map<string, Product>
): Chromosome {
  const product = productMap.get(chromosome.productId);
  if (!product) {
    return {
      ...chromosome,
      fitness: 1,
      rawMetrics: { budgetEfficiency: 0, specsScore: 0, trustScore: 0, timingScore: 0, penalty: 100 }
    };
  }

  const listing = product.listings.find(l => l.id === chromosome.listingId) || product.listings[0];

  // 1. Budget Efficiency & Penalty
  const price = listing.price;
  let budgetEfficiency = 0;
  let penalty = 0;

  if (price <= criteria.maxBudget) {
    const savingsRatio = (criteria.maxBudget - price) / criteria.maxBudget;
    // Reward savings non-linearly (diminishing returns)
    budgetEfficiency = Math.min(100, Math.round(55 + 45 * Math.pow(savingsRatio, 0.65)));
  } else {
    // Quadratic penalty for exceeding budget
    const overspendRatio = (price - criteria.maxBudget) / criteria.maxBudget;
    penalty += Math.min(80, Math.round(overspendRatio * 180));
    budgetEfficiency = Math.max(0, 50 - penalty);
  }

  // 2. Specifications & Performance Score
  let specsScore = product.qualityScore; // 0-100
  if (criteria.priorityProfile === 'power') {
    specsScore = Math.min(100, Math.round(specsScore * 1.15));
  } else if (criteria.priorityProfile === 'budget_hunter') {
    specsScore = Math.round(specsScore * 0.9);
  }

  // 3. Merchant Trust & Delivery Score
  let trustScore = (listing.rating / 5) * 50;
  if (listing.verifiedMerchant) trustScore += 25;
  if (listing.shipping.toLowerCase().includes('gratis') || listing.shipping.toLowerCase().includes('free')) {
    trustScore += 15;
  }
  if (criteria.preferVerifiedOnly && !listing.verifiedMerchant) {
    penalty += 20;
  }
  if (criteria.minRating && product.overallRating < criteria.minRating) {
    penalty += (criteria.minRating - product.overallRating) * 15;
  }
  trustScore = Math.min(100, Math.max(10, Math.round(trustScore)));

  // 4. Market Timing / LSTM Trend Score
  let timingScore = 50;
  if (product.lstmTrend === 'HISTORIC_LOW') timingScore = 95;
  else if (product.lstmTrend === 'DIP_EXPECTED') timingScore = 80;
  else if (product.lstmTrend === 'STABLE') timingScore = 55;
  else if (product.lstmTrend === 'RISING') timingScore = 30;

  // 5. Chromosome Gene Weighted Phenotype Combination
  const genes = chromosome.genes;
  const totalGeneWeight =
    genes.priceSensitivity +
    genes.specsImportance +
    genes.qualityFocus +
    genes.merchantTrustWeight +
    genes.timingTrendWeight +
    genes.shippingSpeedWeight;

  const wP = genes.priceSensitivity / totalGeneWeight;
  const wS = genes.specsImportance / totalGeneWeight;
  const wQ = genes.qualityFocus / totalGeneWeight;
  const wT = genes.merchantTrustWeight / totalGeneWeight;
  const wTime = genes.timingTrendWeight / totalGeneWeight;
  const wShip = genes.shippingSpeedWeight / totalGeneWeight;

  let baseCombinedFitness =
    budgetEfficiency * wP +
    specsScore * wS +
    (product.qpiScore || 75) * wQ +
    trustScore * (wT + wShip * 0.5) +
    timingScore * wTime;

  // Final fitness clamped between 5 and 99.8
  const finalFitness = Math.max(5, Math.min(99.8, Number((baseCombinedFitness - penalty * 0.4).toFixed(2))));

  return {
    ...chromosome,
    fitness: finalFitness,
    rawMetrics: {
      budgetEfficiency,
      specsScore,
      trustScore,
      timingScore,
      penalty
    }
  };
}

/**
 * Tournament Selection (k = 3)
 */
function selectParentTournament(population: Chromosome[], k = 3): Chromosome {
  let best = population[Math.floor(Math.random() * population.length)];
  for (let i = 1; i < k; i++) {
    const candidate = population[Math.floor(Math.random() * population.length)];
    if (candidate.fitness > best.fitness) {
      best = candidate;
    }
  }
  return best;
}

/**
 * Roulette Wheel Selection
 */
function selectParentRoulette(population: Chromosome[]): Chromosome {
  const minFitness = Math.min(...population.map(c => c.fitness));
  const shift = minFitness < 0 ? Math.abs(minFitness) + 1 : 1;
  const totalFitness = population.reduce((acc, c) => acc + (c.fitness + shift), 0);
  let threshold = Math.random() * totalFitness;

  for (const c of population) {
    threshold -= (c.fitness + shift);
    if (threshold <= 0) return c;
  }
  return population[0];
}

/**
 * Recombination / Crossover of two parent chromosomes
 */
function crossover(
  parentA: Chromosome,
  parentB: Chromosome,
  crossoverRate: number
): { childA: Chromosome; childB: Chromosome } {
  if (Math.random() > crossoverRate) {
    return {
      childA: { ...parentA, id: `chrom-${Date.now()}-A` },
      childB: { ...parentB, id: `chrom-${Date.now()}-B` }
    };
  }

  // Product/Listing inheritance (Single point exchange)
  const inheritProductA = Math.random() < 0.5 ? parentA.productId : parentB.productId;
  const inheritListingA = inheritProductA === parentA.productId ? parentA.listingId : parentB.listingId;

  const inheritProductB = Math.random() < 0.5 ? parentB.productId : parentA.productId;
  const inheritListingB = inheritProductB === parentB.productId ? parentB.listingId : parentA.listingId;

  // Arithmetic crossover on continuous genes: child = alpha * pA + (1-alpha) * pB
  const blend = (gA: number, gB: number) => {
    const alpha = Math.random() * 1.2 - 0.1; // BLX-alpha extension
    return Math.max(0.02, Math.min(0.98, alpha * gA + (1 - alpha) * gB));
  };

  const genesChildA: ChromosomeGenes = {
    priceSensitivity: blend(parentA.genes.priceSensitivity, parentB.genes.priceSensitivity),
    specsImportance: blend(parentA.genes.specsImportance, parentB.genes.specsImportance),
    qualityFocus: blend(parentA.genes.qualityFocus, parentB.genes.qualityFocus),
    merchantTrustWeight: blend(parentA.genes.merchantTrustWeight, parentB.genes.merchantTrustWeight),
    timingTrendWeight: blend(parentA.genes.timingTrendWeight, parentB.genes.timingTrendWeight),
    shippingSpeedWeight: blend(parentA.genes.shippingSpeedWeight, parentB.genes.shippingSpeedWeight)
  };

  const genesChildB: ChromosomeGenes = {
    priceSensitivity: blend(parentB.genes.priceSensitivity, parentA.genes.priceSensitivity),
    specsImportance: blend(parentB.genes.specsImportance, parentA.genes.specsImportance),
    qualityFocus: blend(parentB.genes.qualityFocus, parentA.genes.qualityFocus),
    merchantTrustWeight: blend(parentB.genes.merchantTrustWeight, parentA.genes.merchantTrustWeight),
    timingTrendWeight: blend(parentB.genes.timingTrendWeight, parentA.genes.timingTrendWeight),
    shippingSpeedWeight: blend(parentB.genes.shippingSpeedWeight, parentA.genes.shippingSpeedWeight)
  };

  return {
    childA: {
      id: `chrom-${Date.now()}-cA-${Math.random().toString(36).substr(2, 4)}`,
      productId: inheritProductA,
      listingId: inheritListingA,
      genes: genesChildA,
      fitness: 0,
      rawMetrics: { ...parentA.rawMetrics }
    },
    childB: {
      id: `chrom-${Date.now()}-cB-${Math.random().toString(36).substr(2, 4)}`,
      productId: inheritProductB,
      listingId: inheritListingB,
      genes: genesChildB,
      fitness: 0,
      rawMetrics: { ...parentB.rawMetrics }
    }
  };
}

/**
 * Mutation operator with Gaussian perturbation and candidate exploring
 */
function mutate(
  chromosome: Chromosome,
  mutationRate: number,
  eligibleProducts: Product[]
): Chromosome {
  if (Math.random() > mutationRate) {
    return chromosome;
  }

  let mutatedProductId = chromosome.productId;
  let mutatedListingId = chromosome.listingId;

  // 35% chance to explore a neighbor product in the search space
  if (Math.random() < 0.35 && eligibleProducts.length > 0) {
    const randomProd = eligibleProducts[Math.floor(Math.random() * eligibleProducts.length)];
    mutatedProductId = randomProd.id;
    const randomListing = randomProd.listings[Math.floor(Math.random() * randomProd.listings.length)];
    mutatedListingId = randomListing.id;
  } else if (Math.random() < 0.3) {
    // Flip to another merchant listing of the same product
    const currentProd = eligibleProducts.find(p => p.id === mutatedProductId);
    if (currentProd && currentProd.listings.length > 1) {
      const otherListings = currentProd.listings.filter(l => l.id !== mutatedListingId);
      if (otherListings.length > 0) {
        mutatedListingId = otherListings[Math.floor(Math.random() * otherListings.length)].id;
      }
    }
  }

  // Gaussian noise delta for continuous gene weights
  const gaussian = () => (Math.random() + Math.random() + Math.random() - 1.5) * 0.18;
  const perturb = (val: number) => Math.max(0.02, Math.min(0.98, val + gaussian()));

  const mutatedGenes: ChromosomeGenes = {
    priceSensitivity: perturb(chromosome.genes.priceSensitivity),
    specsImportance: perturb(chromosome.genes.specsImportance),
    qualityFocus: perturb(chromosome.genes.qualityFocus),
    merchantTrustWeight: perturb(chromosome.genes.merchantTrustWeight),
    timingTrendWeight: perturb(chromosome.genes.timingTrendWeight),
    shippingSpeedWeight: perturb(chromosome.genes.shippingSpeedWeight)
  };

  return {
    ...chromosome,
    productId: mutatedProductId,
    listingId: mutatedListingId,
    genes: mutatedGenes
  };
}

/**
 * Runs a single generational step of the Genetic Algorithm
 */
export function evolveOneGeneration(
  currentPopulation: Chromosome[],
  generationIndex: number,
  params: GeneticParams,
  criteria: UserPurchaseCriteria,
  productMap: Map<string, Product>,
  eligibleProducts: Product[]
): { nextPopulation: Chromosome[]; snapshot: GenerationSnapshot } {
  // 1. Evaluate fitness for all individuals
  const evaluatedPopulation = currentPopulation.map(c =>
    evaluateFitness(c, criteria, productMap)
  );

  // 2. Sort descending by fitness
  evaluatedPopulation.sort((a, b) => b.fitness - a.fitness);

  const bestFitness = evaluatedPopulation[0].fitness;
  const worstFitness = evaluatedPopulation[evaluatedPopulation.length - 1].fitness;
  const sumFitness = evaluatedPopulation.reduce((acc, c) => acc + c.fitness, 0);
  const averageFitness = Number((sumFitness / evaluatedPopulation.length).toFixed(2));

  // Compute population diversity (variance of fitness)
  const variance = evaluatedPopulation.reduce((acc, c) => acc + Math.pow(c.fitness - averageFitness, 2), 0) / evaluatedPopulation.length;
  const diversityIndex = Number(Math.sqrt(variance).toFixed(2));

  const snapshot: GenerationSnapshot = {
    generation: generationIndex,
    bestFitness,
    averageFitness,
    worstFitness,
    diversityIndex,
    bestChromosome: { ...evaluatedPopulation[0] }
  };

  // 3. Elitism: preserve top elite individuals untouched
  const nextPopulation: Chromosome[] = [];
  const eliteCount = Math.min(params.elitismCount, evaluatedPopulation.length);
  for (let i = 0; i < eliteCount; i++) {
    nextPopulation.push({ ...evaluatedPopulation[i] });
  }

  // 4. Selection & Reproduction to fill the remainder of the population
  const selectParent = params.selectionMethod === 'roulette'
    ? (pop: Chromosome[]) => selectParentRoulette(pop)
    : (pop: Chromosome[]) => selectParentTournament(pop, 3);

  while (nextPopulation.length < params.populationSize) {
    const parentA = selectParent(evaluatedPopulation);
    const parentB = selectParent(evaluatedPopulation);

    const { childA, childB } = crossover(parentA, parentB, params.crossoverRate);

    const mutatedA = mutate(childA, params.mutationRate, eligibleProducts);
    const evaluatedChildA = evaluateFitness(mutatedA, criteria, productMap);
    nextPopulation.push(evaluatedChildA);

    if (nextPopulation.length < params.populationSize) {
      const mutatedB = mutate(childB, params.mutationRate, eligibleProducts);
      const evaluatedChildB = evaluateFitness(mutatedB, criteria, productMap);
      nextPopulation.push(evaluatedChildB);
    }
  }

  return { nextPopulation, snapshot };
}

/**
 * Analyzes the converged population to detect implicit user preference weights
 * and synthesize Pareto-optimal trade-offs
 */
function analyzeGeneticConvergence(
  finalPopulation: Chromosome[],
  productMap: Map<string, Product>,
  criteria: UserPurchaseCriteria
): {
  detectedPreferences: DetectedUserPreferences;
  paretoSolutions: ParetoSolution[];
  convergedAtGen: number;
} {
  // Sort by fitness
  const sorted = [...finalPopulation].sort((a, b) => b.fitness - a.fitness);
  const eliteTop = sorted.slice(0, Math.max(5, Math.floor(sorted.length * 0.15)));

  // Average gene weights across elite individuals
  let avgPrice = 0;
  let avgSpecs = 0;
  let avgQuality = 0;
  let avgTrust = 0;
  let avgTiming = 0;

  for (const ind of eliteTop) {
    avgPrice += ind.genes.priceSensitivity;
    avgSpecs += ind.genes.specsImportance;
    avgQuality += ind.genes.qualityFocus;
    avgTrust += ind.genes.merchantTrustWeight;
    avgTiming += ind.genes.timingTrendWeight;
  }

  const count = eliteTop.length;
  const rawSum = avgPrice + avgSpecs + avgQuality + avgTrust + avgTiming;

  const priceWeight = Math.round((avgPrice / rawSum) * 100);
  const specsWeight = Math.round((avgSpecs / rawSum) * 100);
  const qualityWeight = Math.round((avgQuality / rawSum) * 100);
  const merchantTrustWeight = Math.round((avgTrust / rawSum) * 100);
  const timingWeight = Math.max(5, 100 - (priceWeight + specsWeight + qualityWeight + merchantTrustWeight));

  // Determine detected persona
  let detectedPersona = 'Comprador Racional Multidimensional';
  let tradeoffReason = '';

  if (priceWeight >= 32) {
    detectedPersona = 'Maximizador de Ahorro & Eficiencia Presupuestaria';
    tradeoffReason = `El algoritmo identificó alta sensibilidad al precio (${priceWeight}%). Priorizó ofertas con el menor precio por unidad de rendimiento, descartando opciones más caras con rendimientos marginales decrecientes.`;
  } else if (specsWeight >= 30) {
    detectedPersona = 'Entusiasta de Alto Rendimiento & Hardware Pro';
    tradeoffReason = `El cromosoma convergió hacia la cúspide técnica (${specsWeight}% de peso en especificaciones). Justificó acercarse al tope de tu presupuesto ($${criteria.maxBudget}) para maximizar potencia y longevidad.`;
  } else if (merchantTrustWeight >= 25) {
    detectedPersona = 'Comprador Seguro con Preferencia por Tiendas Oficiales';
    tradeoffReason = `El modelo penalizó tiendas dudosas y priorizó comerciantes verificados (${merchantTrustWeight}% peso en confianza) con envíos rápidos o gratuitos.`;
  } else {
    detectedPersona = 'Equilibrio Óptimo Pareto (Calidad-Precio Puro)';
    tradeoffReason = `El algoritmo encontró el punto de inflexión donde cada dólar invertido entrega el mayor retorno en satisfacción, durabilidad y confianza comercial.`;
  }

  // Extract distinct Pareto-optimal solutions
  const seenProducts = new Set<string>();
  const paretoSolutions: ParetoSolution[] = [];

  for (const ind of sorted) {
    if (seenProducts.has(ind.productId)) continue;
    seenProducts.add(ind.productId);

    const product = productMap.get(ind.productId);
    if (!product) continue;
    const listing = product.listings.find(l => l.id === ind.listingId) || product.listings[0];

    const savingsVsBudget = criteria.maxBudget - listing.price;
    const rank = paretoSolutions.length + 1;

    let tradeoffLabel = 'Óptimo Global Evolutivo';
    if (rank === 2) tradeoffLabel = 'Alternativa de Alto Rendimiento';
    else if (rank === 3) tradeoffLabel = 'Alternativa de Máximo Ahorro';
    else if (rank > 3) tradeoffLabel = 'Opción Destacada';

    const highlights: string[] = [];
    if (savingsVsBudget >= 0) {
      highlights.push(`Ahorro de $${Math.round(savingsVsBudget)} vs presupuesto`);
    } else {
      highlights.push(`Excede presupuesto por $${Math.abs(Math.round(savingsVsBudget))}`);
    }
    if (listing.verifiedMerchant) highlights.push('Vendedor Verificado');
    if (listing.shipping.toLowerCase().includes('gratis')) highlights.push('Envío Gratis');
    if (product.lstmTrend === 'HISTORIC_LOW') highlights.push('Mínimo Histórico detectado');

    paretoSolutions.push({
      rank,
      product,
      listing,
      fitness: ind.fitness,
      title: product.name,
      price: listing.price,
      savingsVsBudget,
      tradeoffLabel,
      highlights
    });

    if (paretoSolutions.length >= 4) break;
  }

  return {
    detectedPreferences: {
      priceWeight,
      specsWeight,
      qualityWeight,
      merchantTrustWeight,
      timingWeight,
      detectedPersona,
      tradeoffReason
    },
    paretoSolutions,
    convergedAtGen: 28 // Approximate convergence plateau
  };
}

/**
 * Full execution of the Genetic Algorithm
 * Optimized for synchronous, fast execution (<30ms)
 */
export function runGeneticAlgorithm(
  criteria: UserPurchaseCriteria = DEFAULT_PURCHASE_CRITERIA,
  params: GeneticParams = DEFAULT_GENETIC_PARAMS,
  productsDataset: Product[] = INITIAL_PRODUCTS_DATASET
): GeneticOptimizationResult {
  const startTime = performance.now();

  const productMap = new Map<string, Product>();
  productsDataset.forEach(p => productMap.set(p.id, p));

  const eligibleProducts = getEligibleProducts(productsDataset, criteria);

  // Initialize Population
  let population = initializePopulation(params, criteria, productsDataset);
  const generationsHistory: GenerationSnapshot[] = [];

  let plateauCounter = 0;
  let lastBestFitness = 0;
  let convergedAtGen = params.generations;

  for (let gen = 1; gen <= params.generations; gen++) {
    const { nextPopulation, snapshot } = evolveOneGeneration(
      population,
      gen,
      params,
      criteria,
      productMap,
      eligibleProducts
    );

    generationsHistory.push(snapshot);
    population = nextPopulation;

    // Detect convergence plateau (if best fitness changes less than 0.05 for 8 generations)
    if (Math.abs(snapshot.bestFitness - lastBestFitness) < 0.05) {
      plateauCounter++;
      if (plateauCounter === 8 && convergedAtGen === params.generations) {
        convergedAtGen = gen;
      }
    } else {
      plateauCounter = 0;
      lastBestFitness = snapshot.bestFitness;
    }
  }

  // Sort final population
  population.sort((a, b) => b.fitness - a.fitness);
  const bestChromosome = population[0];

  const bestProduct = productMap.get(bestChromosome.productId) || eligibleProducts[0];
  const bestListing =
    bestProduct.listings.find(l => l.id === bestChromosome.listingId) || bestProduct.listings[0];

  const { detectedPreferences, paretoSolutions } = analyzeGeneticConvergence(
    population,
    productMap,
    criteria
  );

  const endTime = performance.now();
  const executionTimeMs = Number((endTime - startTime).toFixed(1));

  return {
    generationsHistory,
    bestChromosome,
    bestProduct,
    bestListing,
    paretoSolutions,
    detectedPreferences,
    totalEvaluations: params.populationSize * params.generations,
    executionTimeMs,
    convergedAtGen
  };
}
