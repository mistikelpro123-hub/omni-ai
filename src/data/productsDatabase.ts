import { Product } from '../types/product';

export const INITIAL_PRODUCTS_DATASET: Product[] = [
  // ==================== CELULARES / SMARTPHONES ====================
  {
    id: 'phone-001',
    name: 'Samsung Galaxy S24 Ultra 5G',
    brand: 'Samsung',
    category: 'celulares',
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    summary: 'El flagship definitivo con procesador Snapdragon 8 Gen 3 for Galaxy, pantalla Dynamic AMOLED 2X brillante y cámara de 200 MP con Zoom Óptico 5x y funciones Galaxy AI.',
    overallRating: 4.8,
    totalReviewsCount: 14250,
    qpiScore: 94,
    qualityScore: 98,
    valueGrade: 'A+',
    lstmTrend: 'DIP_EXPECTED',
    specs: {
      processor: 'Qualcomm Snapdragon 8 Gen 3 for Galaxy (4nm)',
      ram: '12 GB LPDDR5X',
      storage: '256 GB / 512 GB / 1 TB UFS 4.0',
      screen: '6.8" Dynamic AMOLED 2X, QHD+, 120Hz LTPO, 2600 nits, Gorilla Armor',
      camera: '200 MP (Principal OIS) + 50 MP (Periscopio 5x) + 10 MP (Telefoto 3x) + 12 MP (Ultra Gran Angular)',
      battery: '5000 mAh + Carga rápida 45W e Inalámbrica 15W',
      os: 'Android 14 con One UI 6.1 (7 años de actualizaciones)',
      buildMaterial: 'Marco de Titanio Grado 2, Cristal Gorilla Armor antirreflejos'
    },
    listings: [
      {
        id: 'list-s24-1',
        merchantName: 'Amazon',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
        price: 1149,
        originalPrice: 1299,
        currency: 'USD',
        rating: 4.8,
        reviewCount: 8900,
        shipping: 'Envío Gratis Prime',
        stockStatus: 'In Stock',
        productUrl: 'https://www.amazon.com/dp/B0CS3XW3X5',
        verifiedMerchant: true
      },
      {
        id: 'list-s24-2',
        merchantName: 'MercadoLibre',
        merchantLogo: 'https://http2.mlstatic.com/frontend-assets/ui-navigation/5.22.13/mercadolibre/logo__large.png',
        price: 1189,
        originalPrice: 1350,
        currency: 'USD',
        rating: 4.9,
        reviewCount: 3400,
        shipping: 'Envío Gratis Full',
        stockStatus: 'In Stock',
        productUrl: 'https://www.mercadolibre.com/p/MLM29183921',
        verifiedMerchant: true
      },
      {
        id: 'list-s24-3',
        merchantName: 'Best Buy',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Best_Buy_Logo.svg',
        price: 1199,
        originalPrice: 1299,
        currency: 'USD',
        rating: 4.7,
        reviewCount: 1950,
        shipping: 'Retiro en Tienda Gratis / Envío Express',
        stockStatus: 'In Stock',
        productUrl: 'https://www.bestbuy.com/site/6570278.p',
        verifiedMerchant: true
      },
      {
        id: 'list-s24-4',
        merchantName: 'eBay',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg',
        price: 1089,
        originalPrice: 1299,
        currency: 'USD',
        rating: 4.6,
        reviewCount: 820,
        shipping: '$15.00 Envío Internacional',
        stockStatus: 'Low Stock',
        productUrl: 'https://www.ebay.com/itm/395182931',
        verifiedMerchant: true
      }
    ],
    priceHistory: [
      { date: '2026-03', amazonPrice: 1299, bestbuyPrice: 1299, mercadoLibrePrice: 1350 },
      { date: '2026-04', amazonPrice: 1249, bestbuyPrice: 1279, mercadoLibrePrice: 1320 },
      { date: '2026-05', amazonPrice: 1219, bestbuyPrice: 1249, mercadoLibrePrice: 1280 },
      { date: '2026-06', amazonPrice: 1180, bestbuyPrice: 1210, mercadoLibrePrice: 1240 },
      { date: '2026-07', amazonPrice: 1159, bestbuyPrice: 1199, mercadoLibrePrice: 1200 },
      { date: '2026-08', amazonPrice: 1149, bestbuyPrice: 1199, mercadoLibrePrice: 1189 }
    ],
    aiPros: [
      'Procesador Snapdragon 8 Gen 3 con rendimiento tope de gama',
      'El cristal Gorilla Armor reduce drásticamente los reflejos',
      '7 años de actualizaciones del sistema operativo aseguradas',
      'S-Pen integrado con nuevas funciones inteligentes de edición'
    ],
    aiCons: [
      'Cuerpo voluminoso y pesado (232g)',
      'Velocidad de carga de 45W inferior a competidores asiáticos'
    ],
    targetAudience: 'Usuarios exigentes, creadores de contenido, profesionales de negocios y amantes de la fotografía móvil.',
    transformerEmbeddings: [0.82, 0.94, 0.91, 0.88, 0.95, 0.79, 0.92, 0.86],
    cnnVisualFeatures: [0.91, 0.89, 0.96, 0.85, 0.88, 0.90, 0.93, 0.87],
    lstmHiddenState: [-0.04, 0.12, -0.18, 0.09]
  },
  {
    id: 'phone-002',
    name: 'iPhone 16 Pro Max',
    brand: 'Apple',
    category: 'celulares',
    imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
    summary: 'El teléfono insignia de Apple con chip A18 Pro de 3nm, botón Control de Cámara hápico, grabación de video 4K a 120 fps Dolby Vision y acabado en titanio con bordes reducidos.',
    overallRating: 4.9,
    totalReviewsCount: 18900,
    qpiScore: 92,
    qualityScore: 99,
    valueGrade: 'A',
    lstmTrend: 'STABLE',
    specs: {
      processor: 'Apple A18 Pro (3nm de 2ª generación)',
      ram: '8 GB LPDDR5X',
      storage: '256 GB / 512 GB / 1 TB NVMe',
      screen: '6.9" Super Retina XDR OLED, ProMotion 120Hz, Always-On, 2000 nits peak',
      camera: '48 MP Fusion OIS + 48 MP Ultra Gran Angular + 12 MP Telefoto 5x Tetraprisma',
      battery: '4685 mAh + Carga MagSafe 25W / Carga rápida por USB-C',
      os: 'iOS 18 con integración Apple Intelligence',
      buildMaterial: 'Chasis de Titanio Grado 5 con acabado de microesferas y Ceramic Shield'
    },
    listings: [
      {
        id: 'list-i16-1',
        merchantName: 'Amazon',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
        price: 1199,
        originalPrice: 1199,
        currency: 'USD',
        rating: 4.9,
        reviewCount: 11200,
        shipping: 'Envío Gratis Prime',
        stockStatus: 'In Stock',
        productUrl: 'https://www.amazon.com/dp/B0DGJ9M88L',
        verifiedMerchant: true
      },
      {
        id: 'list-i16-2',
        merchantName: 'Best Buy',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Best_Buy_Logo.svg',
        price: 1199,
        originalPrice: 1199,
        currency: 'USD',
        rating: 4.8,
        reviewCount: 4300,
        shipping: 'Retiro Gratis en Tienda Hoy',
        stockStatus: 'In Stock',
        productUrl: 'https://www.bestbuy.com/site/6591200.p',
        verifiedMerchant: true
      },
      {
        id: 'list-i16-3',
        merchantName: 'MercadoLibre',
        merchantLogo: 'https://http2.mlstatic.com/frontend-assets/ui-navigation/5.22.13/mercadolibre/logo__large.png',
        price: 1249,
        originalPrice: 1299,
        currency: 'USD',
        rating: 4.9,
        reviewCount: 2800,
        shipping: 'Envío Gratis Full',
        stockStatus: 'In Stock',
        productUrl: 'https://www.mercadolibre.com/p/MLM39182930',
        verifiedMerchant: true
      },
      {
        id: 'list-i16-4',
        merchantName: 'B&H Photo',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/23/BH_Photo_Video_Logo.svg',
        price: 1199,
        originalPrice: 1199,
        currency: 'USD',
        rating: 4.9,
        reviewCount: 600,
        shipping: 'Envío Rápido 2 Días Gratis',
        stockStatus: 'In Stock',
        productUrl: 'https://www.bhphotovideo.com/c/product/185201',
        verifiedMerchant: true
      }
    ],
    priceHistory: [
      { date: '2026-03', amazonPrice: 1199, bestbuyPrice: 1199, mercadoLibrePrice: 1299 },
      { date: '2026-04', amazonPrice: 1199, bestbuyPrice: 1199, mercadoLibrePrice: 1289 },
      { date: '2026-05', amazonPrice: 1199, bestbuyPrice: 1199, mercadoLibrePrice: 1275 },
      { date: '2026-06', amazonPrice: 1199, bestbuyPrice: 1199, mercadoLibrePrice: 1260 },
      { date: '2026-07', amazonPrice: 1199, bestbuyPrice: 1199, mercadoLibrePrice: 1250 },
      { date: '2026-08', amazonPrice: 1199, bestbuyPrice: 1199, mercadoLibrePrice: 1249 }
    ],
    aiPros: [
      'Chip A18 Pro con la GPU móvil más potente y eficiente energéticamente',
      'Grabación de video profesional 4K 120fps ProRes',
      'Autonomía de batería líder en la industria de telefonía premium',
      'Construcción impecable en titanio con marcialidad de bordes ultradelgados'
    ],
    aiCons: [
      'Precio elevado sin descuentos marcados',
      'Velocidad de carga por cable sigue limitada a ~30W'
    ],
    targetAudience: 'Videógrafos móviles, usuarios del ecosistema Apple y compradores que buscan máxima retención de valor.',
    transformerEmbeddings: [0.88, 0.97, 0.95, 0.90, 0.98, 0.72, 0.96, 0.91],
    cnnVisualFeatures: [0.95, 0.94, 0.98, 0.91, 0.92, 0.95, 0.96, 0.93],
    lstmHiddenState: [0.01, 0.02, 0.00, 0.01]
  },
  {
    id: 'phone-003',
    name: 'Poco F6 Pro 5G',
    brand: 'Xiaomi / Poco',
    category: 'celulares',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    summary: 'El campeón absoluto en relación precio-rendimiento con procesador Snapdragon 8 Gen 2, pantalla Flow AMOLED WQHD+ a 120Hz y carga hiperrápida de 120W.',
    overallRating: 4.7,
    totalReviewsCount: 9800,
    qpiScore: 97,
    qualityScore: 89,
    valueGrade: 'A+',
    lstmTrend: 'HISTORIC_LOW',
    specs: {
      processor: 'Qualcomm Snapdragon 8 Gen 2 (4nm)',
      ram: '12 GB / 16 GB LPDDR5X',
      storage: '256 GB / 512 GB / 1 TB UFS 4.0',
      screen: '6.67" Flow AMOLED WQHD+ (3200x1440), 120Hz, 4000 nits peak, Dolby Vision',
      camera: '50 MP Light Fusion 800 (OIS) + 8 MP Ultra Gran Angular + 2 MP Macro',
      battery: '5000 mAh + Carga HyperCharge de 120W (0-100% en 19 min)',
      os: 'Xiaomi HyperOS basado en Android 14',
      buildMaterial: 'Marcos de aluminio pulido y trasera de cristal mate con diseño marmoleado'
    },
    listings: [
      {
        id: 'list-p6-1',
        merchantName: 'Amazon',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
        price: 469,
        originalPrice: 549,
        currency: 'USD',
        rating: 4.7,
        reviewCount: 5400,
        shipping: 'Envío Gratis Prime',
        stockStatus: 'In Stock',
        productUrl: 'https://www.amazon.com/dp/B0D33M99X8',
        verifiedMerchant: true
      },
      {
        id: 'list-p6-2',
        merchantName: 'MercadoLibre',
        merchantLogo: 'https://http2.mlstatic.com/frontend-assets/ui-navigation/5.22.13/mercadolibre/logo__large.png',
        price: 459,
        originalPrice: 530,
        currency: 'USD',
        rating: 4.8,
        reviewCount: 3100,
        shipping: 'Envío Gratis Full',
        stockStatus: 'In Stock',
        productUrl: 'https://www.mercadolibre.com/p/MLM1029384',
        verifiedMerchant: true
      },
      {
        id: 'list-p6-3',
        merchantName: 'eBay',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg',
        price: 439,
        originalPrice: 520,
        currency: 'USD',
        rating: 4.6,
        reviewCount: 1300,
        shipping: 'Envío Gratis',
        stockStatus: 'In Stock',
        productUrl: 'https://www.ebay.com/itm/281938291',
        verifiedMerchant: true
      }
    ],
    priceHistory: [
      { date: '2026-03', amazonPrice: 549, mercadoLibrePrice: 530, ebayPrice: 520 },
      { date: '2026-04', amazonPrice: 529, mercadoLibrePrice: 510, ebayPrice: 499 },
      { date: '2026-05', amazonPrice: 509, mercadoLibrePrice: 490, ebayPrice: 480 },
      { date: '2026-06', amazonPrice: 489, mercadoLibrePrice: 475, ebayPrice: 460 },
      { date: '2026-07', amazonPrice: 475, mercadoLibrePrice: 465, ebayPrice: 449 },
      { date: '2026-08', amazonPrice: 469, mercadoLibrePrice: 459, ebayPrice: 439 }
    ],
    aiPros: [
      'Puntaje QPI superlativo: potencia de gama alta a menos de la mitad de precio',
      'Increíble carga de 120W incluida en la caja',
      'Pantalla 2K ultra clara con 4000 nits de brillo máximo',
      'Disipación líquida IceLoop para sesiones prolongadas de videojuegos'
    ],
    aiCons: [
      'Cámara secundaria ultra gran angular de 8MP cumplidora pero modesta',
      'Sin protección oficial IP68 sumergible (cuenta con IP54)'
    ],
    targetAudience: 'Gamers móviles, estudiantes y usuarios que exigen máxima velocidad por dólar invertido.',
    transformerEmbeddings: [0.95, 0.81, 0.88, 0.94, 0.78, 0.96, 0.82, 0.89],
    cnnVisualFeatures: [0.84, 0.86, 0.82, 0.89, 0.80, 0.83, 0.85, 0.81],
    lstmHiddenState: [-0.12, -0.09, -0.22, -0.15]
  },
  {
    id: 'phone-004',
    name: 'Google Pixel 9 Pro 5G',
    brand: 'Google',
    category: 'celulares',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    summary: 'La mejor experiencia de fotografía computacional y software de IA puro con chip Tensor G4, pantalla Super Actua Display y 16GB de RAM dedicada para Gemini Nano en el dispositivo.',
    overallRating: 4.8,
    totalReviewsCount: 6700,
    qpiScore: 91,
    qualityScore: 96,
    valueGrade: 'A',
    lstmTrend: 'DIP_EXPECTED',
    specs: {
      processor: 'Google Tensor G4 (4nm) con coprocesador de seguridad Titan M2',
      ram: '16 GB LPDDR5X',
      storage: '128 GB / 256 GB / 512 GB UFS 3.1',
      screen: '6.3" Super Actua LTPO OLED, 1-120Hz, 3000 nits peak, Gorilla Glass Victus 2',
      camera: '50 MP (Principal OIS) + 48 MP Ultra Gran Angular con Macro + 48 MP Telefoto 5x',
      battery: '4700 mAh + Carga rápida 27W y carga inalámbrica Qi2',
      os: 'Android 15 puro (7 años de Feature Drops y actualizaciones de seguridad)',
      buildMaterial: 'Cristal mate posterior suave, marco de metal pulido IP68'
    },
    listings: [
      {
        id: 'list-px9-1',
        merchantName: 'Amazon',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
        price: 999,
        originalPrice: 999,
        currency: 'USD',
        rating: 4.8,
        reviewCount: 3800,
        shipping: 'Envío Gratis Prime',
        stockStatus: 'In Stock',
        productUrl: 'https://www.amazon.com/dp/B0D7MPR921',
        verifiedMerchant: true
      },
      {
        id: 'list-px9-2',
        merchantName: 'Best Buy',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Best_Buy_Logo.svg',
        price: 999,
        originalPrice: 999,
        currency: 'USD',
        rating: 4.7,
        reviewCount: 1500,
        shipping: 'Retiro en Tienda / Envío Gratis',
        stockStatus: 'In Stock',
        productUrl: 'https://www.bestbuy.com/site/6582910.p',
        verifiedMerchant: true
      },
      {
        id: 'list-px9-3',
        merchantName: 'B&H Photo',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/23/BH_Photo_Video_Logo.svg',
        price: 949,
        originalPrice: 999,
        currency: 'USD',
        rating: 4.9,
        reviewCount: 420,
        shipping: 'Envío Express Gratis',
        stockStatus: 'In Stock',
        productUrl: 'https://www.bhphotovideo.com/c/product/182910',
        verifiedMerchant: true
      }
    ],
    priceHistory: [
      { date: '2026-03', amazonPrice: 999, bestbuyPrice: 999, bhPrice: 999 },
      { date: '2026-04', amazonPrice: 999, bestbuyPrice: 999, bhPrice: 999 },
      { date: '2026-05', amazonPrice: 999, bestbuyPrice: 999, bhPrice: 979 },
      { date: '2026-06', amazonPrice: 999, bestbuyPrice: 999, bhPrice: 969 },
      { date: '2026-07', amazonPrice: 999, bestbuyPrice: 999, bhPrice: 959 },
      { date: '2026-08', amazonPrice: 999, bestbuyPrice: 999, bhPrice: 949 }
    ],
    aiPros: [
      'Procesamiento de imágenes y tonos de piel galardonado por DxOMark',
      'Integración nativa directa con Gemini Nano y herramientas exclusivas Pixel',
      'Tamaño compacto ergonómico de 6.3" con especificaciones Pro completas',
      '16 GB de memoria RAM para procesamiento IA ultra veloz'
    ],
    aiCons: [
      'Rendimiento bruto en juegos 3D intensivos inferior a Snapdragon 8 Gen 3',
      'Carga por cable de 27W moderada'
    ],
    targetAudience: 'Entusiastas de la fotografía, creadores que valoran el software Android puro y funciones de IA útiles.',
    transformerEmbeddings: [0.85, 0.92, 0.89, 0.91, 0.94, 0.81, 0.93, 0.88],
    cnnVisualFeatures: [0.89, 0.91, 0.93, 0.87, 0.90, 0.88, 0.92, 0.86],
    lstmHiddenState: [-0.02, -0.01, -0.05, -0.03]
  },

  // ==================== COMPUTADORAS / LAPTOPS & DESKTOPS ====================
  {
    id: 'comp-001',
    name: 'Apple MacBook Air 15" M3 (2024)',
    brand: 'Apple',
    category: 'computadoras',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    summary: 'La laptop ultraportátil perfecta. Chip M3 de Apple con CPU de 8 núcleos y GPU de 10 núcleos, pantalla Liquid Retina vibrante, diseño sin ventilador silencioso y 18 horas de batería.',
    overallRating: 4.9,
    totalReviewsCount: 11500,
    qpiScore: 95,
    qualityScore: 98,
    valueGrade: 'A+',
    lstmTrend: 'HISTORIC_LOW',
    specs: {
      processor: 'Apple M3 (8 núcleos CPU: 4 de rendimiento + 4 de eficiencia)',
      ram: '16 GB de memoria unificada de alta velocidad',
      storage: '512 GB SSD ultra rápido',
      gpu: 'GPU integrada de 10 núcleos con Ray Tracing por hardware',
      screen: '15.3" Liquid Retina IPS (2880x1864), 500 nits, gama cromática P3, True Tone',
      batteryLife: 'Hasta 18 horas de reproducción de video / navegación web',
      weight: '1.51 kg - Espesor de solo 11.5 mm',
      os: 'macOS Sequoia'
    },
    listings: [
      {
        id: 'list-mba-1',
        merchantName: 'Amazon',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
        price: 1299,
        originalPrice: 1499,
        currency: 'USD',
        rating: 4.9,
        reviewCount: 7800,
        shipping: 'Envío Gratis Prime',
        stockStatus: 'In Stock',
        productUrl: 'https://www.amazon.com/dp/B0CX23P5LM',
        verifiedMerchant: true
      },
      {
        id: 'list-mba-2',
        merchantName: 'B&H Photo',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/23/BH_Photo_Video_Logo.svg',
        price: 1279,
        originalPrice: 1499,
        currency: 'USD',
        rating: 4.9,
        reviewCount: 1200,
        shipping: 'Envío Express 2 Días Gratis',
        stockStatus: 'In Stock',
        productUrl: 'https://www.bhphotovideo.com/c/product/181298',
        verifiedMerchant: true
      },
      {
        id: 'list-mba-3',
        merchantName: 'Best Buy',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Best_Buy_Logo.svg',
        price: 1329,
        originalPrice: 1499,
        currency: 'USD',
        rating: 4.8,
        reviewCount: 2100,
        shipping: 'Retiro en Tienda Disponible',
        stockStatus: 'In Stock',
        productUrl: 'https://www.bestbuy.com/site/6534608.p',
        verifiedMerchant: true
      },
      {
        id: 'list-mba-4',
        merchantName: 'MercadoLibre',
        merchantLogo: 'https://http2.mlstatic.com/frontend-assets/ui-navigation/5.22.13/mercadolibre/logo__large.png',
        price: 1380,
        originalPrice: 1550,
        currency: 'USD',
        rating: 4.8,
        reviewCount: 400,
        shipping: 'Envío Gratis Full',
        stockStatus: 'In Stock',
        productUrl: 'https://www.mercadolibre.com/p/MLM8291039',
        verifiedMerchant: true
      }
    ],
    priceHistory: [
      { date: '2026-03', amazonPrice: 1499, bhPrice: 1499, bestbuyPrice: 1499 },
      { date: '2026-04', amazonPrice: 1449, bhPrice: 1429, bestbuyPrice: 1449 },
      { date: '2026-05', amazonPrice: 1399, bhPrice: 1379, bestbuyPrice: 1399 },
      { date: '2026-06', amazonPrice: 1349, bhPrice: 1329, bestbuyPrice: 1349 },
      { date: '2026-07', amazonPrice: 1319, bhPrice: 1299, bestbuyPrice: 1339 },
      { date: '2026-08', amazonPrice: 1299, bhPrice: 1279, bestbuyPrice: 1329 }
    ],
    aiPros: [
      'Batería excepcional con casi dos días de trabajo sin conectador',
      'Operación 100% silenciosa sin ventiladores ni polvo',
      'Construcción monocuerpo de aluminio unibody premium',
      'Sistema de 6 bocinas con audio espacial de nivel estudio'
    ],
    aiCons: [
      'Puertos limitados a 2x Thunderbolt / USB 4 y MagSafe 3',
      'Memoria RAM no expandible post-compra'
    ],
    targetAudience: 'Estudiantes universitarios, programadores, consultores y profesionales móviles que priorizan portabilidad y batería.',
    transformerEmbeddings: [0.91, 0.96, 0.94, 0.89, 0.97, 0.85, 0.95, 0.92],
    cnnVisualFeatures: [0.96, 0.95, 0.97, 0.93, 0.94, 0.96, 0.95, 0.94],
    lstmHiddenState: [-0.15, -0.11, -0.28, -0.19]
  },
  {
    id: 'comp-002',
    name: 'Lenovo Legion Pro 5i Gen 9',
    brand: 'Lenovo',
    category: 'computadoras',
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    summary: 'Bestia gamer y estación de trabajo. Procesador Intel Core i7-14700HX, tarjeta gráfica NVIDIA GeForce RTX 4070 8GB (TGP 140W), pantalla PureSight Gaming 240Hz y disipación Legion ColdFront 5.0.',
    overallRating: 4.8,
    totalReviewsCount: 5200,
    qpiScore: 93,
    qualityScore: 96,
    valueGrade: 'A+',
    lstmTrend: 'DIP_EXPECTED',
    specs: {
      processor: 'Intel Core i7-14700HX (20 núcleos: 8P + 12E, hasta 5.5 GHz)',
      ram: '32 GB DDR5 5600 MHz Dual-Channel (expandible a 64 GB)',
      storage: '1 TB M.2 PCIe 4.0 NVMe SSD (ranura M.2 libre)',
      gpu: 'NVIDIA GeForce RTX 4070 8GB GDDR6 (TGP 140W con MUX Switch & Advanced Optimus)',
      screen: '16" WQXGA (2560x1600) IPS 16:10, 240Hz, 500 nits, 100% sRGB, DisplayHDR 400',
      batteryLife: '4-6 horas (Batería de 80Wh con carga Super Rapid Charge 300W)',
      weight: '2.50 kg',
      os: 'Windows 11 Home'
    },
    listings: [
      {
        id: 'list-leg-1',
        merchantName: 'Newegg',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Newegg_logo.svg',
        price: 1479,
        originalPrice: 1799,
        currency: 'USD',
        rating: 4.8,
        reviewCount: 2300,
        shipping: 'Envío Gratis',
        stockStatus: 'In Stock',
        productUrl: 'https://www.newegg.com/p/N82E16834840',
        verifiedMerchant: true
      },
      {
        id: 'list-leg-2',
        merchantName: 'Amazon',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
        price: 1499,
        originalPrice: 1799,
        currency: 'USD',
        rating: 4.8,
        reviewCount: 1900,
        shipping: 'Envío Gratis Prime',
        stockStatus: 'In Stock',
        productUrl: 'https://www.amazon.com/dp/B0CX38J12',
        verifiedMerchant: true
      },
      {
        id: 'list-leg-3',
        merchantName: 'Best Buy',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Best_Buy_Logo.svg',
        price: 1549,
        originalPrice: 1799,
        currency: 'USD',
        rating: 4.7,
        reviewCount: 800,
        shipping: 'Retiro en Tienda',
        stockStatus: 'In Stock',
        productUrl: 'https://www.bestbuy.com/site/6573820.p',
        verifiedMerchant: true
      }
    ],
    priceHistory: [
      { date: '2026-03', neweggPrice: 1799, amazonPrice: 1799, bestbuyPrice: 1799 },
      { date: '2026-04', neweggPrice: 1699, amazonPrice: 1720, bestbuyPrice: 1749 },
      { date: '2026-05', neweggPrice: 1629, amazonPrice: 1649, bestbuyPrice: 1699 },
      { date: '2026-06', neweggPrice: 1549, amazonPrice: 1580, bestbuyPrice: 1620 },
      { date: '2026-07', neweggPrice: 1499, amazonPrice: 1520, bestbuyPrice: 1580 },
      { date: '2026-08', neweggPrice: 1479, amazonPrice: 1499, bestbuyPrice: 1549 }
    ],
    aiPros: [
      'Rendimiento térmico sobresaliente que mantiene altas frecuencias sostenidas',
      'Pantalla 16:10 QHD+ de 240Hz con excelente fidelidad cromática',
      'Teclado Legion TrueStrike con excelente recorrido táctil y pad numérico',
      '32 GB de memoria RAM DDR5 incluidos de fábrica'
    ],
    aiCons: [
      'Cargador de 300W grande y pesado',
      'Autonomía de batería modesta bajo cargas intensas'
    ],
    targetAudience: 'Gamers de títulos AAA, creadores 3D (Blender/Unreal Engine) y editores de video 4K.',
    transformerEmbeddings: [0.89, 0.95, 0.92, 0.96, 0.88, 0.91, 0.90, 0.87],
    cnnVisualFeatures: [0.88, 0.90, 0.89, 0.92, 0.87, 0.89, 0.91, 0.88],
    lstmHiddenState: [-0.08, -0.06, -0.14, -0.09]
  },
  {
    id: 'comp-003',
    name: 'ASUS ROG Zephyrus G14 (2024)',
    brand: 'ASUS',
    category: 'computadoras',
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    summary: 'La laptop de 14 pulgadas más codiciada. Chasis CNC de aluminio pulido con pantalla ROG Nebula OLED 3K a 120Hz, procesador AMD Ryzen 9 8945HS y gráfica RTX 4060.',
    overallRating: 4.8,
    totalReviewsCount: 3900,
    qpiScore: 92,
    qualityScore: 97,
    valueGrade: 'A',
    lstmTrend: 'STABLE',
    specs: {
      processor: 'AMD Ryzen 9 8945HS (8 núcleos / 16 hilos, Ryzen AI NPU integrada)',
      ram: '16 GB LPDDR5X 6400 MHz',
      storage: '1 TB PCIe 4.0 NVMe M.2 SSD',
      gpu: 'NVIDIA GeForce RTX 4060 8GB GDDR6 (TGP 90W con Dynamic Boost)',
      screen: '14.0" ROG Nebula OLED 3K (2880x1800) 16:10, 120Hz, 0.2ms, 100% DCI-P3, G-Sync',
      batteryLife: '8-10 horas (Batería de 73Wh con carga USB-C 100W PD)',
      weight: '1.50 kg - Chasis ultraligero CNC de 1.59 cm',
      os: 'Windows 11 Home'
    },
    listings: [
      {
        id: 'list-zeph-1',
        merchantName: 'Best Buy',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Best_Buy_Logo.svg',
        price: 1399,
        originalPrice: 1599,
        currency: 'USD',
        rating: 4.8,
        reviewCount: 2200,
        shipping: 'Retiro Gratis en Tienda / Envío Gratis',
        stockStatus: 'In Stock',
        productUrl: 'https://www.bestbuy.com/site/6570270.p',
        verifiedMerchant: true
      },
      {
        id: 'list-zeph-2',
        merchantName: 'Amazon',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
        price: 1429,
        originalPrice: 1599,
        currency: 'USD',
        rating: 4.7,
        reviewCount: 1100,
        shipping: 'Envío Gratis Prime',
        stockStatus: 'In Stock',
        productUrl: 'https://www.amazon.com/dp/B0D189M321',
        verifiedMerchant: true
      },
      {
        id: 'list-zeph-3',
        merchantName: 'Newegg',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Newegg_logo.svg',
        price: 1419,
        originalPrice: 1599,
        currency: 'USD',
        rating: 4.8,
        reviewCount: 600,
        shipping: 'Envío Gratis',
        stockStatus: 'In Stock',
        productUrl: 'https://www.newegg.com/p/N82E16834236400',
        verifiedMerchant: true
      }
    ],
    priceHistory: [
      { date: '2026-03', bestbuyPrice: 1599, amazonPrice: 1599, neweggPrice: 1599 },
      { date: '2026-04', bestbuyPrice: 1549, amazonPrice: 1570, neweggPrice: 1560 },
      { date: '2026-05', bestbuyPrice: 1499, amazonPrice: 1520, neweggPrice: 1510 },
      { date: '2026-06', bestbuyPrice: 1449, amazonPrice: 1470, neweggPrice: 1460 },
      { date: '2026-07', bestbuyPrice: 1399, amazonPrice: 1439, neweggPrice: 1429 },
      { date: '2026-08', bestbuyPrice: 1399, amazonPrice: 1429, neweggPrice: 1419 }
    ],
    aiPros: [
      'Pantalla OLED 3K deslumbrante con contraste infinito y tiempos de respuesta de 0.2ms',
      'Construcción de aluminio CNC al nivel del MacBook Pro en estética y solidez',
      'Excelente portabilidad (1.5 kg) sin sacrificar la GPU RTX dedicada',
      'Altavoces con woofer cuádruple de graves profundos'
    ],
    aiCons: [
      'Memoria RAM soldada en placa no ampliable',
      'Temperaturas de superficie tibias bajo carga pesada por su cuerpo delgado'
    ],
    targetAudience: 'Creadores multimedia, ingenieros y gamers que requieren máxima potencia en un formato ultraportátil.',
    transformerEmbeddings: [0.90, 0.94, 0.93, 0.92, 0.95, 0.88, 0.92, 0.90],
    cnnVisualFeatures: [0.94, 0.93, 0.95, 0.91, 0.92, 0.94, 0.93, 0.91],
    lstmHiddenState: [0.00, -0.02, -0.04, -0.01]
  },

  // ==================== ZAPATOS / FOOTWEAR & SNEAKERS ====================
  {
    id: 'shoe-001',
    name: 'Nike Pegasus 41',
    brand: 'Nike',
    category: 'zapatos',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    summary: 'El caballo de batalla legendario para corredores. Ahora actualizado con amortiguación de espuma ReactX ultra suave y eficiente con unidades Air Zoom dobles en talón y antepié.',
    overallRating: 4.8,
    totalReviewsCount: 8400,
    qpiScore: 96,
    qualityScore: 92,
    valueGrade: 'A+',
    lstmTrend: 'HISTORIC_LOW',
    specs: {
      material: 'Malla Engineered Mesh mejorada transpirable de ligereza estructural',
      cushioning: 'Espuma Nike ReactX (+13% más retorno de energía) + Doble unidad Air Zoom',
      soleType: 'Caucho con patrón gofre exclusivo de gran tracción y flexibilidad',
      drop: '10 mm (Talón 37 mm / Antepié 27 mm)',
      useCase: 'Running Diario, Maratón, Caminatas largas, Entrenamiento de resistencia',
      weightPerShoe: '282g (Talla 42 EUR / 9 US Masculino)',
      breathabilityScore: 9,
      durabilityRating: 9
    },
    listings: [
      {
        id: 'list-peg-1',
        merchantName: 'Nike Store',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Nike_Logo.svg',
        price: 110,
        originalPrice: 140,
        currency: 'USD',
        rating: 4.8,
        reviewCount: 4200,
        shipping: 'Envío Gratis para Miembros',
        stockStatus: 'In Stock',
        productUrl: 'https://www.nike.com/t/pegasus-41-road-running-shoes-FD2722',
        verifiedMerchant: true
      },
      {
        id: 'list-peg-2',
        merchantName: 'Amazon',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
        price: 115,
        originalPrice: 140,
        currency: 'USD',
        rating: 4.7,
        reviewCount: 2900,
        shipping: 'Envío Gratis Prime',
        stockStatus: 'In Stock',
        productUrl: 'https://www.amazon.com/dp/B0D23M19',
        verifiedMerchant: true
      },
      {
        id: 'list-peg-3',
        merchantName: 'Zalando',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Zalando_logo.svg',
        price: 112,
        originalPrice: 140,
        currency: 'USD',
        rating: 4.8,
        reviewCount: 850,
        shipping: 'Envío Gratis y Devolución 30 Días',
        stockStatus: 'In Stock',
        productUrl: 'https://www.zalando.es/nike-performance-pegasus-41',
        verifiedMerchant: true
      },
      {
        id: 'list-peg-4',
        merchantName: 'MercadoLibre',
        merchantLogo: 'https://http2.mlstatic.com/frontend-assets/ui-navigation/5.22.13/mercadolibre/logo__large.png',
        price: 122,
        originalPrice: 145,
        currency: 'USD',
        rating: 4.9,
        reviewCount: 450,
        shipping: 'Envío Gratis Full',
        stockStatus: 'In Stock',
        productUrl: 'https://www.mercadolibre.com/p/MLM9283019',
        verifiedMerchant: true
      }
    ],
    priceHistory: [
      { date: '2026-03', nikePrice: 140, amazonPrice: 140, zalandoPrice: 140 },
      { date: '2026-04', nikePrice: 135, amazonPrice: 138, zalandoPrice: 135 },
      { date: '2026-05', nikePrice: 128, amazonPrice: 130, zalandoPrice: 125 },
      { date: '2026-06', nikePrice: 120, amazonPrice: 122, zalandoPrice: 118 },
      { date: '2026-07', nikePrice: 115, amazonPrice: 118, zalandoPrice: 115 },
      { date: '2026-08', nikePrice: 110, amazonPrice: 115, zalandoPrice: 112 }
    ],
    aiPros: [
      'Espuma ReactX suave que amortigua el impacto protegiendo rodillas y tobillos',
      'Durabilidad comprobada superior a los 750 km de uso continuo',
      'Ajuste de soporte envolvente en la banda del mediopié',
      'Precio sumamente competitivo con alto retorno de valor'
    ],
    aiCons: [
      'Horma un poco estrecha para corredores con pies muy anchos (se recomienda versión Wide)'
    ],
    targetAudience: 'Corredores de todos los niveles, atletas de gimnasio y personas que trabajan de pie todo el día.',
    transformerEmbeddings: [0.93, 0.88, 0.90, 0.95, 0.82, 0.94, 0.89, 0.91],
    cnnVisualFeatures: [0.92, 0.91, 0.88, 0.93, 0.89, 0.90, 0.92, 0.88],
    lstmHiddenState: [-0.18, -0.14, -0.25, -0.20]
  },
  {
    id: 'shoe-002',
    name: 'Asics Gel-Nimbus 26',
    brand: 'Asics',
    category: 'zapatos',
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    summary: 'La máxima expresión en comodidad y amortiguación tipo nube. Equipado con tecnología PureGEL interna, espuma FF BLAST PLUS ECO ultra mullida y suela de tracción HYBRID ASICSGRIP.',
    overallRating: 4.9,
    totalReviewsCount: 6100,
    qpiScore: 94,
    qualityScore: 97,
    valueGrade: 'A+',
    lstmTrend: 'DIP_EXPECTED',
    specs: {
      material: 'Tejido Knit suave de alta elasticidad que abraza el pie dinámicamente',
      cushioning: 'Espuma FF BLAST PLUS ECO (24% bio-basada) + Inserto PureGEL invisible',
      soleType: 'Suela combinada ASICSGRIP y caucho AHARPLUS de máxima tracción',
      drop: '8 mm (Talón 41.5 mm / Antepié 33.5 mm)',
      useCase: 'Carreras de Larga Distancia, Maratón, Recuperación y Confort Absoluto',
      weightPerShoe: '304g (Talla 42 EUR)',
      breathabilityScore: 9,
      durabilityRating: 10
    },
    listings: [
      {
        id: 'list-nim-1',
        merchantName: 'Amazon',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
        price: 139,
        originalPrice: 160,
        currency: 'USD',
        rating: 4.9,
        reviewCount: 3800,
        shipping: 'Envío Gratis Prime',
        stockStatus: 'In Stock',
        productUrl: 'https://www.amazon.com/dp/B0CX12N91',
        verifiedMerchant: true
      },
      {
        id: 'list-nim-2',
        merchantName: 'Zalando',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Zalando_logo.svg',
        price: 142,
        originalPrice: 160,
        currency: 'USD',
        rating: 4.8,
        reviewCount: 1400,
        shipping: 'Envío y Devolución Gratis',
        stockStatus: 'In Stock',
        productUrl: 'https://www.zalando.es/asics-gel-nimbus-26',
        verifiedMerchant: true
      },
      {
        id: 'list-nim-3',
        merchantName: 'eBay',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg',
        price: 135,
        originalPrice: 160,
        currency: 'USD',
        rating: 4.7,
        reviewCount: 900,
        shipping: 'Envío Gratis',
        stockStatus: 'Low Stock',
        productUrl: 'https://www.ebay.com/itm/382910382',
        verifiedMerchant: true
      }
    ],
    priceHistory: [
      { date: '2026-03', amazonPrice: 160, zalandoPrice: 160, ebayPrice: 155 },
      { date: '2026-04', amazonPrice: 155, zalandoPrice: 158, ebayPrice: 150 },
      { date: '2026-05', amazonPrice: 149, zalandoPrice: 150, ebayPrice: 145 },
      { date: '2026-06', amazonPrice: 145, zalandoPrice: 148, ebayPrice: 140 },
      { date: '2026-07', amazonPrice: 140, zalandoPrice: 144, ebayPrice: 138 },
      { date: '2026-08', amazonPrice: 139, zalandoPrice: 142, ebayPrice: 135 }
    ],
    aiPros: [
      'Nivel de amortiguación y protección articular incomparable para largos recorridos',
      'Upper Knit transpirable sin costuras molestas ni puntos de presión',
      'Suela con tracción excelente en asfalto seco y mojado',
      'Plantilla OrthoLite X-55 con propiedades antimicrobianas'
    ],
    aiCons: [
      'Suela de perfil alto que puede sentirse menos ágil para ritmos ultra rápidos de sprint'
    ],
    targetAudience: 'Corredores neutros o supinadores que buscan prevenir lesiones e impactos en articulaciones.',
    transformerEmbeddings: [0.89, 0.93, 0.91, 0.94, 0.85, 0.92, 0.90, 0.93],
    cnnVisualFeatures: [0.91, 0.90, 0.92, 0.89, 0.91, 0.93, 0.90, 0.92],
    lstmHiddenState: [-0.09, -0.07, -0.12, -0.08]
  },
  {
    id: 'shoe-003',
    name: 'Adidas Ultraboost Light',
    brand: 'Adidas',
    category: 'zapatos',
    imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
    summary: 'El clásico de estilo urbano y performance redefinido. Un 30% más ligero que el Ultraboost tradicional gracias al nuevo material Light BOOST con respuesta de energía superior.',
    overallRating: 4.7,
    totalReviewsCount: 9200,
    qpiScore: 91,
    qualityScore: 94,
    valueGrade: 'A',
    lstmTrend: 'STABLE',
    specs: {
      material: 'Primeknit+ confeccionado con al menos un 50% de hilo reciclado Parley Ocean Plastic',
      cushioning: 'Light BOOST de última generación + Sistema LEP (Linear Energy Push) en la suela',
      soleType: 'Caucho Continental Better Rubber para agarre excepcional',
      drop: '10 mm (Talón 30 mm / Antepié 20 mm)',
      useCase: 'Estilo de Vida Casual, Gym, Caminatas y Running Ligero',
      weightPerShoe: '299g (Talla 42 EUR)',
      breathabilityScore: 8,
      durabilityRating: 9
    },
    listings: [
      {
        id: 'list-ub-1',
        merchantName: 'Amazon',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
        price: 129,
        originalPrice: 190,
        currency: 'USD',
        rating: 4.7,
        reviewCount: 5100,
        shipping: 'Envío Gratis Prime',
        stockStatus: 'In Stock',
        productUrl: 'https://www.amazon.com/dp/B0BV38M12',
        verifiedMerchant: true
      },
      {
        id: 'list-ub-2',
        merchantName: 'Zalando',
        merchantLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Zalando_logo.svg',
        price: 135,
        originalPrice: 190,
        currency: 'USD',
        rating: 4.8,
        reviewCount: 2200,
        shipping: 'Envío Gratis',
        stockStatus: 'In Stock',
        productUrl: 'https://www.zalando.es/adidas-performance-ultraboost-light',
        verifiedMerchant: true
      },
      {
        id: 'list-ub-3',
        merchantName: 'MercadoLibre',
        merchantLogo: 'https://http2.mlstatic.com/frontend-assets/ui-navigation/5.22.13/mercadolibre/logo__large.png',
        price: 139,
        originalPrice: 195,
        currency: 'USD',
        rating: 4.8,
        reviewCount: 1900,
        shipping: 'Envío Gratis Full',
        stockStatus: 'In Stock',
        productUrl: 'https://www.mercadolibre.com/p/MLM1029381',
        verifiedMerchant: true
      }
    ],
    priceHistory: [
      { date: '2026-03', amazonPrice: 160, zalandoPrice: 170, mercadoLibrePrice: 175 },
      { date: '2026-04', amazonPrice: 150, zalandoPrice: 160, mercadoLibrePrice: 165 },
      { date: '2026-05', amazonPrice: 142, zalandoPrice: 150, mercadoLibrePrice: 155 },
      { date: '2026-06', amazonPrice: 135, zalandoPrice: 142, mercadoLibrePrice: 148 },
      { date: '2026-07', amazonPrice: 130, zalandoPrice: 138, mercadoLibrePrice: 142 },
      { date: '2026-08', amazonPrice: 129, zalandoPrice: 135, mercadoLibrePrice: 139 }
    ],
    aiPros: [
      'Estética icónica moderna ideal tanto para vestir streetwear como para entrenar',
      'Suela de goma Continental con agarre imbatible en mojado',
      'Construcción ecológica con materiales reciclados del océano',
      'Gran descuento acumulado respecto a su precio original de lanzamiento'
    ],
    aiCons: [
      'Sensación de calcetín muy ceñida en empeine para pies anchos'
    ],
    targetAudience: 'Amantes del streetwear, personas activas y fanáticos de la silueta icónica Ultraboost.',
    transformerEmbeddings: [0.87, 0.90, 0.88, 0.91, 0.84, 0.90, 0.86, 0.88],
    cnnVisualFeatures: [0.95, 0.94, 0.93, 0.92, 0.90, 0.92, 0.94, 0.91],
    lstmHiddenState: [-0.05, -0.04, -0.08, -0.06]
  }
];
