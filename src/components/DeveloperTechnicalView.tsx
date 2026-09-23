import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Layers,
  Network,
  Activity,
  Server,
  Code2,
  Zap,
  Sliders,
  Database,
  Cloud,
  Check,
  TrendingDown,
  Dna,
  Terminal,
  LogOut,
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Store,
  Clock,
  UserCheck,
  Lock,
  X
} from 'lucide-react';
import { User } from '../types/auth';
import { Product, MLWeights, PurchaseOrder, ProductCategory } from '../types/product';
import { authService } from '../services/authService';
import { DEFAULT_ML_WEIGHTS } from '../services/mlScoringEngine';

interface DeveloperTechnicalViewProps {
  user: User;
  onLogout: () => void;
  onSwitchView: (view: 'user' | 'backoffice' | 'developer') => void;
  productsDataset: Product[];
  onProductsUpdated?: (products: Product[]) => void;
}

export const DeveloperTechnicalView: React.FC<DeveloperTechnicalViewProps> = ({
  user,
  onLogout,
  productsDataset,
  onProductsUpdated
}) => {
  const [activeSection, setActiveSection] = useState<'catalog' | 'supervision' | 'models' | 'software' | 'cloud' | 'tensorLab' | 'diagnostics'>('catalog');
  const [techSpecData, setTechSpecData] = useState<any>(null);
  const [catalogProducts, setCatalogProducts] = useState<Product[]>(productsDataset);
  const [ordersList, setOrdersList] = useState<PurchaseOrder[]>([]);
  const [copiedSql, setCopiedSql] = useState(false);
  const [loading, setLoading] = useState(true);
  const [weights, setWeights] = useState<MLWeights>(DEFAULT_ML_WEIGHTS);
  const [selectedProductTensor, setSelectedProductTensor] = useState<Product>(productsDataset[0]);

  // Product CRUD Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [modalFormLoading, setModalFormLoading] = useState(false);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [spec, prods, orders] = await Promise.all([
        authService.getDeveloperTechSpec().catch(() => null),
        authService.fetchProducts().catch(() => productsDataset),
        authService.fetchOrders().catch(() => [])
      ]);
      if (spec) setTechSpecData(spec);
      if (prods) {
        setCatalogProducts(prods);
        if (onProductsUpdated) onProductsUpdated(prods);
        if (prods.length > 0) setSelectedProductTensor(prods[0]);
      }
      if (orders) setOrdersList(orders);
    } catch (err) {
      console.error('Error fetching developer data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleCopySql = () => {
    if (techSpecData?.postgresSchemaDDL) {
      navigator.clipboard.writeText(techSpecData.postgresSchemaDDL);
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2000);
    }
  };

  // Open modal for new product
  const handleOpenNewProduct = () => {
    setEditingProduct({
      name: '',
      brand: '',
      category: 'computadoras',
      imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
      summary: '',
      overallRating: 4.8,
      totalReviewsCount: 120,
      qpiScore: 92,
      qualityScore: 90,
      valueGrade: 'A',
      listings: [
        {
          id: `list_${Date.now()}`,
          merchantName: 'Amazon',
          merchantLogo: '',
          price: 999,
          currency: 'USD',
          rating: 4.9,
          reviewCount: 350,
          shipping: 'Envío Gratis',
          stockStatus: 'In Stock',
          productUrl: '#',
          verifiedMerchant: true
        }
      ],
      specs: {
        processor: 'Intel Core i7 / AMD Ryzen 7',
        ram: '16GB DDR5',
        storage: '1TB NVMe SSD',
        gpu: 'NVIDIA RTX 4060 8GB',
        screen: '15.6" 165Hz FHD',
        batteryLife: '8 horas',
        weight: '2.1 kg',
        os: 'Windows 11'
      } as any,
      priceHistory: [
        { date: '2026-06', amazonPrice: 1099 },
        { date: '2026-07', amazonPrice: 1049 },
        { date: '2026-08', amazonPrice: 999 }
      ]
    });
    setIsProductModalOpen(true);
  };

  // Open modal for editing existing product
  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(JSON.parse(JSON.stringify(prod)));
    setIsProductModalOpen(true);
  };

  // Save product (Add or Edit)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name || !editingProduct.brand) return;

    setModalFormLoading(true);
    try {
      if (editingProduct.id) {
        // Update existing
        await authService.updateProduct(editingProduct.id, editingProduct);
      } else {
        // Create new
        await authService.createProduct(editingProduct);
      }
      setIsProductModalOpen(false);
      setEditingProduct(null);
      await fetchAllData();
    } catch (err: any) {
      alert(err.message || 'Error al guardar producto');
    } finally {
      setModalFormLoading(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: string, name: string) => {
    if (!window.confirm(`¿Estás seguro de eliminar "${name}" del catálogo?`)) return;
    try {
      await authService.deleteProduct(id);
      await fetchAllData();
    } catch (err: any) {
      alert(err.message || 'Error al eliminar producto');
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col font-sans selection:bg-zinc-800 selection:text-white">
      
      {/* Header Bar */}
      <header className="border-b border-zinc-800/80 bg-[#090a0f]/90 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2.5">
            <span className="font-semibold text-sm text-white">Omni<span className="text-zinc-500">.IA</span></span>
            <span className="text-zinc-700">/</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-purple-950/40 border border-purple-900/60 text-[11px] font-mono text-purple-300">
              <Zap className="w-3 h-3 text-purple-400" />
              <span>God Mode · Desarrollador</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden lg:flex items-center bg-zinc-900/80 p-0.5 rounded-lg border border-zinc-800 text-xs">
            <button
              onClick={() => setActiveSection('catalog')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeSection === 'catalog'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Gestión Catálogo
            </button>
            <button
              onClick={() => setActiveSection('supervision')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeSection === 'supervision'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Supervisión & Compras
            </button>
            <button
              onClick={() => setActiveSection('models')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeSection === 'models'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Modelos IA
            </button>
            <button
              onClick={() => setActiveSection('software')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeSection === 'software'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Arquitectura
            </button>
            <button
              onClick={() => setActiveSection('cloud')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeSection === 'cloud'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Cloud $0
            </button>
            <button
              onClick={() => setActiveSection('diagnostics')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeSection === 'diagnostics'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Diagnóstico
            </button>
          </div>

          {/* User profile & actions */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-zinc-800 border border-zinc-700 shrink-0">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <span className="hidden sm:inline font-medium text-zinc-200">{user.name}</span>
            </div>

            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-red-300 hover:bg-zinc-900 transition-colors cursor-pointer"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Tabs */}
      <div className="lg:hidden border-b border-zinc-800/60 bg-zinc-950 px-4 py-2 flex items-center gap-1.5 overflow-x-auto text-xs">
        {(['catalog', 'supervision', 'models', 'software', 'cloud', 'diagnostics'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveSection(tab)}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap cursor-pointer ${
              activeSection === tab ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400'
            }`}
          >
            {tab === 'catalog' && 'Catálogo'}
            {tab === 'supervision' && 'Supervisión'}
            {tab === 'models' && 'Modelos IA'}
            {tab === 'software' && 'Arquitectura'}
            {tab === 'cloud' && 'Cloud $0'}
            {tab === 'diagnostics' && 'Diagnóstico'}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* SECTION 1: PRODUCT CATALOG MANAGEMENT (EXCLUSIVE GOD MODE) */}
        {activeSection === 'catalog' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950/60 text-purple-300 border border-purple-800/50 uppercase">
                    Permiso Exclusivo Desarrollador
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                  Gestión del Catálogo de Productos
                </h1>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
                  Control absoluto para agregar, editar y eliminar hardware y calzado del catálogo global, configurar ofertas de tiendas y ponderaciones QPI.
                </p>
              </div>

              <button
                onClick={handleOpenNewProduct}
                className="py-2.5 px-4 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-xl text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-xs shrink-0 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Nuevo Producto</span>
              </button>
            </div>

            {/* Catalog Products Table */}
            <div className="border border-zinc-800/80 rounded-2xl bg-zinc-900/30 overflow-hidden shadow-xs">
              <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950/50">
                <span className="text-xs font-semibold text-white">
                  Productos Registrados ({catalogProducts.length})
                </span>
                <span className="text-[11px] font-mono text-zinc-500">
                  Actualizaciones sincronizadas en memoria y clientes
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-950/80 text-[11px] font-mono uppercase text-zinc-400 border-b border-zinc-800/80">
                    <tr>
                      <th className="py-3 px-4">Producto</th>
                      <th className="py-3 px-4">Categoría</th>
                      <th className="py-3 px-4">Marca</th>
                      <th className="py-3 px-4">QPI Score</th>
                      <th className="py-3 px-4">Mejor Oferta</th>
                      <th className="py-3 px-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                    {catalogProducts.map(prod => {
                      const minPrice = Math.min(...prod.listings.map(l => l.price));
                      const bestMerchant = prod.listings.find(l => l.price === minPrice)?.merchantName || 'Amazon';
                      return (
                        <tr key={prod.id} className="hover:bg-zinc-800/25 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-zinc-950 overflow-hidden border border-zinc-800 shrink-0">
                                <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="min-w-0">
                                <div className="font-semibold text-white truncate max-w-xs">{prod.name}</div>
                                <div className="text-[10px] text-zinc-500 font-mono truncate">{prod.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="capitalize px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[10px]">
                              {prod.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-zinc-300 font-medium">
                            {prod.brand}
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-mono text-emerald-400 font-semibold">
                              {prod.qpiScore}/100 ({prod.valueGrade})
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono">
                            <span className="text-white font-semibold">${minPrice} USD</span>
                            <span className="text-zinc-500 text-[10px] ml-1">({bestMerchant})</span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenEditProduct(prod)}
                                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                                title="Editar producto"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(prod.id, prod.name)}
                                className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-300 transition-colors cursor-pointer"
                                title="Eliminar producto"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* SECTION 2: PLATFORM SUPERVISION & PROFESSIONAL PURCHASES PANEL */}
        {activeSection === 'supervision' && (
          <div className="space-y-6">
            
            {/* Header Box */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  Supervisión Global God Mode
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/50">
                  Acceso Auditor
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Supervisión de Usuarios y Panel Profesional de Compras
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
                Supervisa el estado de la comunidad, las compras ejecutadas y el log de auditoría. De acuerdo con las normas de privacidad y el principio de mínimo privilegio, las contraseñas, hashes y métodos de pago permanecen encriptados y ocultos.
              </p>
            </div>

            {/* Privacy Compliance Banner */}
            <div className="p-3.5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl flex items-center gap-3 text-xs text-zinc-300">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong className="text-white">Privacidad y Seguridad Reforzada:</strong> Las contraseñas, hashes PBKDF2 y métodos de pago están completamente resguardados y ocultos para cumplir con las directivas de seguridad.
              </span>
            </div>

            {/* Users Oversight Table (Public Data Only) */}
            <div className="border border-zinc-800/80 rounded-2xl bg-zinc-900/30 overflow-hidden shadow-xs space-y-0">
              <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950/50">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-zinc-400" />
                  <span className="text-xs font-semibold text-white">
                    Usuarios del Sistema (Datos Públicos y Roles)
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">
                  Total: {techSpecData?.usersSupervision?.length || 8} cuentas
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-950/80 text-[10px] font-mono uppercase text-zinc-400 border-b border-zinc-800">
                    <tr>
                      <th className="py-2.5 px-4">Usuario</th>
                      <th className="py-2.5 px-4">Correo Electrónico</th>
                      <th className="py-2.5 px-4">Rol Asignado</th>
                      <th className="py-2.5 px-4">Fecha de Registro</th>
                      <th className="py-2.5 px-4">Último Acceso</th>
                      <th className="py-2.5 px-4 text-right">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                    {(techSpecData?.usersSupervision || []).map((u: any) => (
                      <tr key={u.id} className="hover:bg-zinc-800/25 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-zinc-800 overflow-hidden border border-zinc-700 shrink-0">
                              <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="font-medium text-white">{u.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-zinc-400 text-[11px]">
                          {u.email}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border ${
                            u.role === 'developer'
                              ? 'bg-purple-950/60 text-purple-300 border-purple-800/60'
                              : u.role === 'admin'
                              ? 'bg-blue-950/60 text-blue-300 border-blue-800/60'
                              : 'bg-zinc-800/70 text-zinc-300 border-zinc-700/80'
                          }`}>
                            {u.role === 'developer' ? 'God Mode' : u.role === 'admin' ? 'Admin' : 'Usuario'}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-zinc-500 text-[11px]">
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                        </td>
                        <td className="py-3 px-4 font-mono text-zinc-400 text-[11px]">
                          {u.lastLogin ? new Date(u.lastLogin).toLocaleTimeString() : 'N/A'}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            Activo
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PROFESSIONAL PURCHASES PANEL */}
            <div className="border border-zinc-800/80 rounded-2xl bg-zinc-900/30 overflow-hidden shadow-xs space-y-0">
              <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950/50">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-white">
                    Panel Profesional de Compras Realizadas
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">
                  {ordersList.length} transacciones registradas
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-950/80 text-[10px] font-mono uppercase text-zinc-400 border-b border-zinc-800">
                    <tr>
                      <th className="py-2.5 px-4">ID Orden</th>
                      <th className="py-2.5 px-4">Comprador</th>
                      <th className="py-2.5 px-4">Artículos y Tiendas</th>
                      <th className="py-2.5 px-4">Monto Total</th>
                      <th className="py-2.5 px-4">Fecha</th>
                      <th className="py-2.5 px-4 text-right">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                    {ordersList.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-zinc-500 font-mono text-xs">
                          No hay compras registradas en este período.
                        </td>
                      </tr>
                    ) : (
                      ordersList.map(order => (
                        <tr key={order.id} className="hover:bg-zinc-800/25 transition-colors">
                          <td className="py-3 px-4 font-mono text-[11px] text-zinc-400">
                            {order.id}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-white">{order.userName}</div>
                            <div className="text-[10px] font-mono text-zinc-500">{order.userEmail}</div>
                          </td>
                          <td className="py-3 px-4 max-w-xs">
                            <div className="space-y-1">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between text-[11px]">
                                  <span className="truncate max-w-[180px] text-zinc-300">
                                    {item.quantity}x {item.productName}
                                  </span>
                                  <span className="font-mono text-zinc-400 text-[10px] shrink-0">
                                    ({item.merchantName})
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono font-semibold text-emerald-400">
                            ${order.totalAmount} USD
                          </td>
                          <td className="py-3 px-4 font-mono text-zinc-500 text-[11px]">
                            {order.createdAt ? new Date(order.createdAt).toLocaleString() : '—'}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-950/60 text-emerald-300 border border-emerald-800/50">
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ACTIVITY LOG (AUDIT TRAIL) */}
            <div className="border border-zinc-800/80 rounded-2xl bg-zinc-900/30 overflow-hidden shadow-xs space-y-0">
              <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950/50">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-semibold text-white">
                    Historial de Actividad & Logs de Auditoría
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">
                  Eventos inmutables del servidor
                </span>
              </div>

              <div className="divide-y divide-zinc-800/60 max-h-80 overflow-y-auto font-mono text-[11px]">
                {(techSpecData?.recentAuditLogs || []).map((log: any) => (
                  <div key={log.id} className="p-3 hover:bg-zinc-800/20 transition-colors flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-500 text-[10px] w-28 shrink-0">
                        {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : '—'}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] uppercase font-semibold">
                        {log.action}
                      </span>
                      <span className="text-zinc-300 font-sans text-xs">
                        {log.detail}
                      </span>
                    </div>
                    <span className="text-zinc-500 text-[10px] shrink-0">
                      {log.userEmail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* SECTION 3: AI MODELS MATHEMATICAL & ARCHITECTURAL SUSTENTATION */}
        {activeSection === 'models' && (
          <div className="space-y-6">
            
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-2">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                Sustentación Teórica
              </span>
              <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Integración de Transformers, CNN, LSTM y Búsqueda Inteligente
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
                Ninguna arquitectura única resuelve simultáneamente la extracción no estructurada de lenguaje, la verificación visual fotográfica y la predicción de series temporales de precios.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Transformers */}
              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Transformers (Atención Semántica)</h3>
                    <span className="text-[11px] text-zinc-400 font-mono">NLP & Extracción de Especificaciones</span>
                  </div>
                  <span className="text-[10px] font-mono bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800">
                    Gemini 2.5 Flash
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  El lenguaje en fichas de producto y requerimientos de usuario es heterogéneo. El mecanismo de autoatención relaciona términos coloquiales ("algo potente para juegos pesados") con componentes clave (GPU RTX, 16GB RAM, 144Hz).
                </p>
                <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800/80 font-mono text-[11px] text-zinc-400 space-y-1">
                  <div className="text-zinc-300 font-medium">Scaled Dot-Product Attention:</div>
                  <code>Attention(Q, K, V) = softmax((Q · K^T) / sqrt(d_k)) · V</code>
                </div>
              </div>

              {/* CNN */}
              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Redes Convolucionales (CNN)</h3>
                    <span className="text-[11px] text-zinc-400 font-mono">Computer Vision & Quality Assurance</span>
                  </div>
                  <span className="text-[10px] font-mono bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800">
                    ResNet Feature Map
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Las convoluciones espaciales extraen mapas de características invariantes a escala para detectar materiales genuinos, acabados de calzado y estado de componentes informáticos.
                </p>
                <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800/80 font-mono text-[11px] text-zinc-400 space-y-1">
                  <div className="text-zinc-300 font-medium">Operación de Convolución 2D:</div>
                  <code>(I * K)(i, j) = sum_m sum_n I(i-m, j-n) · K(m, n)</code>
                </div>
              </div>

              {/* LSTM */}
              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Redes Recurrentes (LSTM)</h3>
                    <span className="text-[11px] text-zinc-400 font-mono">Time-Series & Price Forecasting</span>
                  </div>
                  <span className="text-[10px] font-mono bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800">
                    Dual-Gate Cell
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  El historial de precios presenta dependencias a largo plazo y estacionalidad. Las compuertas de olvido y actualización preservan memoria histórica para predecir caídas de precio en tiendas.
                </p>
                <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800/80 font-mono text-[11px] text-zinc-400 space-y-1">
                  <div className="text-zinc-300 font-medium">Cell State Update:</div>
                  <code>C_t = f_t * C_t-1 + i_t * tanh(W_c · [h_t-1, x_t] + b_c)</code>
                </div>
              </div>

              {/* Motor de Búsqueda Inteligente Multiobjetivo */}
              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Búsqueda Inteligente Multiobjetivo</h3>
                    <span className="text-[11px] text-zinc-400 font-mono">Deducción Implícita + QPI</span>
                  </div>
                  <span className="text-[10px] font-mono bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800">
                    Rentabilidad Pareto
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Analiza el prompt del usuario en lenguaje natural para extraer requerimientos implícitos y ponderar rentabilidad (QPI), garantizando precios mínimos entre tiendas confiables verificadas.
                </p>
                <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800/80 font-mono text-[11px] text-zinc-400 space-y-1">
                  <div className="text-zinc-300 font-medium">Función de Aptitud QPI:</div>
                  <code>QPI = alpha·Calidad + beta·(1/PrecioNorm) + gamma·ConfianzaTienda</code>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* SECTION 4: SOFTWARE ARCHITECTURE & POSTGRESQL DDL */}
        {activeSection === 'software' && (
          <div className="space-y-6">
            
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-2">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                Full-Stack Architecture
              </span>
              <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Arquitectura de Software y Base de Datos Relacional
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
                Diseño modular con React 19, TypeScript, Express y hashing criptográfico PBKDF2 (HMAC-SHA512).
              </p>
            </div>

            {/* DDL Schema Viewer */}
            <div className="rounded-2xl bg-zinc-900/30 border border-zinc-800/80 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">Esquema Relacional PostgreSQL (DDL)</h3>
                  <p className="text-xs text-zinc-400">
                    Definición SQL para tablas <code className="text-zinc-300 font-mono">users</code>, <code className="text-zinc-300 font-mono">sessions</code>, <code className="text-zinc-300 font-mono">audit_logs</code> y <code className="text-zinc-300 font-mono">orders</code>.
                  </p>
                </div>
                <button
                  onClick={handleCopySql}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{copiedSql ? 'Copiado ✓' : 'Copiar DDL SQL'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-zinc-950 text-zinc-300 text-xs font-mono overflow-x-auto leading-relaxed border border-zinc-800">
                {techSpecData?.postgresSchemaDDL || `-- PostgreSQL Schema DDL
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL DEFAULT 'user',
    password_hash VARCHAR(128) NOT NULL,
    password_salt VARCHAR(64) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`}
              </pre>
            </div>

          </div>
        )}

        {/* SECTION 5: CLOUD RUN $0 JUSTIFICATION */}
        {activeSection === 'cloud' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-2">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                Infraestructura Serverless
              </span>
              <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Despliegue Serverless con Costo $0 USD en Google Cloud Run
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
                Aprovechamiento integral del Free Tier perpetuo de Cloud Run y modelos de IA en edge.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 space-y-2">
                <span className="text-[11px] font-mono text-zinc-500 uppercase">Solicitudes Mensuales</span>
                <div className="text-xl font-semibold text-white">2,000,000 Gratis</div>
                <p className="text-xs text-zinc-400">
                  Capa perpetua gratuita de Google Cloud Run para tráfico web y API sin costo fijo.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 space-y-2">
                <span className="text-[11px] font-mono text-zinc-500 uppercase">Memoria y CPU</span>
                <div className="text-xl font-semibold text-emerald-400">Escala a Cero</div>
                <p className="text-xs text-zinc-400">
                  360,000 GB-segundos y 180,000 vCPU-segundos incluidos cada mes. Cero cobro en reposo.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 space-y-2">
                <span className="text-[11px] font-mono text-zinc-500 uppercase">Inferencia IA</span>
                <div className="text-xl font-semibold text-purple-400">$0.00 USD</div>
                <p className="text-xs text-zinc-400">
                  Google AI Studio Free Tier para Gemini 2.5 Flash + algoritmos en memoria con latencia sub-50ms.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: DIAGNOSTICS & SYSTEM TELEMETRY */}
        {activeSection === 'diagnostics' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-2">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                System Telemetry
              </span>
              <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Diagnóstico del Proceso y Recursos del Servidor
              </h1>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/80">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Node.js Runtime</span>
                <div className="text-sm font-semibold text-white font-mono mt-1">
                  {techSpecData?.systemDiagnostics?.nodeVersion || 'v22.x'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/80">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Memoria RSS</span>
                <div className="text-sm font-semibold text-emerald-400 font-mono mt-1">
                  {techSpecData?.systemDiagnostics?.memoryRssMB || 78} MB
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/80">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Heap Utilizado</span>
                <div className="text-sm font-semibold text-purple-400 font-mono mt-1">
                  {techSpecData?.systemDiagnostics?.memoryHeapUsedMB || 42} MB
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/80">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Tiempo de Actividad</span>
                <div className="text-sm font-semibold text-white font-mono mt-1">
                  {techSpecData?.systemDiagnostics?.uptimeSeconds || 3600}s
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* PRODUCT ADD / EDIT MODAL */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0e1017] border border-zinc-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl text-zinc-100">
            
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-zinc-800 text-purple-300">
                  {editingProduct.id ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
                <h3 className="text-base font-semibold text-white">
                  {editingProduct.id ? 'Editar Producto del Catálogo' : 'Agregar Nuevo Producto al Catálogo'}
                </h3>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-zinc-400 font-mono text-[11px] mb-1">Nombre del Producto</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    placeholder="Ej. ASUS ROG Zephyrus G16"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-mono text-[11px] mb-1">Marca</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.brand || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    placeholder="Ej. ASUS, Apple, Samsung, Nike"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-mono text-[11px] mb-1">Categoría</label>
                  <select
                    value={editingProduct.category || 'computadoras'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as ProductCategory })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-600 cursor-pointer"
                  >
                    <option value="computadoras">Computadoras</option>
                    <option value="celulares">Celulares</option>
                    <option value="zapatos">Zapatos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 font-mono text-[11px] mb-1">Precio Oferta ($ USD)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={editingProduct.listings?.[0]?.price || 999}
                    onChange={(e) => {
                      const newPrice = Number(e.target.value);
                      const currentListings = [...(editingProduct.listings || [])];
                      if (currentListings[0]) {
                        currentListings[0].price = newPrice;
                      }
                      setEditingProduct({ ...editingProduct, listings: currentListings });
                    }}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-600 font-mono"
                  />
                </div>

              </div>

              <div>
                <label className="block text-zinc-400 font-mono text-[11px] mb-1">URL de Imagen</label>
                <input
                  type="url"
                  required
                  value={editingProduct.imageUrl || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-mono text-[11px] mb-1">Resumen / Descripción</label>
                <textarea
                  rows={2}
                  value={editingProduct.summary || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, summary: e.target.value })}
                  placeholder="Descripción técnica del producto..."
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-mono text-[11px] mb-1">QPI Score (1 - 100)</label>
                  <input
                    type="number"
                    min={50}
                    max={100}
                    value={editingProduct.qpiScore || 90}
                    onChange={(e) => setEditingProduct({ ...editingProduct, qpiScore: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white font-mono focus:outline-none focus:border-zinc-600"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-mono text-[11px] mb-1">Tienda Principal</label>
                  <input
                    type="text"
                    value={editingProduct.listings?.[0]?.merchantName || 'Amazon'}
                    onChange={(e) => {
                      const newMerchant = e.target.value;
                      const currentListings = [...(editingProduct.listings || [])];
                      if (currentListings[0]) {
                        currentListings[0].merchantName = newMerchant;
                      }
                      setEditingProduct({ ...editingProduct, listings: currentListings });
                    }}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={modalFormLoading}
                  className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-medium rounded-xl transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {modalFormLoading ? 'Guardando...' : editingProduct.id ? 'Actualizar Producto' : 'Crear Producto'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-500 font-mono">
        <p>Omni.IA • Panel Desarrollador / God Mode (Sustentación & Supervisión)</p>
      </footer>

    </div>
  );
};
