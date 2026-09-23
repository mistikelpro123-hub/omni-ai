import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { UserAppView } from './components/UserAppView';
import { BackofficeView } from './components/BackofficeView';
import { DeveloperTechnicalView } from './components/DeveloperTechnicalView';
import { User, UserRole } from './types/auth';
import { Product } from './types/product';
import { INITIAL_PRODUCTS_DATASET } from './data/productsDatabase';
import { authService } from './services/authService';
import { ShieldCheck, Cpu, User as UserIcon, LogOut, ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => authService.getStoredUser());
  const [currentView, setCurrentView] = useState<'landing' | 'user' | 'backoffice' | 'developer'>('landing');
  
  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalRole, setAuthModalRole] = useState<UserRole>('user');
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register' | 'demo'>('login');

  // Shared Products Dataset
  const [productsDataset, setProductsDataset] = useState<Product[]>(INITIAL_PRODUCTS_DATASET);

  // Sync session on mount
  useEffect(() => {
    authService.fetchMe().then(user => {
      if (user) {
        setCurrentUser(user);
        // Direct user to their default role view
        if (user.role === 'admin') {
          setCurrentView('backoffice');
        } else if (user.role === 'developer') {
          setCurrentView('developer');
        } else {
          setCurrentView('user');
        }
      } else {
        setCurrentUser(null);
        setCurrentView('landing');
      }
    });
  }, []);

  const handleOpenAuth = (role: UserRole = 'user', tab: 'login' | 'register' | 'demo' = 'login') => {
    setAuthModalRole(role);
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setCurrentView('backoffice');
    } else if (user.role === 'developer') {
      setCurrentView('developer');
    } else {
      setCurrentView('user');
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    setCurrentUser(null);
    setCurrentView('landing');
  };

  const handleSwitchView = (targetView: 'user' | 'backoffice' | 'developer') => {
    if (!currentUser) {
      handleOpenAuth('user', 'login');
      return;
    }

    // Role Guard Check
    if (targetView === 'backoffice' && currentUser.role !== 'admin' && currentUser.role !== 'developer') {
      alert('Acceso restringido: Se requiere rol de Administrador o Desarrollador para ingresar al Backoffice.');
      return;
    }

    if (targetView === 'developer' && currentUser.role !== 'developer') {
      alert('Acceso restringido: Se requiere permiso God Mode (Desarrollador) para la sustentación técnica.');
      return;
    }

    setCurrentView(targetView);
  };

  const handleAddCustomProduct = (newProduct: Product) => {
    setProductsDataset(prev => [newProduct, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col font-sans antialiased selection:bg-zinc-800 selection:text-white">

      {/* 1. PUBLIC LANDING PAGE (Entry point) */}
      {currentView === 'landing' && (
        <LandingPage
          onOpenAuth={handleOpenAuth}
          onExplorePublicDemo={() => {
            handleOpenAuth('user', 'demo');
          }}
        />
      )}

      {/* 2. COMPONENT 1: VISTA USUARIO */}
      {currentView === 'user' && currentUser && (
        <UserAppView
          user={currentUser}
          onLogout={handleLogout}
          onSwitchView={handleSwitchView}
          productsDataset={productsDataset}
          onAddCustomProduct={handleAddCustomProduct}
        />
      )}

      {/* 3. COMPONENT 2: BACKOFFICE ADMIN */}
      {currentView === 'backoffice' && currentUser && (
        <BackofficeView
          user={currentUser}
          onLogout={handleLogout}
          onSwitchView={handleSwitchView}
        />
      )}

      {/* 4. COMPONENT 3: VISTA DESARROLLADOR (GOD MODE) */}
      {currentView === 'developer' && currentUser && (
        <DeveloperTechnicalView
          user={currentUser}
          onLogout={handleLogout}
          onSwitchView={handleSwitchView}
          productsDataset={productsDataset}
          onProductsUpdated={(prods) => setProductsDataset(prods)}
        />
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialRole={authModalRole}
        defaultTab={authModalTab}
      />

    </div>
  );
}
