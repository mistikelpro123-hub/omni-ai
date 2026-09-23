import React from 'react';
import { Cpu, Search, Sliders, Sparkles, PlusCircle, Network, Smartphone, Laptop, Footprints, Dna, Activity } from 'lucide-react';
import { ProductCategory } from '../types/product';

interface NavbarProps {
  activeTab: 'search' | 'genetic' | 'architecture' | 'weights' | 'custom';
  setActiveTab: (tab: 'search' | 'genetic' | 'architecture' | 'weights' | 'custom') => void;
  selectedCategory: ProductCategory | 'all';
  setSelectedCategory: (cat: ProductCategory | 'all') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedCategory,
  setSelectedCategory
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-cyan-500/20 text-slate-100 shadow-2xl shadow-cyan-950/40">
      {/* Top micro-line gradient for futuristic look */}
      <div className="h-[2px] w-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand Omni.IA */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setActiveTab('search')}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative w-11 h-11 rounded-xl bg-slate-900 border border-cyan-400/40 flex items-center justify-center shadow-inner">
                <Cpu className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl tracking-tighter bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
                  Omni<span className="text-cyan-400">.IA</span>
                </span>
                <span className="px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest text-cyan-300 bg-cyan-950/90 border border-cyan-500/40 rounded-full shadow-sm shadow-cyan-500/20">
                  v3.0 NEURAL
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:flex items-center gap-1.5 font-mono">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Inteligencia de Decisión Multimodelo & Algoritmo Genético
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'search'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-lg shadow-cyan-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-transparent'
              }`}
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <span>Buscador & Ofertas</span>
            </button>

            <button
              onClick={() => setActiveTab('genetic')}
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'genetic'
                  ? 'bg-gradient-to-r from-indigo-500/25 via-cyan-500/25 to-emerald-500/20 text-white border border-cyan-400/60 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-transparent'
              }`}
            >
              <Dna className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Algoritmo Genético</span>
              <span className="hidden md:inline-block px-1.5 py-0.2 text-[9px] font-mono font-extrabold rounded-md bg-gradient-to-r from-cyan-400 to-indigo-400 text-slate-950 uppercase tracking-wider shadow-sm">
                PARETO
              </span>
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'architecture'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/50 shadow-lg shadow-indigo-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-transparent'
              }`}
            >
              <Network className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">Arquitectura</span> Redes IA
            </button>

            <button
              onClick={() => setActiveTab('weights')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'weights'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-lg shadow-emerald-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-transparent'
              }`}
            >
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span className="hidden md:inline">Laboratorio</span> Pesos ML
            </button>

            <button
              onClick={() => setActiveTab('custom')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'custom'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-lg shadow-amber-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-transparent'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">Evaluar URL</span>
            </button>
          </nav>
        </div>

        {/* Sub-bar Category Pills for Quick Switching */}
        {activeTab === 'search' && (
          <div className="py-2.5 border-t border-slate-800/80 flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium whitespace-nowrap">
              <span className="flex items-center gap-1 text-cyan-400 font-mono text-[11px]">
                <Activity className="w-3.5 h-3.5" />
                EXPLORADOR:
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25 ring-1 ring-cyan-300/40'
                    : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                Catálogo Completo
              </button>
              
              <button
                onClick={() => setSelectedCategory('celulares')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === 'celulares'
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25 ring-1 ring-cyan-300/40'
                    : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Smartphones</span>
              </button>

              <button
                onClick={() => setSelectedCategory('computadoras')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === 'computadoras'
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25 ring-1 ring-cyan-300/40'
                    : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                <Laptop className="w-3.5 h-3.5 text-indigo-400" />
                <span>Laptops & PCs</span>
              </button>

              <button
                onClick={() => setSelectedCategory('zapatos')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === 'zapatos'
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25 ring-1 ring-cyan-300/40'
                    : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                <Footprints className="w-3.5 h-3.5 text-emerald-400" />
                <span>Calzado & Sneakers</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
