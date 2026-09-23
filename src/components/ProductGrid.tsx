import React from 'react';
import { Product, PhoneSpecs, ComputerSpecs, ShoeSpecs } from '../types/product';
import { ExternalLink, Star, Eye, Layers, Smartphone, Laptop, Footprints, Check, ShoppingCart } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  selectedComparisonIds: string[];
  onToggleCompare: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onInspectArchitecture?: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onSelectProduct,
  selectedComparisonIds,
  onToggleCompare,
  onAddToCart
}) => {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center mx-auto text-zinc-500">
          <Eye className="w-5 h-5" />
        </div>
        <h3 className="text-base font-medium text-zinc-200">No se encontraron productos</h3>
        <p className="text-zinc-500 text-xs max-w-sm mx-auto">
          Intenta ajustar los filtros de precio o realiza una búsqueda con otros términos.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map((product) => {
        const minPrice = Math.min(...product.listings.map(l => l.price));
        const maxPrice = Math.max(...product.listings.map(l => l.price));
        const isSelectedForCompare = selectedComparisonIds.includes(product.id);

        return (
          <div
            key={product.id}
            className="group bg-zinc-900/40 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors flex flex-col justify-between"
          >
            {/* Image Container */}
            <div className="relative h-52 bg-zinc-950 overflow-hidden shrink-0">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

              {/* Minimal Category Tag */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-zinc-950/85 backdrop-blur-xs border border-zinc-800 rounded-lg text-[11px] font-mono text-zinc-300">
                {product.category === 'celulares' && <Smartphone className="w-3 h-3 text-zinc-400" />}
                {product.category === 'computadoras' && <Laptop className="w-3 h-3 text-zinc-400" />}
                {product.category === 'zapatos' && <Footprints className="w-3 h-3 text-zinc-400" />}
                <span className="capitalize">{product.category}</span>
              </div>

              {/* Minimal QPI Tag */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-zinc-950/85 backdrop-blur-xs border border-zinc-800 px-2.5 py-1 rounded-lg text-xs font-mono">
                <span className="text-[10px] text-zinc-500">QPI</span>
                <span className="font-semibold text-zinc-100">{product.qpiScore}</span>
                <span className="text-[10px] text-zinc-400 font-bold px-1 rounded bg-zinc-800">
                  {product.valueGrade}
                </span>
              </div>

              {/* Subtle LSTM Indicator */}
              {product.lstmTrend === 'HISTORIC_LOW' && (
                <div className="absolute bottom-3 left-3 bg-emerald-950/90 border border-emerald-800/70 text-emerald-300 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-medium">
                  Mínimo Histórico
                </div>
              )}
              {product.lstmTrend === 'DIP_EXPECTED' && (
                <div className="absolute bottom-3 left-3 bg-amber-950/90 border border-amber-800/70 text-amber-300 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-medium">
                  Rebaja Prevista
                </div>
              )}
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-medium text-white text-base leading-snug group-hover:text-zinc-200 transition-colors">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                  <span className="text-zinc-400 font-medium">{product.brand}</span>
                  <span>•</span>
                  <div className="flex items-center text-zinc-300">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-1" />
                    <span>{product.overallRating}</span>
                  </div>
                  <span>({product.totalReviewsCount.toLocaleString()})</span>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {product.summary}
                </p>
              </div>

              {/* Minimal Specs */}
              <div className="p-3 bg-zinc-950/60 border border-zinc-800/70 rounded-xl space-y-1.5 text-xs font-mono">
                {product.category === 'celulares' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">SoC</span>
                      <span className="text-zinc-300 truncate max-w-[170px]">
                        {(product.specs as PhoneSpecs).processor}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Cámara</span>
                      <span className="text-zinc-300 truncate max-w-[170px]">
                        {(product.specs as PhoneSpecs).camera}
                      </span>
                    </div>
                  </>
                )}

                {product.category === 'computadoras' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">CPU</span>
                      <span className="text-zinc-300 truncate max-w-[170px]">
                        {(product.specs as ComputerSpecs).processor}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">RAM / GPU</span>
                      <span className="text-zinc-300 truncate max-w-[170px]">
                        {(product.specs as ComputerSpecs).ram} • {(product.specs as ComputerSpecs).gpu.split(' ')[0]}
                      </span>
                    </div>
                  </>
                )}

                {product.category === 'zapatos' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Amortiguación</span>
                      <span className="text-zinc-300 truncate max-w-[170px]">
                        {(product.specs as ShoeSpecs).cushioning}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Uso</span>
                      <span className="text-zinc-300 truncate max-w-[170px]">
                        {(product.specs as ShoeSpecs).useCase}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Price & Actions */}
              <div className="pt-3 border-t border-zinc-800/70 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-500 font-mono block">
                      En {product.listings.length} tiendas
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-xl font-semibold text-white font-mono">${minPrice}</span>
                      {maxPrice > minPrice && (
                        <span className="text-xs text-zinc-500 font-mono">
                          - ${maxPrice} USD
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Clean merchant text list */}
                  <div className="text-[11px] font-mono text-zinc-400">
                    {product.listings.slice(0, 2).map(l => l.merchantName).join(' · ')}
                  </div>
                </div>

                {/* Minimal Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-zinc-700/60"
                  >
                    <span>Ver Ofertas</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </button>

                  {onAddToCart ? (
                    <button
                      onClick={() => onAddToCart(product)}
                      className="py-2 px-3 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      title="Agregar la oferta más barata al carrito"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Comprar (${minPrice})</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onToggleCompare(product)}
                      className={`py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                        isSelectedForCompare
                          ? 'bg-zinc-800 text-white border-zinc-600'
                          : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
                      }`}
                    >
                      <Check className={`w-3.5 h-3.5 ${isSelectedForCompare ? 'text-white' : 'text-zinc-500'}`} />
                      <span>{isSelectedForCompare ? 'Agregado' : 'Comparar'}</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};
