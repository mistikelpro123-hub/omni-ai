import React, { useState, useEffect, useRef } from 'react';
import {
  Dna,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  TrendingDown,
  ShieldCheck,
  Truck,
  Star,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Award,
  Sparkles,
  Info,
  DollarSign
} from 'lucide-react';
import {
  Product,
  ProductCategory,
  GeneticParams,
  UserPurchaseCriteria,
  UserPriorityProfile,
  GeneticOptimizationResult,
  GenerationSnapshot
} from '../types/product';
import {
  DEFAULT_GENETIC_PARAMS,
  DEFAULT_PURCHASE_CRITERIA,
  runGeneticAlgorithm,
  initializePopulation,
  evolveOneGeneration,
  getEligibleProducts
} from '../services/geneticAlgorithmEngine';
import { GeneticConvergenceChart } from './GeneticConvergenceChart';

interface GeneticOptimizerViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const GeneticOptimizerView: React.FC<GeneticOptimizerViewProps> = ({
  products,
  onSelectProduct
}) => {
  // User Criteria State
  const [criteria, setCriteria] = useState<UserPurchaseCriteria>(DEFAULT_PURCHASE_CRITERIA);

  // Genetic Hyperparameters State
  const [params, setParams] = useState<GeneticParams>(DEFAULT_GENETIC_PARAMS);
  const [showAdvancedParams, setShowAdvancedParams] = useState(false);
  const [showTheoryModal, setShowTheoryModal] = useState(false);

  // Optimization Execution Result State
  const [result, setResult] = useState<GeneticOptimizationResult | null>(null);

  // Animated Simulation State
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentSimGen, setCurrentSimGen] = useState(0);
  const [simHistory, setSimHistory] = useState<GenerationSnapshot[]>([]);
  const simPopulationRef = useRef<any[]>([]);
  const animIntervalRef = useRef<any>(null);

  // Execute fast optimization on first mount
  useEffect(() => {
    handleRunFastOptimization();
  }, []);

  // Cleanup simulation interval on unmount
  useEffect(() => {
    return () => {
      if (animIntervalRef.current) clearInterval(animIntervalRef.current);
    };
  }, []);

  // Quick Run Optimization (<25ms)
  const handleRunFastOptimization = (customCriteria?: UserPurchaseCriteria, customParams?: GeneticParams) => {
    if (isSimulating) handleStopSimulation();

    const activeCriteria = customCriteria || criteria;
    const activeParams = customParams || params;

    const optResult = runGeneticAlgorithm(activeCriteria, activeParams, products);
    setResult(optResult);
    setSimHistory(optResult.generationsHistory);
    setCurrentSimGen(optResult.generationsHistory.length);
  };

  // Step-by-Step Animated Simulation Loop
  const handleStartSimulation = () => {
    if (isSimulating) {
      handleStopSimulation();
      return;
    }

    setIsSimulating(true);
    setCurrentSimGen(1);

    const productMap = new Map<string, Product>();
    products.forEach(p => productMap.set(p.id, p));
    const eligibleProds = getEligibleProducts(products, criteria);

    // Initialize population
    let pop = initializePopulation(params, criteria, products);
    simPopulationRef.current = pop;

    const historyAcc: GenerationSnapshot[] = [];
    let gen = 1;

    animIntervalRef.current = setInterval(() => {
      if (gen > params.generations) {
        handleStopSimulation();
        // Compute final analysis
        const finalOpt = runGeneticAlgorithm(criteria, params, products);
        setResult(finalOpt);
        return;
      }

      const { nextPopulation, snapshot } = evolveOneGeneration(
        simPopulationRef.current,
        gen,
        params,
        criteria,
        productMap,
        eligibleProds
      );

      simPopulationRef.current = nextPopulation;
      historyAcc.push(snapshot);
      setSimHistory([...historyAcc]);
      setCurrentSimGen(gen);

      gen++;
    }, 60); // 60ms per generation for smooth animation
  };

  const handleStopSimulation = () => {
    if (animIntervalRef.current) {
      clearInterval(animIntervalRef.current);
      animIntervalRef.current = null;
    }
    setIsSimulating(false);
  };

  const handleResetToDefaults = () => {
    if (isSimulating) handleStopSimulation();
    setCriteria(DEFAULT_PURCHASE_CRITERIA);
    setParams(DEFAULT_GENETIC_PARAMS);
    handleRunFastOptimization(DEFAULT_PURCHASE_CRITERIA, DEFAULT_GENETIC_PARAMS);
  };

  // Quick Budget Presets
  const budgetPresets = [
    { label: '$150 (Económico)', val: 150 },
    { label: '$400 (Medio)', val: 400 },
    { label: '$850 (Equilibrado)', val: 850 },
    { label: '$1,300 (Pro)', val: 1300 },
    { label: '$2,000+ (Tope)', val: 2000 }
  ];

  const priorityProfiles: { id: UserPriorityProfile; label: string; desc: string; icon: string }[] = [
    {
      id: 'balanced',
      label: 'Equilibrado Pareto',
      desc: 'Maximiza relación calidad-precio y retorno por dólar.',
      icon: '⚖️'
    },
    {
      id: 'power',
      label: 'Máxima Potencia / Pro',
      desc: 'Prioriza especificaciones de hardware y calidad.',
      icon: '⚡'
    },
    {
      id: 'budget_hunter',
      label: 'Cazador de Ahorro',
      desc: 'Minimiza gasto estricto buscando el mayor descuento.',
      icon: '🏷️'
    },
    {
      id: 'trust_speed',
      label: 'Confiabilidad y Rapidez',
      desc: 'Prioriza tiendas verificadas con envío inmediato.',
      icon: '🛡️'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Top Banner & Explanation */}
      <div className="rounded-xl bg-zinc-900/40 border border-zinc-800/80 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                Optimización Heurística Pareto
              </span>
              {result && (
                <span className="text-[11px] text-zinc-500 font-mono">
                  • {result.executionTimeMs}ms ({result.totalEvaluations} eval)
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Optimizador Genético Multiobjetivo
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Calcula la mejor compra matemática en la Frontera de Pareto haciendo evolucionar una población de cromosomas que equilibran especificaciones, costo y fiabilidad de la tienda.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => handleRunFastOptimization()}
              disabled={isSimulating}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Optimizar</span>
            </button>

            <button
              onClick={handleStartSimulation}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                isSimulating
                  ? 'bg-zinc-800 border-zinc-700 text-white'
                  : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300'
              }`}
            >
              {isSimulating ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Pausar ({currentSimGen}/{params.generations})</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Simulación</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowTheoryModal(!showTheoryModal)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Ver sustentación matemática"
            >
              <Info className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Teoría</span>
            </button>
          </div>
        </div>
      </div>

      {/* Theoretical Modal / Dropdown */}
      {showTheoryModal && (
        <div className="bg-slate-900 border border-indigo-900/60 rounded-2xl p-6 shadow-xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" />
              <span>Fundamentación Matemática del Algoritmo Genético</span>
            </h3>
            <button
              onClick={() => setShowTheoryModal(false)}
              className="text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Cerrar ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-semibold text-cyan-400 font-mono">1. Función de Aptitud (Fitness)</h4>
              <p className="text-slate-400 leading-relaxed">
                F(c) = w_p·S_presupuesto + w_s·S_specs + w_t·S_confianza + w_l·S_lstm - Penalizaciones.
              </p>
              <p className="text-[11px] text-slate-400">
                Penalización cuadrática cuando el precio supera el presupuesto: λ·((Precio - Max)/Max)².
              </p>
            </div>
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-semibold text-indigo-400 font-mono">2. Operador de Cruza (BLX-α)</h4>
              <p className="text-slate-400 leading-relaxed">
                Recombina genes continuos mediante interpolación estocástica: g_hijo = α·g_p1 + (1-α)·g_p2 con α ∈ [-0.1, 1.1].
              </p>
              <p className="text-[11px] text-slate-400">
                Permite explorar puntos no muestreados dentro y ligeramente fuera del rango de los padres.
              </p>
            </div>
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-semibold text-emerald-400 font-mono">3. Selección & Mutación</h4>
              <p className="text-slate-400 leading-relaxed">
                Selección por Torneo (k=3) y Mutación Gaussiana Δ ~ N(0, σ²) con 35% de exploración de catálogo.
              </p>
              <p className="text-[11px] text-slate-400">
                Elitismo de orden K garantiza que la solución óptima nunca se degrade entre generaciones.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Parameters Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: User Input Parameters (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Parámetros y Requerimientos de Compra</span>
            </h2>
            <button
              onClick={handleResetToDefaults}
              className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer</span>
            </button>
          </div>

          {/* Category Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Categoría Objetivo
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['all', 'celulares', 'computadoras', 'zapatos'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    const next = { ...criteria, category: cat };
                    setCriteria(next);
                    handleRunFastOptimization(next);
                  }}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold capitalize border transition-all cursor-pointer ${
                    criteria.category === cat
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {cat === 'all' ? '🌐 Todas las categorías' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Slider and Presets */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Presupuesto Máximo Disponible
              </label>
              <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-base font-extrabold font-mono text-emerald-400">
                  {criteria.maxBudget.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500">USD</span>
              </div>
            </div>

            <input
              type="range"
              min="80"
              max="2600"
              step="20"
              value={criteria.maxBudget}
              onChange={e => {
                const next = { ...criteria, maxBudget: Number(e.target.value) };
                setCriteria(next);
                handleRunFastOptimization(next);
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {budgetPresets.map(preset => (
                <button
                  key={preset.val}
                  onClick={() => {
                    const next = { ...criteria, maxBudget: preset.val };
                    setCriteria(next);
                    handleRunFastOptimization(next);
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-mono border transition-all cursor-pointer ${
                    criteria.maxBudget === preset.val
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Priority Profiles */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Perfil e Intención de Compra
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {priorityProfiles.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    const next = { ...criteria, priorityProfile: p.id };
                    setCriteria(next);
                    handleRunFastOptimization(next);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                    criteria.priorityProfile === p.id
                      ? 'bg-indigo-500/15 border-indigo-500/50 text-indigo-100 shadow-sm'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <span className="text-xl shrink-0 mt-0.5">{p.icon}</span>
                  <div>
                    <div className="text-xs font-bold text-slate-200">{p.label}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">{p.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Strict Filter Constraints */}
          <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/90 cursor-pointer">
              <input
                type="checkbox"
                checked={criteria.preferVerifiedOnly}
                onChange={e => {
                  const next = { ...criteria, preferVerifiedOnly: e.target.checked };
                  setCriteria(next);
                  handleRunFastOptimization(next);
                }}
                className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0"
              />
              <span className="text-slate-300">Solo Tiendas Verificadas</span>
            </label>

            <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/90 cursor-pointer">
              <input
                type="checkbox"
                checked={criteria.preferFreeShipping}
                onChange={e => {
                  const next = { ...criteria, preferFreeShipping: e.target.checked };
                  setCriteria(next);
                  handleRunFastOptimization(next);
                }}
                className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0"
              />
              <span className="text-slate-300">Priorizar Envío Gratis</span>
            </label>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/90">
              <span className="text-slate-400">Calificación Mín:</span>
              <select
                value={criteria.minRating}
                onChange={e => {
                  const next = { ...criteria, minRating: Number(e.target.value) };
                  setCriteria(next);
                  handleRunFastOptimization(next);
                }}
                className="bg-slate-900 text-slate-200 text-xs rounded border border-slate-700 px-2 py-0.5"
              >
                <option value={0}>Sin límite</option>
                <option value={4.0}>≥ 4.0 ★</option>
                <option value={4.5}>≥ 4.5 ★</option>
                <option value={4.7}>≥ 4.7 ★</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: GA Hyperparameters & Evolved Preferences (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Evolved Preferences Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Preferencias Detectadas</span>
              </h3>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                DECIDIDAS POR EL ALGORITMO
              </span>
            </div>

            {result ? (
              <div className="space-y-3.5">
                <div>
                  <span className="text-xs font-bold text-indigo-300 block">
                    {result.detectedPreferences.detectedPersona}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    {result.detectedPreferences.tradeoffReason}
                  </p>
                </div>

                {/* Progress bars of evolved weights */}
                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Sensibilidad al Precio:</span>
                      <span className="font-mono text-emerald-400 font-bold">
                        {result.detectedPreferences.priceWeight}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${result.detectedPreferences.priceWeight}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Demanda de Rendimiento:</span>
                      <span className="font-mono text-cyan-400 font-bold">
                        {result.detectedPreferences.specsWeight}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-500 rounded-full"
                        style={{ width: `${result.detectedPreferences.specsWeight}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Filtro de Confianza de Tienda:</span>
                      <span className="font-mono text-indigo-400 font-bold">
                        {result.detectedPreferences.merchantTrustWeight}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${result.detectedPreferences.merchantTrustWeight}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Oportunidad de Mercado (LSTM):</span>
                      <span className="font-mono text-amber-400 font-bold">
                        {result.detectedPreferences.timingWeight}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${result.detectedPreferences.timingWeight}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-500 italic py-4 text-center">
                Calculando genotipo y fenotipo...
              </div>
            )}
          </div>

          {/* Genetic Hyperparameters Collapsible Panel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <button
              onClick={() => setShowAdvancedParams(!showAdvancedParams)}
              className="w-full flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider hover:text-white cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <Dna className="w-4 h-4 text-indigo-400" />
                <span>Hiperparámetros Genéticos</span>
              </div>
              {showAdvancedParams ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showAdvancedParams && (
              <div className="space-y-3 pt-2 text-xs border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Población (N):</span>
                  <select
                    value={params.populationSize}
                    onChange={e => {
                      const next = { ...params, populationSize: Number(e.target.value) };
                      setParams(next);
                      handleRunFastOptimization(criteria, next);
                    }}
                    className="bg-slate-950 text-slate-200 px-2 py-1 rounded border border-slate-800 font-mono"
                  >
                    <option value={30}>30 individuos</option>
                    <option value={60}>60 individuos (Recomendado)</option>
                    <option value={100}>100 individuos</option>
                    <option value={150}>150 individuos</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Generaciones (G):</span>
                  <select
                    value={params.generations}
                    onChange={e => {
                      const next = { ...params, generations: Number(e.target.value) };
                      setParams(next);
                      handleRunFastOptimization(criteria, next);
                    }}
                    className="bg-slate-950 text-slate-200 px-2 py-1 rounded border border-slate-800 font-mono"
                  >
                    <option value={20}>20 generaciones</option>
                    <option value={40}>40 generaciones</option>
                    <option value={60}>60 generaciones</option>
                    <option value={80}>80 generaciones</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Tasa de Cruza (Pc):</span>
                  <span className="font-mono text-cyan-400 font-semibold">{params.crossoverRate * 100}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Tasa de Mutación (Pm):</span>
                  <span className="font-mono text-amber-400 font-semibold">{params.mutationRate * 100}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Selección:</span>
                  <span className="font-mono text-indigo-300 font-semibold capitalize">Torneo (k=3)</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Elitismo:</span>
                  <span className="font-mono text-emerald-400 font-semibold">{params.elitismCount} mejores</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Real-time Convergence Chart */}
      <GeneticConvergenceChart
        history={simHistory}
        currentGenIndex={isSimulating ? currentSimGen - 1 : undefined}
        convergedAtGen={result?.convergedAtGen}
      />

      {/* WINNING PRODUCT SECTION: "La Mejor Compra Detectada" */}
      {result && result.bestProduct && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-black text-white tracking-tight">
                La Mejor Compra Detectada por el Algoritmo
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Solución Óptima Global (Genotipo Campeón)
            </span>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-cyan-500/40 p-6 shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Product Thumbnail */}
              <div className="md:col-span-4 relative group">
                <div className="w-full h-56 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src={result.bestProduct.imageUrl}
                    alt={result.bestProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="px-2.5 py-1 text-[11px] font-extrabold uppercase rounded-lg bg-emerald-500 text-slate-950 shadow-md">
                    👑 GANADOR DEL ALGORITMO
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900/90 text-slate-200 border border-slate-700">
                    {result.bestProduct.category}
                  </span>
                </div>
              </div>

              {/* Product Info and Metrics */}
              <div className="md:col-span-8 space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <span className="font-semibold text-cyan-400">{result.bestProduct.brand}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {result.bestProduct.overallRating} ({result.bestProduct.totalReviewsCount.toLocaleString()} opiniones)
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white hover:text-cyan-300 transition-colors">
                    {result.bestProduct.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {result.bestProduct.summary}
                  </p>
                </div>

                {/* Best Merchant Offer Banner */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] text-slate-400">Tienda recomendada por el algoritmo:</div>
                    <div className="text-sm font-bold text-slate-100 flex items-center gap-2 mt-0.5">
                      <span>{result.bestListing.merchantName}</span>
                      {result.bestListing.verifiedMerchant && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
                          <ShieldCheck className="w-3 h-3" />
                          Verificado
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        <Truck className="w-3 h-3" />
                        {result.bestListing.shipping}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
                      ${result.bestListing.price.toLocaleString()} <span className="text-xs font-normal text-slate-400">USD</span>
                    </div>
                    {criteria.maxBudget >= result.bestListing.price ? (
                      <div className="text-xs text-emerald-400 flex items-center justify-end gap-1 font-medium">
                        <TrendingDown className="w-3.5 h-3.5" />
                        Ahorras ${(criteria.maxBudget - result.bestListing.price).toFixed(0)} vs tu presupuesto
                      </div>
                    ) : (
                      <div className="text-xs text-amber-400 flex items-center justify-end gap-1 font-medium">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        +${(result.bestListing.price - criteria.maxBudget).toFixed(0)} sobre presupuesto (justificado por potencia)
                      </div>
                    )}
                  </div>
                </div>

                {/* Fitness Score Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Aptitud (Fitness):</span>
                    <span className="text-base font-extrabold font-mono text-cyan-400">
                      {result.bestChromosome.fitness} / 100
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Hardware & Specs:</span>
                    <span className="text-base font-extrabold font-mono text-slate-200">
                      {result.bestProduct.qualityScore} / 100
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Índice QPI:</span>
                    <span className="text-base font-extrabold font-mono text-emerald-400">
                      {result.bestProduct.qpiScore} ({result.bestProduct.valueGrade})
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Tendencia Temporal:</span>
                    <span className="text-xs font-bold font-mono text-amber-400 block mt-1">
                      {result.bestProduct.lstmTrend === 'HISTORIC_LOW' ? '🔥 Mínimo Histórico' : 'Estable'}
                    </span>
                  </div>
                </div>

                {/* Direct Action */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => onSelectProduct(result.bestProduct)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    <span>Inspeccionar Comparativa Completa y Tiendas</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

      {/* PARETO FRONT: Alternative Solutions */}
      {result && result.paretoSolutions && result.paretoSolutions.length > 1 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Frontera de Pareto: Soluciones Alternativas Descubiertas</span>
            </h3>
            <span className="text-xs text-slate-400">
              Opciones con diferentes balances de costo vs potencia
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {result.paretoSolutions.slice(1, 4).map(sol => (
              <div
                key={sol.product.id}
                onClick={() => onSelectProduct(sol.product)}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 shadow-lg flex flex-col justify-between transition-all cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                      {sol.tradeoffLabel}
                    </span>
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      Fit: {sol.fitness}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={sol.product.imageUrl}
                      alt={sol.product.name}
                      className="w-14 h-14 object-cover rounded-lg bg-slate-950 border border-slate-800 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 line-clamp-1">
                        {sol.product.name}
                      </h4>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        En {sol.listing.merchantName}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between pt-1 border-t border-slate-800/80">
                    <span className="text-sm font-black font-mono text-emerald-400">
                      ${sol.price.toLocaleString()} USD
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      QPI: {sol.product.qpiScore}
                    </span>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1">
                    {sol.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-2 text-[11px] text-cyan-400 font-medium flex items-center justify-end gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Ver detalles</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
