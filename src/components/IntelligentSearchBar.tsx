import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  ArrowRight,
  Cpu,
  CheckCircle,
  ShieldCheck,
  TrendingDown,
  RotateCcw,
  Store,
  ShoppingCart,
  ExternalLink
} from 'lucide-react';
import { IntelligentSearchAnalysis, IntelligentRecommendation, Product } from '../types/product';
import { authService } from '../services/authService';

interface IntelligentSearchBarProps {
  onResultsFound: (analysis: IntelligentSearchAnalysis | null, recommendations: IntelligentRecommendation[]) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const IntelligentSearchBar: React.FC<IntelligentSearchBarProps> = ({
  onResultsFound,
  onAddToCart,
  onSelectProduct
}) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<IntelligentSearchAnalysis | null>(null);
  const [recommendations, setRecommendations] = useState<IntelligentRecommendation[]>([]);
  const [error, setError] = useState('');

  const quickPrompts = [
    'Quiero algo potente para poder jugar juegos pesados',
    'Necesito un celular con cámara profesional y buena batería',
    'Zapatos cómodos para correr maratón con máxima amortiguación',
    'Laptop económica y rápida para programar y tareas de oficina'
  ];

  const handleSearch = async (textToSearch?: string) => {
    const query = (textToSearch || prompt).trim();
    if (!query) return;

    if (textToSearch) {
      setPrompt(textToSearch);
    }

    setIsLoading(true);
    setError('');

    try {
      const data = await authService.executeIntelligentSearch(query);
      setAnalysis(data.analysis);
      setRecommendations(data.recommendations);
      onResultsFound(data.analysis, data.recommendations);
    } catch (err: any) {
      setError(err.message || 'Error al ejecutar búsqueda inteligente');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt('');
    setAnalysis(null);
    setRecommendations([]);
    setError('');
    onResultsFound(null, []);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Search Input Box */}
      <div className="relative">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="relative flex items-center bg-zinc-900/90 border border-zinc-700/80 hover:border-zinc-600 focus-within:border-zinc-500 rounded-2xl shadow-xl transition-all p-1.5"
        >
          <div className="pl-3.5 pr-2 text-zinc-400">
            <Sparkles className="w-5 h-5 text-zinc-300" />
          </div>

          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Escribe tu problema o necesidad (ej: quiero algo potente para poder jugar juegos pesados)..."
            className="flex-1 bg-transparent py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
            disabled={isLoading}
          />

          <div className="flex items-center gap-2 pr-1">
            {analysis && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer rounded-xl hover:bg-zinc-800"
                title="Limpiar búsqueda inteligente"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="py-2.5 px-4 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs shrink-0"
            >
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                  <span>Analizando...</span>
                </>
              ) : (
                <>
                  <span>Buscar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick prompt suggestions */}
        {!analysis && (
          <div className="flex flex-wrap items-center gap-2 pt-2.5">
            <span className="text-[11px] font-mono text-zinc-500">Sugerencias:</span>
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSearch(qp)}
                className="px-2.5 py-1 rounded-lg bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-zinc-700 text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer truncate max-w-[280px] sm:max-w-none"
              >
                "{qp}"
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-950/40 border border-red-900 rounded-xl text-xs text-red-300">
          {error}
        </div>
      )}

      {/* Analysis Card Breakdown */}
      {analysis && (
        <div className="p-5 bg-zinc-900/50 border border-zinc-800/90 rounded-2xl space-y-4 shadow-sm animate-fade-in">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-zinc-800 border border-zinc-700/80 text-zinc-200">
                <Cpu className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  Análisis de Requisitos Omni.IA
                </span>
                <h3 className="text-sm font-semibold text-white">
                  {analysis.detectedNeed}
                </h3>
              </div>
            </div>

            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-800/80 border border-zinc-700/80 text-[11px] font-mono text-zinc-300 self-start sm:self-auto">
              Afinidad: {analysis.confidenceScore}%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Requisitos Explícitos */}
            <div className="p-3.5 bg-zinc-950/50 border border-zinc-800/70 rounded-xl space-y-2">
              <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider font-medium flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-zinc-400" />
                Requisitos Explícitos
              </span>
              <ul className="space-y-1.5 text-zinc-300">
                {analysis.explicitRequirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-zinc-500 font-mono">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requisitos Implícitos (Hardware / Diseño) */}
            <div className="p-3.5 bg-zinc-950/50 border border-zinc-800/70 rounded-xl space-y-2">
              <span className="font-mono text-[11px] text-emerald-400 uppercase tracking-wider font-medium flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                Requisitos Implícitos Deducidos
              </span>
              <ul className="space-y-1.5 text-zinc-300">
                {analysis.implicitRequirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-mono">✓</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Estrategia de Rentabilidad */}
          <div className="p-3 bg-zinc-950/40 border border-zinc-800/60 rounded-xl text-xs flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
                Estrategia de Rentabilidad y Precios Bajos:
              </span>
              <p className="text-zinc-300 leading-relaxed">
                {analysis.rentabilityStrategy}
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Top Recommendations Cards if search was performed */}
      {analysis && recommendations.length > 0 && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <span>Opciones Recomendadas por Rentabilidad y Tiendas Confiables</span>
              <span className="text-xs font-mono text-zinc-400">({recommendations.length})</span>
            </h3>
            <button
              onClick={handleClear}
              className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer font-mono"
            >
              Ver catálogo completo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((rec) => {
              const { product, bestOffer, matchScore, matchReason, rentabilityTag } = rec;
              return (
                <div
                  key={product.id}
                  className="bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden flex flex-col transition-all group"
                >
                  {/* Image & Match Badge */}
                  <div className="relative aspect-16/10 bg-zinc-950 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-[11px] font-mono text-emerald-400 font-semibold">
                      {matchScore}% Coincidencia
                    </div>
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-[10px] font-mono text-zinc-300">
                      QPI {product.qpiScore}/100
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1">
                        <span className="uppercase">{product.brand}</span>
                        <span className="text-emerald-400 font-medium">{rentabilityTag}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                        {matchReason}
                      </p>
                    </div>

                    {/* Best Offer Info */}
                    <div className="p-2.5 bg-zinc-950/60 border border-zinc-800/80 rounded-xl space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-zinc-400">
                          <Store className="w-3.5 h-3.5 text-zinc-500" />
                          <span>{bestOffer.merchantName}</span>
                          {bestOffer.verifiedMerchant && (
                            <ShieldCheck className="w-3 h-3 text-emerald-400" title="Tienda Confiable Verificada" />
                          )}
                        </span>
                        <span className="font-mono text-emerald-400 font-semibold">
                          ${bestOffer.price} USD
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-zinc-700/60"
                      >
                        <span>Detalles</span>
                        <ExternalLink className="w-3 h-3 text-zinc-400" />
                      </button>

                      <button
                        onClick={() => onAddToCart(product)}
                        className="py-2 px-3 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Comprar (${bestOffer.price})</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
