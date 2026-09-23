import crypto from 'crypto';
import { User, UserRole, BackofficeStats } from '../src/types/auth';
import { Product, CartItem, PurchaseOrder } from '../src/types/product';
import { INITIAL_PRODUCTS_DATASET } from '../src/data/productsDatabase';

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  passwordHash: string;
  passwordSalt: string;
  avatar: string;
  createdAt: string;
  lastLogin: string;
}

export interface StoredSession {
  token: string;
  userId: string;
  createdAt: number;
  expiresAt: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userEmail: string;
  action: string;
  category: string;
  detail: string;
}

// Cryptographic Password Hashing using PBKDF2 (SHA-512, 10,000 iterations, 64-byte key)
export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const activeSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, activeSalt, 10000, 64, 'sha512').toString('hex');
  return { hash, salt: activeSalt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const computed = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return computed === hash;
}

// In-Memory Database with Pre-Seeded Hashed Accounts
class SimpleDatabase {
  private users: Map<string, StoredUser> = new Map();
  private sessions: Map<string, StoredSession> = new Map();
  private auditLogs: AuditLog[] = [];
  private products: Map<string, Product> = new Map();
  private orders: PurchaseOrder[] = [];
  
  // Counters for Backoffice Analytics
  public statsCounters = {
    totalSearches: 14290,
    geneticOptimizationsRun: 3842,
    lstmHistoricalDipsCount: 158,
  };

  constructor() {
    this.seedDefaultUsers();
    this.seedInitialAuditLogs();
    this.seedInitialProducts();
    this.seedInitialOrders();
  }

  private seedInitialProducts() {
    INITIAL_PRODUCTS_DATASET.forEach(p => {
      this.products.set(p.id, { ...p });
    });
  }

  private seedInitialOrders() {
    this.orders = [
      {
        id: 'ord_91823',
        userId: 'usr_carlos_mendez',
        userEmail: 'carlos.mendez@gmail.com',
        userName: 'Carlos Méndez',
        items: [
          {
            productId: 'phone-01',
            productName: 'Samsung Galaxy S24 Ultra',
            brand: 'Samsung',
            category: 'celulares',
            imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80',
            merchantName: 'Amazon',
            price: 1149,
            quantity: 1,
            qpiScore: 92
          }
        ],
        totalAmount: 1149,
        totalItems: 1,
        createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
        status: 'completada'
      },
      {
        id: 'ord_91824',
        userId: 'usr_sofia_morales',
        userEmail: 'sofia.morales@gmail.com',
        userName: 'Sofía Morales',
        items: [
          {
            productId: 'shoe-01',
            productName: 'Nike Vaporfly 3',
            brand: 'Nike',
            category: 'zapatos',
            imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
            merchantName: 'Nike Store',
            price: 249,
            quantity: 1,
            qpiScore: 91
          }
        ],
        totalAmount: 249,
        totalItems: 1,
        createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
        status: 'completada'
      },
      {
        id: 'ord_91825',
        userId: 'usr_lucas_silva',
        userEmail: 'lucas.silva@gmail.com',
        userName: 'Lucas Silva',
        items: [
          {
            productId: 'comp-01',
            productName: 'MacBook Pro 16" M3 Pro',
            brand: 'Apple',
            category: 'computadoras',
            imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
            merchantName: 'Best Buy',
            price: 2399,
            quantity: 1,
            qpiScore: 94
          }
        ],
        totalAmount: 2399,
        totalItems: 1,
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        status: 'completada'
      }
    ];
  }

  private seedDefaultUsers() {
    const defaultAccounts: { email: string; name: string; pass: string; role: UserRole; avatar: string }[] = [
      // 3 Usuarios Regulares Ficticios
      {
        email: 'carlos.mendez@gmail.com',
        name: 'Carlos Méndez',
        pass: 'carlos123',
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
      },
      {
        email: 'sofia.morales@gmail.com',
        name: 'Sofía Morales',
        pass: 'sofia123',
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
      },
      {
        email: 'lucas.silva@gmail.com',
        name: 'Lucas Silva',
        pass: 'lucas123',
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
      },

      // 2 Administradores
      {
        email: 'elena.admin@omni.ia',
        name: 'Elena Torres (Admin Operaciones)',
        pass: 'admin123',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80'
      },
      {
        email: 'marcos.admin@omni.ia',
        name: 'Marcos Vega (Admin Auditoría)',
        pass: 'admin456',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
      },

      // 3 Desarrolladores (God Mode)
      {
        email: 'mistikelpro123@gmail.com',
        name: 'Ing. Propietario (God Mode)',
        pass: 'admin',
        role: 'developer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
      },
      {
        email: 'alex.dev@omni.ia',
        name: 'Alex Rivera (Arquitecto Software)',
        pass: 'dev123',
        role: 'developer',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80'
      },
      {
        email: 'clara.mlops@omni.ia',
        name: 'Clara Chen (ML & Tensors Lead)',
        pass: 'mlops123',
        role: 'developer',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80'
      }
    ];

    for (const acc of defaultAccounts) {
      const { hash, salt } = hashPassword(acc.pass);
      const id = 'usr_' + crypto.randomBytes(6).toString('hex');
      this.users.set(acc.email.toLowerCase(), {
        id,
        email: acc.email.toLowerCase(),
        name: acc.name,
        role: acc.role,
        passwordHash: hash,
        passwordSalt: salt,
        avatar: acc.avatar,
        createdAt: '2026-09-01T10:00:00.000Z',
        lastLogin: new Date().toISOString()
      });
    }
  }

  private seedInitialAuditLogs() {
    this.auditLogs = [
      {
        id: 'log_001',
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
        userEmail: 'admin@omni.ia',
        action: 'INICIO_SESION',
        category: 'SEGURIDAD',
        detail: 'Acceso autorizado al módulo Backoffice vía PBKDF2 hash'
      },
      {
        id: 'log_002',
        timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
        userEmail: 'dev@omni.ia',
        action: 'TUNING_PESOS_IA',
        category: 'MODELOS_ML',
        detail: 'Reajuste de vector hiperparámetros (QPI alpha=0.35, beta=0.25)'
      },
      {
        id: 'log_003',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        userEmail: 'usuario@omni.ia',
        action: 'OPTIMIZACION_GENETICA',
        category: 'ALGORITMO_PARETO',
        detail: 'Ejecución de algoritmo genético para celulares (50 cromosomas, 40 gens)'
      },
      {
        id: 'log_004',
        timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
        userEmail: 'usuario@omni.ia',
        action: 'BUSQUEDA_TRANSFORMER',
        category: 'CONSULTA_CATALOGO',
        detail: 'Búsqueda semántica para laptops ultraligeras con GPU RTX'
      }
    ];
  }

  public findUserByEmail(email: string): StoredUser | undefined {
    return this.users.get(email.toLowerCase().trim());
  }

  public findUserById(id: string): StoredUser | undefined {
    for (const u of this.users.values()) {
      if (u.id === id) return u;
    }
    return undefined;
  }

  public createUser(email: string, passwordPlain: string, name: string, role: UserRole = 'user'): StoredUser {
    const normalizedEmail = email.toLowerCase().trim();
    if (this.users.has(normalizedEmail)) {
      throw new Error('El correo electrónico ya se encuentra registrado.');
    }

    const { hash, salt } = hashPassword(passwordPlain);
    const id = 'usr_' + crypto.randomBytes(6).toString('hex');
    const newUser: StoredUser = {
      id,
      email: normalizedEmail,
      name: name.trim() || normalizedEmail.split('@')[0],
      role,
      passwordHash: hash,
      passwordSalt: salt,
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(normalizedEmail)}`,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    this.users.set(normalizedEmail, newUser);
    this.logAction(normalizedEmail, 'REGISTRO_USUARIO', 'SEGURIDAD', `Cuenta creada con rol ${role} y hash PBKDF2`);
    return newUser;
  }

  public authenticateUser(email: string, passwordPlain: string): { user: User; token: string } {
    const user = this.findUserByEmail(email);
    if (!user) {
      throw new Error('Credenciales inválidas: Usuario no encontrado.');
    }

    const isValid = verifyPassword(passwordPlain, user.passwordHash, user.passwordSalt);
    if (!isValid) {
      this.logAction(email, 'FALLO_AUTENTICACION', 'SEGURIDAD', 'Contraseña incorrecta ingresada');
      throw new Error('Credenciales inválidas: Contraseña incorrecta.');
    }

    user.lastLogin = new Date().toISOString();
    const token = this.createSession(user.id);
    this.logAction(user.email, 'INICIO_SESION', 'SEGURIDAD', `Acceso exitoso con rol ${user.role}`);

    return {
      user: this.toPublicUser(user),
      token
    };
  }

  public authenticateGoogle(email: string, name?: string, avatar?: string, targetRole: UserRole = 'user'): { user: User; token: string } {
    const normalizedEmail = email.toLowerCase().trim();
    let user = this.findUserByEmail(normalizedEmail);

    if (!user) {
      const { hash, salt } = hashPassword(crypto.randomBytes(16).toString('hex'));
      const id = 'usr_g_' + crypto.randomBytes(6).toString('hex');
      user = {
        id,
        email: normalizedEmail,
        name: name || normalizedEmail.split('@')[0],
        role: normalizedEmail.includes('admin') ? 'admin' : (normalizedEmail.includes('dev') || normalizedEmail === 'mistikelpro123@gmail.com' ? 'developer' : targetRole),
        passwordHash: hash,
        passwordSalt: salt,
        avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(normalizedEmail)}`,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      this.users.set(normalizedEmail, user);
      this.logAction(normalizedEmail, 'REGISTRO_GOOGLE', 'OAUTH_SIMULADO', 'Usuario auto-creado vía Google Auth');
    } else {
      user.lastLogin = new Date().toISOString();
      if (name) user.name = name;
      if (avatar) user.avatar = avatar;
      this.logAction(user.email, 'LOGIN_GOOGLE', 'OAUTH_SIMULADO', 'Inicio de sesión con cuenta Google');
    }

    const token = this.createSession(user.id);
    return {
      user: this.toPublicUser(user),
      token
    };
  }

  public createSession(userId: string): string {
    const token = 'omn_' + crypto.randomBytes(24).toString('hex');
    const now = Date.now();
    const expiresAt = now + (7 * 24 * 60 * 60 * 1000); // 7 days

    this.sessions.set(token, {
      token,
      userId,
      createdAt: now,
      expiresAt
    });

    return token;
  }

  public validateSession(token: string): User | null {
    if (!token) return null;
    const session = this.sessions.get(token);
    if (!session) return null;

    if (Date.now() > session.expiresAt) {
      this.sessions.delete(token);
      return null;
    }

    const user = this.findUserById(session.userId);
    return user ? this.toPublicUser(user) : null;
  }

  public invalidateSession(token: string): boolean {
    return this.sessions.delete(token);
  }

  public toPublicUser(user: StoredUser): User {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
      passwordSalt: user.passwordSalt.substring(0, 10) + '...',
      passwordHashPreview: `pbkdf2:sha512:10000:${user.passwordHash.substring(0, 14)}...`
    };
  }

  public getAllUsers(): User[] {
    return Array.from(this.users.values()).map(u => this.toPublicUser(u));
  }

  public logAction(userEmail: string, action: string, category: string, detail: string) {
    const newLog: AuditLog = {
      id: 'log_' + crypto.randomBytes(4).toString('hex'),
      timestamp: new Date().toISOString(),
      userEmail,
      action,
      category,
      detail
    };
    this.auditLogs.unshift(newLog);
    if (this.auditLogs.length > 100) {
      this.auditLogs.pop();
    }
  }

  public getAuditLogs(): AuditLog[] {
    return this.auditLogs.slice(0, 30);
  }

  public getBackofficeStats(totalCatalogCount: number): BackofficeStats {
    return {
      totalSearches: this.statsCounters.totalSearches,
      geneticOptimizationsRun: this.statsCounters.geneticOptimizationsRun,
      averageSavingsUSD: 184.50,
      averageSavingsPercent: 28.4,
      averageQpiScore: 89.2,
      lstmHistoricalDipsCount: this.statsCounters.lstmHistoricalDipsCount,
      totalUsersCount: this.users.size,
      totalCatalogProducts: totalCatalogCount,
      categoryDistribution: [
        { category: 'celulares', label: 'Celulares y Smartphones', count: 6573, percentage: 46 },
        { category: 'computadoras', label: 'Laptops y Estaciones', count: 4858, percentage: 34 },
        { category: 'zapatos', label: 'Zapatos y Calzado', count: 2859, percentage: 20 }
      ],
      merchantShare: [
        { merchant: 'Amazon', bestOfferCount: 1613, percentage: 42, avgTrust: 98 },
        { merchant: 'MercadoLibre', bestOfferCount: 1191, percentage: 31, avgTrust: 95 },
        { merchant: 'eBay', bestOfferCount: 691, percentage: 18, avgTrust: 91 },
        { merchant: 'Best Buy', bestOfferCount: 347, percentage: 9, avgTrust: 96 }
      ],
      weeklyActivity: [
        { day: 'Lun', searches: 1850, gaRuns: 490 },
        { day: 'Mar', searches: 2100, gaRuns: 580 },
        { day: 'Mie', searches: 2450, gaRuns: 630 },
        { day: 'Jue', searches: 2200, gaRuns: 590 },
        { day: 'Vie', searches: 2800, gaRuns: 760 },
        { day: 'Sab', searches: 1650, gaRuns: 430 },
        { day: 'Dom', searches: 1240, gaRuns: 362 }
      ],
      recentAuditLogs: this.getAuditLogs()
    };
  }

  public getPublicUsersSupervision(): Array<{
    id: string;
    email: string;
    name: string;
    role: UserRole;
    avatar: string;
    createdAt: string;
    lastLogin: string;
  }> {
    // Explicitly omitting passwordHash, passwordSalt, and payment methods for privacy/security compliance
    return Array.from(this.users.values()).map(u => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      avatar: u.avatar,
      createdAt: u.createdAt,
      lastLogin: u.lastLogin
    }));
  }

  // ==========================================
  // PRODUCT CATALOG MANAGEMENT (GOD MODE / DEVELOPER EXCLUSIVE)
  // ==========================================

  public getProducts(): Product[] {
    return Array.from(this.products.values());
  }

  public getProductById(id: string): Product | undefined {
    return this.products.get(id);
  }

  public addProduct(productData: Product, actorEmail: string = 'dev@omni.ia'): Product {
    const id = productData.id || `prod_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newProduct: Product = {
      ...productData,
      id
    };
    this.products.set(id, newProduct);
    this.logAction(actorEmail, 'CREAR_PRODUCTO', 'CATALOGO', `Producto creado: ${newProduct.name} (${newProduct.category})`);
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<Product>, actorEmail: string = 'dev@omni.ia'): Product {
    const existing = this.products.get(id);
    if (!existing) {
      throw new Error(`Producto con ID ${id} no encontrado.`);
    }
    const updated: Product = {
      ...existing,
      ...updates,
      id // preserve ID
    };
    this.products.set(id, updated);
    this.logAction(actorEmail, 'EDITAR_PRODUCTO', 'CATALOGO', `Producto actualizado: ${updated.name}`);
    return updated;
  }

  public deleteProduct(id: string, actorEmail: string = 'dev@omni.ia'): boolean {
    const existing = this.products.get(id);
    if (!existing) return false;
    this.products.delete(id);
    this.logAction(actorEmail, 'ELIMINAR_PRODUCTO', 'CATALOGO', `Producto eliminado: ${existing.name}`);
    return true;
  }

  // ==========================================
  // SHOPPING CART & ORDERS MANAGEMENT
  // ==========================================

  public createOrder(userId: string, userEmail: string, userName: string, items: CartItem[]): PurchaseOrder {
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    const newOrder: PurchaseOrder = {
      id: 'ord_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6),
      userId,
      userEmail,
      userName,
      items: [...items],
      totalAmount,
      totalItems,
      createdAt: new Date().toISOString(),
      status: 'completada'
    };

    this.orders.unshift(newOrder);
    this.logAction(userEmail, 'COMPRA_REALIZADA', 'TRANSACCION', `Orden ${newOrder.id} por $${totalAmount} USD (${totalItems} artículos)`);
    return newOrder;
  }

  public getOrders(): PurchaseOrder[] {
    return [...this.orders];
  }

  public getUserOrders(userId: string): PurchaseOrder[] {
    return this.orders.filter(o => o.userId === userId);
  }

  public getPostgresSchemaDDL(): string {
    return `-- ==========================================================
-- Omni.IA - Esquema Relacional PostgreSQL con Hash PBKDF2
-- ==========================================================

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL DEFAULT 'user', -- 'user', 'admin', 'developer'
    password_hash VARCHAR(128) NOT NULL,      -- PBKDF2 HMAC-SHA512 (10,000 iteraciones)
    password_salt VARCHAR(64) NOT NULL,       -- Salt criptográfico aleatorio 16 bytes
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
    token VARCHAR(96) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
    created_at BIGINT NOT NULL,
    expires_at BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(36) PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_email VARCHAR(255) NOT NULL,
    action VARCHAR(64) NOT NULL,
    category VARCHAR(64) NOT NULL,
    detail TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON audit_logs(timestamp DESC);`;
  }
}

export const db = new SimpleDatabase();
