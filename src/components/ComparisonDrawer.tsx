import React, { useState } from 'react';
import { Product } from '../types/product';
import { X, ChevronUp, ChevronDown } from 'lucide-react';

interface ComparisonDrawerProps {
  comparisonProducts: Product[];
  onRemoveCompare: (productId: string) => void;
  onClearAll: () => void;
}

export const ComparisonDrawer: React.FC<ComparisonDrawerProps> = ({
  comparisonProducts,
  onRemoveCompare,
  onClearAll
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (comparisonProducts.length === 0) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#0c0d12]/95 backdrop-blur-md border-t border-zinc-800 shadow-xl text-zinc-200">
      
      {/* Sticky Header Strip */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-zinc-900 text-zinc-300 px-2.5 py-1 rounded-lg text-xs font-mono border border-zinc-800">
            <span>{comparisonProducts.length} seleccionados</span>
          </div>

          {/* Mini thumbnails preview */}
          <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto">
            {comparisonProducts.map(p => (
              <div key={p.id} className="relative group/thumb">
                <img src={p.imageUrl} alt={p.name} className="w-7 h-7 rounded-md object-cover border border-zinc-800" />
                <button
                  onClick={() => onRemoveCompare(p.id)}
                  className="absolute -top-1 -right-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full p-0.5 opacity-0 group-hover/thumb:opacity-100 transition-opacity text-[8px] cursor-pointer"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1.5 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{isExpanded ? 'Ocultar Matriz' : 'Comparar'}</span>
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onClearAll}
            className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg text-xs font-medium border border-zinc-800 transition-colors cursor-pointer"
          >
            Limpiar
          </button>
        </div>
      </div>

      {/* Expanded Side-by-Side Matrix Drawer */}
      {isExpanded && (
        <div className="border-t border-zinc-800 max-h-[60vh] overflow-y-auto p-4 sm:p-5 bg-zinc-950">
          <div className="max-w-6xl mx-auto overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="p-3 font-medium text-zinc-400 w-48">Criterio</th>
                  {comparisonProducts.map(p => (
                    <th key={p.id} className="p-3 font-medium text-white min-w-[200px] align-top">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-[10px] text-zinc-500 font-mono uppercase">{p.brand}</div>
                          <div className="text-xs font-medium text-white line-clamp-1">{p.name}</div>
                        </div>
                        <button onClick={() => onRemoveCompare(p.id)} className="text-zinc-500 hover:text-zinc-300 cursor-pointer">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-800/70 font-mono">
                {/* QPI Score Row */}
                <tr>
                  <td className="p-3 font-sans font-medium text-zinc-400">QPI Score</td>
                  {comparisonProducts.map(p => (
                    <td key={p.id} className="p-3">
                      <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs">
                        {p.qpiScore} / 100 ({p.valueGrade})
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Price Range Row */}
                <tr>
                  <td className="p-3 font-sans font-medium text-zinc-400">Precio Mínimo</td>
                  {comparisonProducts.map(p => {
                    const minP = Math.min(...p.listings.map(l => l.price));
                    return (
                      <td key={p.id} className="p-3 font-semibold text-white">
                        ${minP} USD
                      </td>
                    );
                  })}
                </tr>

                {/* Merchants Count Row */}
                <tr>
                  <td className="p-3 font-sans font-medium text-zinc-400">Tiendas</td>
                  {comparisonProducts.map(p => (
                    <td key={p.id} className="p-3 text-zinc-300 font-sans text-xs">
                      {p.listings.map(l => l.merchantName).join(', ')}
                    </td>
                  ))}
                </tr>

                {/* Rating Row */}
                <tr>
                  <td className="p-3 font-sans font-medium text-zinc-400">Valoración</td>
                  {comparisonProducts.map(p => (
                    <td key={p.id} className="p-3 text-zinc-200">
                      ★ {p.overallRating} / 5.0
                    </td>
                  ))}
                </tr>

                {/* AI Pros Row */}
                <tr>
                  <td className="p-3 font-sans font-medium text-zinc-400">Ventaja Principal</td>
                  {comparisonProducts.map(p => (
                    <td key={p.id} className="p-3 text-zinc-400 font-sans text-xs italic">
                      "{p.aiPros[0] || 'Buena relación beneficio/costo'}"
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
