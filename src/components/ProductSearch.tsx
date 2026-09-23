import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, X, Sparkles, Smartphone, Laptop, Footprints } from 'lucide-react';
import { SearchFilterState, ProductCategory } from '../types/product';

interface ProductSearchProps {
  filterState: SearchFilterState;
  setFilterState: React.Dispatch<React.SetStateAction<SearchFilterState>>;
  onExecuteSearch: (query: string) => void;
  isSearching: boolean;
  aiInsight?: string;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({
  filterState,
  setFilterState,
  onExecuteSearch,
  isSearching,
  aiInsight
}) => {
  const [localQuery, setLocalQuery] = useState(filterState.searchQuery);
  const [showFilters, setShowFilters] = useState(false);

  const samplePrompts = [
    { label: 'Celular cámara 200MP', query: 'celular con mejor cámara 200MP y procesador rápido' },
    { label: 'Laptop ligera programación', query: 'laptop liviana con buena batería y 16GB RAM' },
    { label: 'Zapatos running amortiguación', query: 'tenis de running con excelente amortiguación en rodillas' },
    { label: 'Mejor QPI < $500', query: 'productos con mejor puntaje QPI por menos de 500 dólares' }
  ];

  const categories: { id: ProductCategory | 'all'; label: string; icon?: React.ReactNode }[] = [
    { id: 'all', label: 'Todo el Catálogo' },
    { id: 'celulares', label: 'Smartphones', icon: <Smartphone className="w-3.5 h-3.5" /> },
    { id: 'computadoras', label: 'Computadoras', icon: <Laptop className="w-3.5 h-3.5" /> },
    { id: 'zapatos', label: 'Calzado', icon: <Footprints className="w-3.5 h-3.5" /> }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilterState(prev => ({ ...prev, searchQuery: localQuery }));
    onExecuteSearch(localQuery);
  };

  const handleSelectPreset = (promptQuery: string) => {
    setLocalQuery(promptQuery);
    setFilterState(prev => ({ ...prev, searchQuery: promptQuery }));
    onExecuteSearch(promptQuery);
  };

  const handleCategorySelect = (catId: ProductCategory | 'all') => {
    const updated = { ...filterState, category: catId };
    setFilterState(updated);
    onExecuteSearch(localQuery);
  };

  return (
    <div className="border-b border-zinc-800/70 py-8 px-4 sm:px-6 lg:px-8 bg-zinc-950/30">
      <div className="max-w-6xl mx-auto space-y-5">
        
        {/* Header & Category Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Buscador Multitienda
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Indexación cruzada en Amazon, MercadoLibre, eBay y Best Buy con scoring QPI.
            </p>
          </div>

          {/* Minimal Category Tabs */}
          <div className="flex items-center bg-zinc-900/80 p-1 rounded-xl border border-zinc-800/80 text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  filterState.category === cat.id
                    ? 'bg-zinc-800 text-white shadow-xs'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Minimal Search Input Bar */}
        <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
          <div className="relative flex-1 flex items-center bg-zinc-900/60 border border-zinc-800 rounded-xl focus-within:border-zinc-600 transition-colors">
            <div className="pl-3.5 flex items-center pointer-events-none text-zinc-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Buscar por requerimientos técnicos (ej: 'laptop para programar con 16GB' o 'celular con buena batería')..."
              className="w-full pl-2.5 pr-8 py-3 bg-transparent text-zinc-100 placeholder-zinc-500 text-xs sm:text-sm focus:outline-none"
            />
            {localQuery && (
              <button
                type="button"
                onClick={() => {
                  setLocalQuery('');
                  setFilterState(prev => ({ ...prev, searchQuery: '' }));
                }}
                className="pr-3 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Clean Action Button */}
          <button
            type="submit"
            disabled={isSearching}
            className="px-5 py-3 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors disabled:opacity-50 shrink-0 cursor-pointer"
          >
            {isSearching ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                <span>Buscando...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Buscar</span>
              </>
            )}
          </button>

          {/* Clean Filter Toggle */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3.5 py-3 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer ${
              showFilters || (filterState.minPrice && filterState.minPrice > 0)
                ? 'bg-zinc-800 text-white border-zinc-600'
                : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-zinc-200'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filtros</span>
          </button>
        </form>

        {/* Clean Prompt Chips */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5">
          <span className="text-[11px] text-zinc-500 font-mono shrink-0">
            Sugerencias:
          </span>
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(p.query)}
              className="px-2.5 py-1 bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 rounded-lg text-xs text-zinc-400 hover:text-zinc-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Minimal Filters Panel */}
        {showFilters && (
          <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-zinc-300">
            {/* Sorting */}
            <div className="space-y-1">
              <label className="text-zinc-400 font-medium flex items-center gap-1.5">
                <ArrowUpDown className="w-3 h-3 text-zinc-400" /> Ordenar por
              </label>
              <select
                value={filterState.sortBy}
                onChange={(e) => setFilterState(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-zinc-200 focus:outline-none focus:border-zinc-600"
              >
                <option value="qpi">Índice Calidad-Precio (QPI)</option>
                <option value="price_asc">Menor Precio</option>
                <option value="price_desc">Mayor Precio</option>
                <option value="rating">Mejor Calificación</option>
                <option value="quality">Mayor Calidad Técnica</option>
              </select>
            </div>

            {/* Min Price */}
            <div className="space-y-1">
              <div className="flex justify-between text-zinc-400">
                <span>Precio Mínimo</span>
                <span className="font-mono text-zinc-200">${filterState.minPrice || 0} USD</span>
              </div>
              <input
                type="range"
                min="0"
                max="1500"
                step="50"
                value={filterState.minPrice || 0}
                onChange={(e) => setFilterState(prev => ({ ...prev, minPrice: Number(e.target.value) }))}
                className="w-full accent-zinc-200 bg-zinc-800 rounded-lg h-1.5 cursor-pointer"
              />
            </div>

            {/* Min Rating */}
            <div className="space-y-1">
              <label className="text-zinc-400 font-medium">Calificación</label>
              <select
                value={filterState.minRating || 0}
                onChange={(e) => setFilterState(prev => ({ ...prev, minRating: Number(e.target.value) }))}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-zinc-200 focus:outline-none focus:border-zinc-600"
              >
                <option value="0">Todas las calificaciones</option>
                <option value="4.5">4.5+ ⭐ (Excelente)</option>
                <option value="4.7">4.7+ ⭐ (Sobresaliente)</option>
                <option value="4.8">4.8+ ⭐ (Top de Gama)</option>
              </select>
            </div>

            {/* Reset */}
            <div className="flex items-end">
              <button
                onClick={() => setFilterState({
                  category: 'all',
                  searchQuery: '',
                  minPrice: 0,
                  maxPrice: 3000,
                  minRating: 0,
                  sortBy: 'qpi',
                  selectedBrand: 'all'
                })}
                className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-lg transition-colors font-medium cursor-pointer"
              >
                Restablecer
              </button>
            </div>
          </div>
        )}

        {/* Minimal AI Insight Card */}
        {aiInsight && (
          <div className="p-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl text-xs flex items-start gap-3">
            <div className="w-6 h-6 rounded-md bg-zinc-800 flex items-center justify-center text-zinc-300 shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                Dictamen Semántico IA
              </span>
              <p className="text-zinc-300 leading-relaxed">{aiInsight}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
