import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Laptop,
  Footprints,
  Search,
  ShoppingCart,
  LogOut,
  SlidersHorizontal,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { Product, ProductCategory, SearchFilterState, MLWeights, CartItem, PurchaseOrder, IntelligentSearchAnalysis, IntelligentRecommendation } from '../types/product';
import { User } from '../types/auth';
import { DEFAULT_ML_WEIGHTS } from '../services/mlScoringEngine';
import { ProductGrid } from './ProductGrid';
import { ProductDetailModal } from './ProductDetailModal';
import { ComparisonDrawer } from './ComparisonDrawer';
import { IntelligentSearchBar } from './IntelligentSearchBar';
import { ShoppingCartDrawer } from './ShoppingCartDrawer';
import { authService } from '../services/authService';

interface UserAppViewProps {
  user: User;
  onLogout: () => void;
  onSwitchView?: (view: 'user' | 'backoffice' | 'developer') => void;
  productsDataset: Product[];
  onAddCustomProduct?: (product: Product) => void;
}

const CART_STORAGE_KEY = 'omni_ia_cart_items';

export const UserAppView: React.FC<UserAppViewProps> = ({
  user,
  onLogout,
  onSwitchView,
  productsDataset
}) => {
  // Mode: Intelligent Search vs Direct Catalog
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(productsDataset);
  const [sortBy, setSortBy] = useState<'qpi' | 'priceAsc' | 'rating'>('qpi');
  
  // Intelligent Search State
  const [activeAnalysis, setActiveAnalysis] = useState<IntelligentSearchAnalysis | null>(null);

  // Shopping Cart State with LocalStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modal & Drawer State
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(null);
  const [comparisonProductIds, setComparisonProductIds] = useState<string[]>([]);

  // Sync products if dataset changes
  useEffect(() => {
    if (!activeAnalysis) {
      applyCategoryAndSort(selectedCategory, sortBy, productsDataset);
    }
  }, [productsDataset]);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const applyCategoryAndSort = (cat: ProductCategory | 'all', sort: 'qpi' | 'priceAsc' | 'rating', source = productsDataset) => {
    let filtered = [...source];
    if (cat !== 'all') {
      filtered = filtered.filter(p => p.category === cat);
    }

    if (sort === 'qpi') {
      filtered.sort((a, b) => b.qpiScore - a.qpiScore);
    } else if (sort === 'priceAsc') {
      filtered.sort((a, b) => {
        const minA = Math.min(...a.listings.map(l => l.price));
        const minB = Math.min(...b.listings.map(l => l.price));
        return minA - minB;
      });
    } else if (sort === 'rating') {
      filtered.sort((a, b) => b.overallRating - a.overallRating);
    }

    setDisplayedProducts(filtered);
  };

  const handleCategoryChange = (cat: ProductCategory | 'all') => {
    setSelectedCategory(cat);
    applyCategoryAndSort(cat, sortBy);
  };

  const handleSortChange = (sort: 'qpi' | 'priceAsc' | 'rating') => {
    setSortBy(sort);
    applyCategoryAndSort(selectedCategory, sort);
  };

  // Add cheapest listing to Shopping Cart
  const handleAddToCart = (product: Product) => {
    const sortedListings = [...product.listings].sort((a, b) => a.price - b.price);
    const cheapest = sortedListings[0];
    if (!cheapest) return;

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.productId === product.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        const newItem: CartItem = {
          productId: product.id,
          productName: product.name,
          brand: product.brand,
          category: product.category,
          imageUrl: product.imageUrl,
          merchantName: cheapest.merchantName,
          price: cheapest.price,
          quantity: 1,
          qpiScore: product.qpiScore
        };
        return [...prev, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.productId === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCheckout = async (): Promise<PurchaseOrder | null> => {
    if (cartItems.length === 0) return null;
    try {
      const order = await authService.checkoutCart(cartItems);
      setCartItems([]);
      return order;
    } catch (err: any) {
      alert(err.message || 'Error al procesar la compra.');
      return null;
    }
  };

  const handleToggleCompare = (product: Product) => {
    setComparisonProductIds(prev => {
      if (prev.includes(product.id)) {
        return prev.filter(id => id !== product.id);
      } else {
        if (prev.length >= 4) {
          return [...prev.slice(1), product.id];
        }
        return [...prev, product.id];
      }
    });
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col font-sans selection:bg-zinc-800 selection:text-white">
      
      {/* Top Navigation Bar */}
      <header className="border-b border-zinc-800/80 bg-[#090a0f]/90 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Platform context */}
          <div className="flex items-center gap-3">
            <span className="font-semibold text-base tracking-tight text-white">
              Omni<span className="text-zinc-500">.IA</span>
            </span>
            <span className="text-zinc-700 hidden sm:inline">/</span>
            <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
              Catálogo Inteligente
            </span>
          </div>

          {/* Right Header Controls: Cart + User Profile */}
          <div className="flex items-center gap-3">
            
            {/* Functional Shopping Cart Button with Dynamic Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-xs"
              title="Ver Carrito de Compras"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline font-mono font-medium">Carrito</span>
              {totalCartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-zinc-950 font-bold text-[11px] flex items-center justify-center font-mono">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
              <div className="w-7 h-7 rounded-full overflow-hidden bg-zinc-800 border border-zinc-700 shrink-0">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <span className="hidden md:inline text-xs font-medium text-zinc-300">{user.name}</span>
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="p-2 rounded-xl text-zinc-400 hover:text-red-300 hover:bg-zinc-900 transition-colors cursor-pointer"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Hero Section with Natural Language Intelligent Search */}
        <section className="space-y-4">
          <div className="max-w-2xl">
            <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Búsqueda Inteligente en Lenguaje Natural
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
              Describe tus necesidades o problemas cotidianos y nuestro modelo extraerá los requisitos técnicos para recomendarte las ofertas más rentables y baratas de tiendas confiables.
            </p>
          </div>

          {/* Intelligent Search Input */}
          <IntelligentSearchBar
            onResultsFound={(analysis, recs) => {
              setActiveAnalysis(analysis);
            }}
            onAddToCart={handleAddToCart}
            onSelectProduct={(p) => setSelectedDetailProduct(p)}
          />
        </section>

        {/* Catalog Browser Section (Visible when not filtering by active intelligent search, or for general exploration) */}
        <section className="space-y-6 pt-4 border-t border-zinc-800/60">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Catálogo Completo de Productos</h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Clasificados por el Índice de Rentabilidad QPI y tiendas oficiales.
              </p>
            </div>

            {/* Filters & Sorting */}
            <div className="flex flex-wrap items-center gap-2">
              
              {/* Category Pills */}
              <div className="flex items-center bg-zinc-900/80 p-0.5 rounded-lg border border-zinc-800 text-xs">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-zinc-800 text-white shadow-xs'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => handleCategoryChange('computadoras')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === 'computadoras'
                      ? 'bg-zinc-800 text-white shadow-xs'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span>Computadoras</span>
                </button>
                <button
                  onClick={() => handleCategoryChange('celulares')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === 'celulares'
                      ? 'bg-zinc-800 text-white shadow-xs'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Celulares</span>
                </button>
                <button
                  onClick={() => handleCategoryChange('zapatos')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    selectedCategory === 'zapatos'
                      ? 'bg-zinc-800 text-white shadow-xs'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Footprints className="w-3.5 h-3.5" />
                  <span>Zapatos</span>
                </button>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 bg-zinc-900/80 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-zinc-300">
                <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value as any)}
                  className="bg-transparent text-xs text-zinc-200 focus:outline-none cursor-pointer"
                >
                  <option value="qpi" className="bg-zinc-900 text-zinc-200">Mayor Rentabilidad (QPI)</option>
                  <option value="priceAsc" className="bg-zinc-900 text-zinc-200">Menor Precio</option>
                  <option value="rating" className="bg-zinc-900 text-zinc-200">Mejor Valoración</option>
                </select>
              </div>

            </div>
          </div>

          {/* Product Grid */}
          <ProductGrid
            products={displayedProducts}
            onSelectProduct={(product) => setSelectedDetailProduct(product)}
            selectedComparisonIds={comparisonProductIds}
            onToggleCompare={handleToggleCompare}
            onAddToCart={handleAddToCart}
          />

        </section>

      </main>

      {/* Shopping Cart Drawer */}
      <ShoppingCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
      />

      {/* Comparison Drawer */}
      <ComparisonDrawer
        selectedProductIds={comparisonProductIds}
        allProducts={productsDataset}
        onClose={() => setComparisonProductIds([])}
        onSelectProduct={(p) => setSelectedDetailProduct(p)}
      />

      {/* Product Detail Modal */}
      {selectedDetailProduct && (
        <ProductDetailModal
          product={selectedDetailProduct}
          onClose={() => setSelectedDetailProduct(null)}
          onInspectArchitecture={() => {}}
        />
      )}

      {/* Minimal Footer */}
      <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-500 font-mono">
        <p>Omni.IA • Plataforma de Recomendación Multimodelo y Rentabilidad</p>
      </footer>

    </div>
  );
};
