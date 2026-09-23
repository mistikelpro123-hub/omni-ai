import { User, UserRole, BackofficeStats } from '../types/auth';
import { Product, CartItem, PurchaseOrder, IntelligentSearchAnalysis, IntelligentRecommendation } from '../types/product';

const TOKEN_KEY = 'omni_ia_auth_token';
const USER_KEY = 'omni_ia_auth_user';

export const authService = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  getStoredUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  setSession(token: string, user: User) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  async login(email: string, password: string): Promise<User> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'Fallo de autenticación');
    }
    this.setSession(data.token, data.user);
    return data.user;
  },

  async register(email: string, password: string, name: string, role: UserRole = 'user'): Promise<User> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, role })
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'Fallo al registrar usuario');
    }
    this.setSession(data.token, data.user);
    return data.user;
  },

  async loginWithGoogle(email?: string, name?: string, avatar?: string, targetRole: UserRole = 'user'): Promise<User> {
    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, avatar, targetRole })
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'Error en Google Sign-In');
    }
    this.setSession(data.token, data.user);
    return data.user;
  },

  async fetchMe(): Promise<User | null> {
    const token = this.getToken();
    if (!token) return null;
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.user) {
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        return data.user;
      } else {
        this.clearSession();
        return null;
      }
    } catch {
      return this.getStoredUser();
    }
  },

  async logout(): Promise<void> {
    const token = this.getToken();
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (e) {
        console.warn('Logout network error ignored', e);
      }
    }
    this.clearSession();
  },

  async getBackofficeDashboard(): Promise<{ stats?: BackofficeStats; users: any[]; catalog?: any[] }> {
    const token = this.getToken();
    const res = await fetch('/api/backoffice/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'No autorizado para acceder a Backoffice');
    }
    return {
      stats: data.stats,
      users: data.users || [],
      catalog: data.catalog || []
    };
  },

  async getDeveloperTechSpec(): Promise<any> {
    const token = this.getToken();
    const res = await fetch('/api/developer/tech-spec', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'No autorizado para acceder a Vista Desarrollador');
    }
    return data.architectureData;
  },

  // Products CRUD
  async fetchProducts(): Promise<Product[]> {
    const res = await fetch('/api/products');
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'Error al obtener productos');
    }
    return data.products;
  },

  async createProduct(product: Partial<Product>): Promise<Product> {
    const token = this.getToken();
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(product)
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'Error al crear producto');
    }
    return data.product;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const token = this.getToken();
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updates)
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'Error al actualizar producto');
    }
    return data.product;
  },

  async deleteProduct(id: string): Promise<boolean> {
    const token = this.getToken();
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'Error al eliminar producto');
    }
    return true;
  },

  // Intelligent Natural Language Search
  async executeIntelligentSearch(prompt: string): Promise<{
    analysis: IntelligentSearchAnalysis;
    recommendations: IntelligentRecommendation[];
  }> {
    const res = await fetch('/api/search/intelligent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'Error al ejecutar búsqueda inteligente');
    }
    return {
      analysis: data.analysis,
      recommendations: data.recommendations
    };
  },

  // Shopping Cart & Orders
  async checkoutCart(items: CartItem[]): Promise<PurchaseOrder> {
    const token = this.getToken();
    const res = await fetch('/api/cart/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ items })
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'Error al procesar compra');
    }
    return data.order;
  },

  async fetchOrders(): Promise<PurchaseOrder[]> {
    const token = this.getToken();
    const res = await fetch('/api/orders', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'Error al obtener órdenes');
    }
    return data.orders;
  }
};
