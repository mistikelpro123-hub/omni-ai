import React from 'react';
import { Product } from '../types/product';
import { X, ExternalLink, Star, ShieldCheck, Check, AlertCircle, Store } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const minPrice = Math.min(...product.listings.map(l => l.price));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0c0d12] border border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-6 max-h-[90vh] flex flex-col">
        
        {/* Header Modal */}
        <div className="p-5 border-b border-zinc-800/80 flex items-start justify-between gap-4 shrink-0 bg-zinc-950/50">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-xl bg-zinc-900 overflow-hidden border border-zinc-800 shrink-0">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">{product.brand}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-[11px] text-zinc-400 capitalize">{product.category}</span>
              </div>
              <h2 className="text-base font-semibold text-white">{product.name}</h2>
              <div className="flex items-center gap-3 mt-1 text-xs text-zinc-400">
                <div className="flex items-center text-zinc-200 font-medium">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                  <span>{product.overallRating}</span>
                </div>
                <span>({product.totalReviewsCount.toLocaleString()} opiniones)</span>
                <span className="text-zinc-300 font-mono bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 text-[11px]">
                  QPI {product.qpiScore}/100 ({product.valueGrade})
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 space-y-6 overflow-y-auto flex-1 text-zinc-300 text-xs">
          
          {/* Section 1: Multi-Store Price Comparison Matrix */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-white flex items-center gap-1.5 text-sm">
                <Store className="w-4 h-4 text-zinc-400" />
                <span>Ofertas por Tienda</span>
              </h3>
              <span className="text-[11px] text-zinc-400">
                Mejor precio: <strong className="text-white font-mono font-medium">${minPrice} USD</strong>
              </span>
            </div>

            <div className="border border-zinc-800/80 rounded-xl overflow-hidden bg-zinc-950/40">
              <div className="divide-y divide-zinc-800/70">
                {product.listings.map((listing) => {
                  const isLowest = listing.price === minPrice;
                  return (
                    <div
                      key={listing.id}
                      className="p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-zinc-900/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono font-medium text-[11px] text-zinc-300 shrink-0">
                          {listing.merchantName.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white text-xs">{listing.merchantName}</span>
                            {listing.verifiedMerchant && (
                              <span className="text-[10px] text-zinc-400 bg-zinc-900 px-1.5 py-0.2 rounded border border-zinc-800">
                                Verificado
                              </span>
                            )}
                            {isLowest && (
                              <span className="text-[10px] text-emerald-300 font-mono bg-emerald-950/80 border border-emerald-900 px-1.5 py-0.2 rounded">
                                Menor Precio
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-zinc-500 flex items-center gap-2 mt-0.5">
                            <span>{listing.shipping}</span>
                            <span>•</span>
                            <span className="text-zinc-400">{listing.stockStatus}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <div className="text-right">
                          <div className="text-sm font-semibold text-white font-mono">
                            ${listing.price} <span className="text-[10px] font-normal text-zinc-400">{listing.currency}</span>
                          </div>
                          {listing.originalPrice && listing.originalPrice > listing.price && (
                            <div className="text-[10px] text-zinc-500 line-through font-mono">
                              ${listing.originalPrice} USD
                            </div>
                          )}
                        </div>

                        <a
                          href={listing.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span>Ir a Tienda</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2: Historical Price Trend Chart */}
          <div className="p-4 bg-zinc-900/30 border border-zinc-800/80 rounded-xl space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h4 className="font-medium text-white text-xs">
                  Histórico de Precios & Predicción LSTM
                </h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Variación semestral registrada en múltiples tiendas.
                </p>
              </div>

              <div className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 font-mono">
                Tendencia Estable
              </div>
            </div>

            {/* Clean Bar chart */}
            <div className="pt-2 grid grid-cols-6 gap-2 items-end h-24 border-b border-zinc-800/70 px-2">
              {product.priceHistory.map((ph, idx) => {
                const priceVal = ph.amazonPrice || ph.bestbuyPrice || ph.nikePrice || minPrice;
                const maxHistory = Math.max(...product.priceHistory.map(p => p.amazonPrice || p.bestbuyPrice || p.nikePrice || minPrice));
                const heightPct = Math.round((priceVal / maxHistory) * 100);

                return (
                  <div key={idx} className="flex flex-col items-center gap-1 group/bar h-full justify-end">
                    <span className="text-[10px] text-zinc-400 opacity-0 group-hover/bar:opacity-100 transition-opacity font-mono">
                      ${priceVal}
                    </span>
                    <div
                      style={{ height: `${Math.max(25, heightPct)}%` }}
                      className={`w-full rounded-t-xs transition-colors ${
                        idx === product.priceHistory.length - 1 ? 'bg-zinc-200' : 'bg-zinc-700'
                      }`}
                    />
                    <span className="text-[10px] text-zinc-500 font-mono">{ph.date.split('-')[1]}/{ph.date.split('-')[0].substring(2)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Technical Specifications */}
          <div className="space-y-2">
            <h3 className="font-medium text-white text-xs">Especificaciones Técnicas</h3>
            <div className="border border-zinc-800/80 rounded-xl overflow-hidden bg-zinc-950/40 text-xs">
              <table className="w-full text-left border-collapse">
                <tbody className="divide-y divide-zinc-800/70">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key} className="hover:bg-zinc-900/30">
                      <td className="p-2.5 font-medium text-zinc-400 capitalize w-1/3 bg-zinc-900/20">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </td>
                      <td className="p-2.5 text-zinc-200 font-mono">
                        {String(value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: AI Pros & Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 bg-zinc-900/30 border border-zinc-800/80 rounded-xl space-y-1.5">
              <h4 className="font-medium text-zinc-200 flex items-center gap-1.5 text-xs">
                <Check className="w-3.5 h-3.5 text-zinc-400" />
                <span>Puntos Favorables</span>
              </h4>
              <ul className="space-y-1 text-[11px] text-zinc-400">
                {product.aiPros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-zinc-500">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 bg-zinc-900/30 border border-zinc-800/80 rounded-xl space-y-1.5">
              <h4 className="font-medium text-zinc-200 flex items-center gap-1.5 text-xs">
                <AlertCircle className="w-3.5 h-3.5 text-zinc-400" />
                <span>Puntos a Considerar</span>
              </h4>
              <ul className="space-y-1 text-[11px] text-zinc-400">
                {product.aiCons.map((con, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-zinc-500">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800/80 flex justify-end bg-zinc-950/50">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-lg font-medium text-xs transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
