import React, { useState } from 'react';
import { ShoppingCart, X, Trash2, Plus, Minus, ArrowRight, CheckCircle2, ShieldCheck, Store } from 'lucide-react';
import { CartItem, PurchaseOrder } from '../types/product';

interface ShoppingCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCheckout: () => Promise<PurchaseOrder | null>;
}

export const ShoppingCartDrawer: React.FC<ShoppingCartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<PurchaseOrder | null>(null);

  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckoutClick = async () => {
    setIsProcessing(true);
    try {
      const order = await onCheckout();
      if (order) {
        setCompletedOrder(order);
      }
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseAndReset = () => {
    setCompletedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={handleCloseAndReset}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e1017] border-l border-zinc-800 text-zinc-100 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950/60">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">Carrito de Compras</h2>
                <p className="text-[11px] text-zinc-400 font-mono">
                  {totalCount} {totalCount === 1 ? 'artículo seleccionado' : 'artículos seleccionados'}
                </p>
              </div>
            </div>

            <button
              onClick={handleCloseAndReset}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {completedOrder ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-950/70 border border-emerald-800/80 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-white">¡Compra Exitosa!</h3>
                  <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                    Tu pedido ha sido procesado con las ofertas más bajas garantizadas por el motor de rentabilidad.
                  </p>
                </div>

                <div className="p-3.5 bg-zinc-900/80 border border-zinc-800 rounded-xl text-left font-mono text-xs space-y-1.5">
                  <div className="flex justify-between text-zinc-400">
                    <span>ID de Orden:</span>
                    <span className="text-zinc-200">{completedOrder.id}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Total Pagado:</span>
                    <span className="text-emerald-400 font-semibold">${completedOrder.totalAmount} USD</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Artículos:</span>
                    <span className="text-zinc-200">{completedOrder.totalItems} productos</span>
                  </div>
                </div>

                <button
                  onClick={handleCloseAndReset}
                  className="w-full py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Continuar Explorando Catálogo
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 flex items-center justify-center mx-auto">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-zinc-300">Tu carrito está vacío</p>
                  <p className="text-xs text-zinc-500">
                    Explora productos o usa la búsqueda inteligente para agregar las ofertas más baratas.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div 
                    key={item.productId}
                    className="p-3 bg-zinc-900/60 border border-zinc-800/80 rounded-xl flex gap-3 items-center"
                  >
                    <div className="w-14 h-14 rounded-lg bg-zinc-950 overflow-hidden border border-zinc-800 shrink-0">
                      <img 
                        src={item.imageUrl} 
                        alt={item.productName} 
                        className="w-full h-full object-cover" 
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-white truncate">
                        {item.productName}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-zinc-400">
                        <Store className="w-3 h-3 text-zinc-500" />
                        <span className="truncate">{item.merchantName}</span>
                        <span className="text-zinc-600">·</span>
                        <span className="text-emerald-400 font-mono font-medium">${item.price}</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 bg-zinc-950/70 border border-zinc-800 rounded-lg px-2 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.productId, -1)}
                            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                            title="Disminuir"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs text-zinc-200 px-1">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.productId, 1)}
                            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                            title="Aumentar"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-medium text-white">
                            ${item.price * item.quantity}
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.productId)}
                            className="text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                            title="Eliminar producto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end pt-1">
                  <button
                    onClick={onClearCart}
                    className="text-[11px] text-zinc-500 hover:text-zinc-300 font-mono transition-colors cursor-pointer"
                  >
                    Vaciar carrito
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Breakdown */}
          {!completedOrder && items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-zinc-800/80 bg-zinc-950/80 space-y-3">
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal:</span>
                  <span className="text-zinc-200">${totalAmount} USD</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Envío verificado:
                  </span>
                  <span className="text-emerald-400">Gratis ($0)</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-zinc-800">
                  <span>Total Acumulado:</span>
                  <span className="text-emerald-400 font-mono">${totalAmount} USD</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                disabled={isProcessing}
                className="w-full py-2.5 px-4 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Procesando Orden...</span>
                ) : (
                  <>
                    <span>Confirmar Compra (${totalAmount} USD)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
