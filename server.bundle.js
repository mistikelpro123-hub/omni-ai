var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// server/index.ts
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// server/apiRouter.ts
import { Router } from "express";
import { GoogleGenAI } from "@google/genai";

// src/data/productsDatabase.ts
var INITIAL_PRODUCTS_DATASET = [
  // ==================== CELULARES / SMARTPHONES ====================
  {
    id: "phone-001",
    name: "Samsung Galaxy S24 Ultra 5G",
    brand: "Samsung",
    category: "celulares",
    imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
    summary: "El flagship definitivo con procesador Snapdragon 8 Gen 3 for Galaxy, pantalla Dynamic AMOLED 2X brillante y c\xE1mara de 200 MP con Zoom \xD3ptico 5x y funciones Galaxy AI.",
    overallRating: 4.8,
    totalReviewsCount: 14250,
    qpiScore: 94,
    qualityScore: 98,
    valueGrade: "A+",
    lstmTrend: "DIP_EXPECTED",
    specs: {
      processor: "Qualcomm Snapdragon 8 Gen 3 for Galaxy (4nm)",
      ram: "12 GB LPDDR5X",
      storage: "256 GB / 512 GB / 1 TB UFS 4.0",
      screen: '6.8" Dynamic AMOLED 2X, QHD+, 120Hz LTPO, 2600 nits, Gorilla Armor',
      camera: "200 MP (Principal OIS) + 50 MP (Periscopio 5x) + 10 MP (Telefoto 3x) + 12 MP (Ultra Gran Angular)",
      battery: "5000 mAh + Carga r\xE1pida 45W e Inal\xE1mbrica 15W",
      os: "Android 14 con One UI 6.1 (7 a\xF1os de actualizaciones)",
      buildMaterial: "Marco de Titanio Grado 2, Cristal Gorilla Armor antirreflejos"
    },
    listings: [
      {
        id: "list-s24-1",
        merchantName: "Amazon",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        price: 1149,
        originalPrice: 1299,
        currency: "USD",
        rating: 4.8,
        reviewCount: 8900,
        shipping: "Env\xEDo Gratis Prime",
        stockStatus: "In Stock",
        productUrl: "https://www.amazon.com/dp/B0CS3XW3X5",
        verifiedMerchant: true
      },
      {
        id: "list-s24-2",
        merchantName: "MercadoLibre",
        merchantLogo: "https://http2.mlstatic.com/frontend-assets/ui-navigation/5.22.13/mercadolibre/logo__large.png",
        price: 1189,
        originalPrice: 1350,
        currency: "USD",
        rating: 4.9,
        reviewCount: 3400,
        shipping: "Env\xEDo Gratis Full",
        stockStatus: "In Stock",
        productUrl: "https://www.mercadolibre.com/p/MLM29183921",
        verifiedMerchant: true
      },
      {
        id: "list-s24-3",
        merchantName: "Best Buy",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Best_Buy_Logo.svg",
        price: 1199,
        originalPrice: 1299,
        currency: "USD",
        rating: 4.7,
        reviewCount: 1950,
        shipping: "Retiro en Tienda Gratis / Env\xEDo Express",
        stockStatus: "In Stock",
        productUrl: "https://www.bestbuy.com/site/6570278.p",
        verifiedMerchant: true
      },
      {
        id: "list-s24-4",
        merchantName: "eBay",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
        price: 1089,
        originalPrice: 1299,
        currency: "USD",
        rating: 4.6,
        reviewCount: 820,
        shipping: "$15.00 Env\xEDo Internacional",
        stockStatus: "Low Stock",
        productUrl: "https://www.ebay.com/itm/395182931",
        verifiedMerchant: true
      }
    ],
    priceHistory: [
      { date: "2026-03", amazonPrice: 1299, bestbuyPrice: 1299, mercadoLibrePrice: 1350 },
      { date: "2026-04", amazonPrice: 1249, bestbuyPrice: 1279, mercadoLibrePrice: 1320 },
      { date: "2026-05", amazonPrice: 1219, bestbuyPrice: 1249, mercadoLibrePrice: 1280 },
      { date: "2026-06", amazonPrice: 1180, bestbuyPrice: 1210, mercadoLibrePrice: 1240 },
      { date: "2026-07", amazonPrice: 1159, bestbuyPrice: 1199, mercadoLibrePrice: 1200 },
      { date: "2026-08", amazonPrice: 1149, bestbuyPrice: 1199, mercadoLibrePrice: 1189 }
    ],
    aiPros: [
      "Procesador Snapdragon 8 Gen 3 con rendimiento tope de gama",
      "El cristal Gorilla Armor reduce dr\xE1sticamente los reflejos",
      "7 a\xF1os de actualizaciones del sistema operativo aseguradas",
      "S-Pen integrado con nuevas funciones inteligentes de edici\xF3n"
    ],
    aiCons: [
      "Cuerpo voluminoso y pesado (232g)",
      "Velocidad de carga de 45W inferior a competidores asi\xE1ticos"
    ],
    targetAudience: "Usuarios exigentes, creadores de contenido, profesionales de negocios y amantes de la fotograf\xEDa m\xF3vil.",
    transformerEmbeddings: [0.82, 0.94, 0.91, 0.88, 0.95, 0.79, 0.92, 0.86],
    cnnVisualFeatures: [0.91, 0.89, 0.96, 0.85, 0.88, 0.9, 0.93, 0.87],
    lstmHiddenState: [-0.04, 0.12, -0.18, 0.09]
  },
  {
    id: "phone-002",
    name: "iPhone 16 Pro Max",
    brand: "Apple",
    category: "celulares",
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80",
    summary: "El tel\xE9fono insignia de Apple con chip A18 Pro de 3nm, bot\xF3n Control de C\xE1mara h\xE1pico, grabaci\xF3n de video 4K a 120 fps Dolby Vision y acabado en titanio con bordes reducidos.",
    overallRating: 4.9,
    totalReviewsCount: 18900,
    qpiScore: 92,
    qualityScore: 99,
    valueGrade: "A",
    lstmTrend: "STABLE",
    specs: {
      processor: "Apple A18 Pro (3nm de 2\xAA generaci\xF3n)",
      ram: "8 GB LPDDR5X",
      storage: "256 GB / 512 GB / 1 TB NVMe",
      screen: '6.9" Super Retina XDR OLED, ProMotion 120Hz, Always-On, 2000 nits peak',
      camera: "48 MP Fusion OIS + 48 MP Ultra Gran Angular + 12 MP Telefoto 5x Tetraprisma",
      battery: "4685 mAh + Carga MagSafe 25W / Carga r\xE1pida por USB-C",
      os: "iOS 18 con integraci\xF3n Apple Intelligence",
      buildMaterial: "Chasis de Titanio Grado 5 con acabado de microesferas y Ceramic Shield"
    },
    listings: [
      {
        id: "list-i16-1",
        merchantName: "Amazon",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        price: 1199,
        originalPrice: 1199,
        currency: "USD",
        rating: 4.9,
        reviewCount: 11200,
        shipping: "Env\xEDo Gratis Prime",
        stockStatus: "In Stock",
        productUrl: "https://www.amazon.com/dp/B0DGJ9M88L",
        verifiedMerchant: true
      },
      {
        id: "list-i16-2",
        merchantName: "Best Buy",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Best_Buy_Logo.svg",
        price: 1199,
        originalPrice: 1199,
        currency: "USD",
        rating: 4.8,
        reviewCount: 4300,
        shipping: "Retiro Gratis en Tienda Hoy",
        stockStatus: "In Stock",
        productUrl: "https://www.bestbuy.com/site/6591200.p",
        verifiedMerchant: true
      },
      {
        id: "list-i16-3",
        merchantName: "MercadoLibre",
        merchantLogo: "https://http2.mlstatic.com/frontend-assets/ui-navigation/5.22.13/mercadolibre/logo__large.png",
        price: 1249,
        originalPrice: 1299,
        currency: "USD",
        rating: 4.9,
        reviewCount: 2800,
        shipping: "Env\xEDo Gratis Full",
        stockStatus: "In Stock",
        productUrl: "https://www.mercadolibre.com/p/MLM39182930",
        verifiedMerchant: true
      },
      {
        id: "list-i16-4",
        merchantName: "B&H Photo",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/2/23/BH_Photo_Video_Logo.svg",
        price: 1199,
        originalPrice: 1199,
        currency: "USD",
        rating: 4.9,
        reviewCount: 600,
        shipping: "Env\xEDo R\xE1pido 2 D\xEDas Gratis",
        stockStatus: "In Stock",
        productUrl: "https://www.bhphotovideo.com/c/product/185201",
        verifiedMerchant: true
      }
    ],
    priceHistory: [
      { date: "2026-03", amazonPrice: 1199, bestbuyPrice: 1199, mercadoLibrePrice: 1299 },
      { date: "2026-04", amazonPrice: 1199, bestbuyPrice: 1199, mercadoLibrePrice: 1289 },
      { date: "2026-05", amazonPrice: 1199, bestbuyPrice: 1199, mercadoLibrePrice: 1275 },
      { date: "2026-06", amazonPrice: 1199, bestbuyPrice: 1199, mercadoLibrePrice: 1260 },
      { date: "2026-07", amazonPrice: 1199, bestbuyPrice: 1199, mercadoLibrePrice: 1250 },
      { date: "2026-08", amazonPrice: 1199, bestbuyPrice: 1199, mercadoLibrePrice: 1249 }
    ],
    aiPros: [
      "Chip A18 Pro con la GPU m\xF3vil m\xE1s potente y eficiente energ\xE9ticamente",
      "Grabaci\xF3n de video profesional 4K 120fps ProRes",
      "Autonom\xEDa de bater\xEDa l\xEDder en la industria de telefon\xEDa premium",
      "Construcci\xF3n impecable en titanio con marcialidad de bordes ultradelgados"
    ],
    aiCons: [
      "Precio elevado sin descuentos marcados",
      "Velocidad de carga por cable sigue limitada a ~30W"
    ],
    targetAudience: "Vide\xF3grafos m\xF3viles, usuarios del ecosistema Apple y compradores que buscan m\xE1xima retenci\xF3n de valor.",
    transformerEmbeddings: [0.88, 0.97, 0.95, 0.9, 0.98, 0.72, 0.96, 0.91],
    cnnVisualFeatures: [0.95, 0.94, 0.98, 0.91, 0.92, 0.95, 0.96, 0.93],
    lstmHiddenState: [0.01, 0.02, 0, 0.01]
  },
  {
    id: "phone-003",
    name: "Poco F6 Pro 5G",
    brand: "Xiaomi / Poco",
    category: "celulares",
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    summary: "El campe\xF3n absoluto en relaci\xF3n precio-rendimiento con procesador Snapdragon 8 Gen 2, pantalla Flow AMOLED WQHD+ a 120Hz y carga hiperr\xE1pida de 120W.",
    overallRating: 4.7,
    totalReviewsCount: 9800,
    qpiScore: 97,
    qualityScore: 89,
    valueGrade: "A+",
    lstmTrend: "HISTORIC_LOW",
    specs: {
      processor: "Qualcomm Snapdragon 8 Gen 2 (4nm)",
      ram: "12 GB / 16 GB LPDDR5X",
      storage: "256 GB / 512 GB / 1 TB UFS 4.0",
      screen: '6.67" Flow AMOLED WQHD+ (3200x1440), 120Hz, 4000 nits peak, Dolby Vision',
      camera: "50 MP Light Fusion 800 (OIS) + 8 MP Ultra Gran Angular + 2 MP Macro",
      battery: "5000 mAh + Carga HyperCharge de 120W (0-100% en 19 min)",
      os: "Xiaomi HyperOS basado en Android 14",
      buildMaterial: "Marcos de aluminio pulido y trasera de cristal mate con dise\xF1o marmoleado"
    },
    listings: [
      {
        id: "list-p6-1",
        merchantName: "Amazon",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        price: 469,
        originalPrice: 549,
        currency: "USD",
        rating: 4.7,
        reviewCount: 5400,
        shipping: "Env\xEDo Gratis Prime",
        stockStatus: "In Stock",
        productUrl: "https://www.amazon.com/dp/B0D33M99X8",
        verifiedMerchant: true
      },
      {
        id: "list-p6-2",
        merchantName: "MercadoLibre",
        merchantLogo: "https://http2.mlstatic.com/frontend-assets/ui-navigation/5.22.13/mercadolibre/logo__large.png",
        price: 459,
        originalPrice: 530,
        currency: "USD",
        rating: 4.8,
        reviewCount: 3100,
        shipping: "Env\xEDo Gratis Full",
        stockStatus: "In Stock",
        productUrl: "https://www.mercadolibre.com/p/MLM1029384",
        verifiedMerchant: true
      },
      {
        id: "list-p6-3",
        merchantName: "eBay",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
        price: 439,
        originalPrice: 520,
        currency: "USD",
        rating: 4.6,
        reviewCount: 1300,
        shipping: "Env\xEDo Gratis",
        stockStatus: "In Stock",
        productUrl: "https://www.ebay.com/itm/281938291",
        verifiedMerchant: true
      }
    ],
    priceHistory: [
      { date: "2026-03", amazonPrice: 549, mercadoLibrePrice: 530, ebayPrice: 520 },
      { date: "2026-04", amazonPrice: 529, mercadoLibrePrice: 510, ebayPrice: 499 },
      { date: "2026-05", amazonPrice: 509, mercadoLibrePrice: 490, ebayPrice: 480 },
      { date: "2026-06", amazonPrice: 489, mercadoLibrePrice: 475, ebayPrice: 460 },
      { date: "2026-07", amazonPrice: 475, mercadoLibrePrice: 465, ebayPrice: 449 },
      { date: "2026-08", amazonPrice: 469, mercadoLibrePrice: 459, ebayPrice: 439 }
    ],
    aiPros: [
      "Puntaje QPI superlativo: potencia de gama alta a menos de la mitad de precio",
      "Incre\xEDble carga de 120W incluida en la caja",
      "Pantalla 2K ultra clara con 4000 nits de brillo m\xE1ximo",
      "Disipaci\xF3n l\xEDquida IceLoop para sesiones prolongadas de videojuegos"
    ],
    aiCons: [
      "C\xE1mara secundaria ultra gran angular de 8MP cumplidora pero modesta",
      "Sin protecci\xF3n oficial IP68 sumergible (cuenta con IP54)"
    ],
    targetAudience: "Gamers m\xF3viles, estudiantes y usuarios que exigen m\xE1xima velocidad por d\xF3lar invertido.",
    transformerEmbeddings: [0.95, 0.81, 0.88, 0.94, 0.78, 0.96, 0.82, 0.89],
    cnnVisualFeatures: [0.84, 0.86, 0.82, 0.89, 0.8, 0.83, 0.85, 0.81],
    lstmHiddenState: [-0.12, -0.09, -0.22, -0.15]
  },
  {
    id: "phone-004",
    name: "Google Pixel 9 Pro 5G",
    brand: "Google",
    category: "celulares",
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    summary: "La mejor experiencia de fotograf\xEDa computacional y software de IA puro con chip Tensor G4, pantalla Super Actua Display y 16GB de RAM dedicada para Gemini Nano en el dispositivo.",
    overallRating: 4.8,
    totalReviewsCount: 6700,
    qpiScore: 91,
    qualityScore: 96,
    valueGrade: "A",
    lstmTrend: "DIP_EXPECTED",
    specs: {
      processor: "Google Tensor G4 (4nm) con coprocesador de seguridad Titan M2",
      ram: "16 GB LPDDR5X",
      storage: "128 GB / 256 GB / 512 GB UFS 3.1",
      screen: '6.3" Super Actua LTPO OLED, 1-120Hz, 3000 nits peak, Gorilla Glass Victus 2',
      camera: "50 MP (Principal OIS) + 48 MP Ultra Gran Angular con Macro + 48 MP Telefoto 5x",
      battery: "4700 mAh + Carga r\xE1pida 27W y carga inal\xE1mbrica Qi2",
      os: "Android 15 puro (7 a\xF1os de Feature Drops y actualizaciones de seguridad)",
      buildMaterial: "Cristal mate posterior suave, marco de metal pulido IP68"
    },
    listings: [
      {
        id: "list-px9-1",
        merchantName: "Amazon",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        price: 999,
        originalPrice: 999,
        currency: "USD",
        rating: 4.8,
        reviewCount: 3800,
        shipping: "Env\xEDo Gratis Prime",
        stockStatus: "In Stock",
        productUrl: "https://www.amazon.com/dp/B0D7MPR921",
        verifiedMerchant: true
      },
      {
        id: "list-px9-2",
        merchantName: "Best Buy",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Best_Buy_Logo.svg",
        price: 999,
        originalPrice: 999,
        currency: "USD",
        rating: 4.7,
        reviewCount: 1500,
        shipping: "Retiro en Tienda / Env\xEDo Gratis",
        stockStatus: "In Stock",
        productUrl: "https://www.bestbuy.com/site/6582910.p",
        verifiedMerchant: true
      },
      {
        id: "list-px9-3",
        merchantName: "B&H Photo",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/2/23/BH_Photo_Video_Logo.svg",
        price: 949,
        originalPrice: 999,
        currency: "USD",
        rating: 4.9,
        reviewCount: 420,
        shipping: "Env\xEDo Express Gratis",
        stockStatus: "In Stock",
        productUrl: "https://www.bhphotovideo.com/c/product/182910",
        verifiedMerchant: true
      }
    ],
    priceHistory: [
      { date: "2026-03", amazonPrice: 999, bestbuyPrice: 999, bhPrice: 999 },
      { date: "2026-04", amazonPrice: 999, bestbuyPrice: 999, bhPrice: 999 },
      { date: "2026-05", amazonPrice: 999, bestbuyPrice: 999, bhPrice: 979 },
      { date: "2026-06", amazonPrice: 999, bestbuyPrice: 999, bhPrice: 969 },
      { date: "2026-07", amazonPrice: 999, bestbuyPrice: 999, bhPrice: 959 },
      { date: "2026-08", amazonPrice: 999, bestbuyPrice: 999, bhPrice: 949 }
    ],
    aiPros: [
      "Procesamiento de im\xE1genes y tonos de piel galardonado por DxOMark",
      "Integraci\xF3n nativa directa con Gemini Nano y herramientas exclusivas Pixel",
      'Tama\xF1o compacto ergon\xF3mico de 6.3" con especificaciones Pro completas',
      "16 GB de memoria RAM para procesamiento IA ultra veloz"
    ],
    aiCons: [
      "Rendimiento bruto en juegos 3D intensivos inferior a Snapdragon 8 Gen 3",
      "Carga por cable de 27W moderada"
    ],
    targetAudience: "Entusiastas de la fotograf\xEDa, creadores que valoran el software Android puro y funciones de IA \xFAtiles.",
    transformerEmbeddings: [0.85, 0.92, 0.89, 0.91, 0.94, 0.81, 0.93, 0.88],
    cnnVisualFeatures: [0.89, 0.91, 0.93, 0.87, 0.9, 0.88, 0.92, 0.86],
    lstmHiddenState: [-0.02, -0.01, -0.05, -0.03]
  },
  // ==================== COMPUTADORAS / LAPTOPS & DESKTOPS ====================
  {
    id: "comp-001",
    name: 'Apple MacBook Air 15" M3 (2024)',
    brand: "Apple",
    category: "computadoras",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    summary: "La laptop ultraport\xE1til perfecta. Chip M3 de Apple con CPU de 8 n\xFAcleos y GPU de 10 n\xFAcleos, pantalla Liquid Retina vibrante, dise\xF1o sin ventilador silencioso y 18 horas de bater\xEDa.",
    overallRating: 4.9,
    totalReviewsCount: 11500,
    qpiScore: 95,
    qualityScore: 98,
    valueGrade: "A+",
    lstmTrend: "HISTORIC_LOW",
    specs: {
      processor: "Apple M3 (8 n\xFAcleos CPU: 4 de rendimiento + 4 de eficiencia)",
      ram: "16 GB de memoria unificada de alta velocidad",
      storage: "512 GB SSD ultra r\xE1pido",
      gpu: "GPU integrada de 10 n\xFAcleos con Ray Tracing por hardware",
      screen: '15.3" Liquid Retina IPS (2880x1864), 500 nits, gama crom\xE1tica P3, True Tone',
      batteryLife: "Hasta 18 horas de reproducci\xF3n de video / navegaci\xF3n web",
      weight: "1.51 kg - Espesor de solo 11.5 mm",
      os: "macOS Sequoia"
    },
    listings: [
      {
        id: "list-mba-1",
        merchantName: "Amazon",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        price: 1299,
        originalPrice: 1499,
        currency: "USD",
        rating: 4.9,
        reviewCount: 7800,
        shipping: "Env\xEDo Gratis Prime",
        stockStatus: "In Stock",
        productUrl: "https://www.amazon.com/dp/B0CX23P5LM",
        verifiedMerchant: true
      },
      {
        id: "list-mba-2",
        merchantName: "B&H Photo",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/2/23/BH_Photo_Video_Logo.svg",
        price: 1279,
        originalPrice: 1499,
        currency: "USD",
        rating: 4.9,
        reviewCount: 1200,
        shipping: "Env\xEDo Express 2 D\xEDas Gratis",
        stockStatus: "In Stock",
        productUrl: "https://www.bhphotovideo.com/c/product/181298",
        verifiedMerchant: true
      },
      {
        id: "list-mba-3",
        merchantName: "Best Buy",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Best_Buy_Logo.svg",
        price: 1329,
        originalPrice: 1499,
        currency: "USD",
        rating: 4.8,
        reviewCount: 2100,
        shipping: "Retiro en Tienda Disponible",
        stockStatus: "In Stock",
        productUrl: "https://www.bestbuy.com/site/6534608.p",
        verifiedMerchant: true
      },
      {
        id: "list-mba-4",
        merchantName: "MercadoLibre",
        merchantLogo: "https://http2.mlstatic.com/frontend-assets/ui-navigation/5.22.13/mercadolibre/logo__large.png",
        price: 1380,
        originalPrice: 1550,
        currency: "USD",
        rating: 4.8,
        reviewCount: 400,
        shipping: "Env\xEDo Gratis Full",
        stockStatus: "In Stock",
        productUrl: "https://www.mercadolibre.com/p/MLM8291039",
        verifiedMerchant: true
      }
    ],
    priceHistory: [
      { date: "2026-03", amazonPrice: 1499, bhPrice: 1499, bestbuyPrice: 1499 },
      { date: "2026-04", amazonPrice: 1449, bhPrice: 1429, bestbuyPrice: 1449 },
      { date: "2026-05", amazonPrice: 1399, bhPrice: 1379, bestbuyPrice: 1399 },
      { date: "2026-06", amazonPrice: 1349, bhPrice: 1329, bestbuyPrice: 1349 },
      { date: "2026-07", amazonPrice: 1319, bhPrice: 1299, bestbuyPrice: 1339 },
      { date: "2026-08", amazonPrice: 1299, bhPrice: 1279, bestbuyPrice: 1329 }
    ],
    aiPros: [
      "Bater\xEDa excepcional con casi dos d\xEDas de trabajo sin conectador",
      "Operaci\xF3n 100% silenciosa sin ventiladores ni polvo",
      "Construcci\xF3n monocuerpo de aluminio unibody premium",
      "Sistema de 6 bocinas con audio espacial de nivel estudio"
    ],
    aiCons: [
      "Puertos limitados a 2x Thunderbolt / USB 4 y MagSafe 3",
      "Memoria RAM no expandible post-compra"
    ],
    targetAudience: "Estudiantes universitarios, programadores, consultores y profesionales m\xF3viles que priorizan portabilidad y bater\xEDa.",
    transformerEmbeddings: [0.91, 0.96, 0.94, 0.89, 0.97, 0.85, 0.95, 0.92],
    cnnVisualFeatures: [0.96, 0.95, 0.97, 0.93, 0.94, 0.96, 0.95, 0.94],
    lstmHiddenState: [-0.15, -0.11, -0.28, -0.19]
  },
  {
    id: "comp-002",
    name: "Lenovo Legion Pro 5i Gen 9",
    brand: "Lenovo",
    category: "computadoras",
    imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    summary: "Bestia gamer y estaci\xF3n de trabajo. Procesador Intel Core i7-14700HX, tarjeta gr\xE1fica NVIDIA GeForce RTX 4070 8GB (TGP 140W), pantalla PureSight Gaming 240Hz y disipaci\xF3n Legion ColdFront 5.0.",
    overallRating: 4.8,
    totalReviewsCount: 5200,
    qpiScore: 93,
    qualityScore: 96,
    valueGrade: "A+",
    lstmTrend: "DIP_EXPECTED",
    specs: {
      processor: "Intel Core i7-14700HX (20 n\xFAcleos: 8P + 12E, hasta 5.5 GHz)",
      ram: "32 GB DDR5 5600 MHz Dual-Channel (expandible a 64 GB)",
      storage: "1 TB M.2 PCIe 4.0 NVMe SSD (ranura M.2 libre)",
      gpu: "NVIDIA GeForce RTX 4070 8GB GDDR6 (TGP 140W con MUX Switch & Advanced Optimus)",
      screen: '16" WQXGA (2560x1600) IPS 16:10, 240Hz, 500 nits, 100% sRGB, DisplayHDR 400',
      batteryLife: "4-6 horas (Bater\xEDa de 80Wh con carga Super Rapid Charge 300W)",
      weight: "2.50 kg",
      os: "Windows 11 Home"
    },
    listings: [
      {
        id: "list-leg-1",
        merchantName: "Newegg",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/2/23/Newegg_logo.svg",
        price: 1479,
        originalPrice: 1799,
        currency: "USD",
        rating: 4.8,
        reviewCount: 2300,
        shipping: "Env\xEDo Gratis",
        stockStatus: "In Stock",
        productUrl: "https://www.newegg.com/p/N82E16834840",
        verifiedMerchant: true
      },
      {
        id: "list-leg-2",
        merchantName: "Amazon",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        price: 1499,
        originalPrice: 1799,
        currency: "USD",
        rating: 4.8,
        reviewCount: 1900,
        shipping: "Env\xEDo Gratis Prime",
        stockStatus: "In Stock",
        productUrl: "https://www.amazon.com/dp/B0CX38J12",
        verifiedMerchant: true
      },
      {
        id: "list-leg-3",
        merchantName: "Best Buy",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Best_Buy_Logo.svg",
        price: 1549,
        originalPrice: 1799,
        currency: "USD",
        rating: 4.7,
        reviewCount: 800,
        shipping: "Retiro en Tienda",
        stockStatus: "In Stock",
        productUrl: "https://www.bestbuy.com/site/6573820.p",
        verifiedMerchant: true
      }
    ],
    priceHistory: [
      { date: "2026-03", neweggPrice: 1799, amazonPrice: 1799, bestbuyPrice: 1799 },
      { date: "2026-04", neweggPrice: 1699, amazonPrice: 1720, bestbuyPrice: 1749 },
      { date: "2026-05", neweggPrice: 1629, amazonPrice: 1649, bestbuyPrice: 1699 },
      { date: "2026-06", neweggPrice: 1549, amazonPrice: 1580, bestbuyPrice: 1620 },
      { date: "2026-07", neweggPrice: 1499, amazonPrice: 1520, bestbuyPrice: 1580 },
      { date: "2026-08", neweggPrice: 1479, amazonPrice: 1499, bestbuyPrice: 1549 }
    ],
    aiPros: [
      "Rendimiento t\xE9rmico sobresaliente que mantiene altas frecuencias sostenidas",
      "Pantalla 16:10 QHD+ de 240Hz con excelente fidelidad crom\xE1tica",
      "Teclado Legion TrueStrike con excelente recorrido t\xE1ctil y pad num\xE9rico",
      "32 GB de memoria RAM DDR5 incluidos de f\xE1brica"
    ],
    aiCons: [
      "Cargador de 300W grande y pesado",
      "Autonom\xEDa de bater\xEDa modesta bajo cargas intensas"
    ],
    targetAudience: "Gamers de t\xEDtulos AAA, creadores 3D (Blender/Unreal Engine) y editores de video 4K.",
    transformerEmbeddings: [0.89, 0.95, 0.92, 0.96, 0.88, 0.91, 0.9, 0.87],
    cnnVisualFeatures: [0.88, 0.9, 0.89, 0.92, 0.87, 0.89, 0.91, 0.88],
    lstmHiddenState: [-0.08, -0.06, -0.14, -0.09]
  },
  {
    id: "comp-003",
    name: "ASUS ROG Zephyrus G14 (2024)",
    brand: "ASUS",
    category: "computadoras",
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    summary: "La laptop de 14 pulgadas m\xE1s codiciada. Chasis CNC de aluminio pulido con pantalla ROG Nebula OLED 3K a 120Hz, procesador AMD Ryzen 9 8945HS y gr\xE1fica RTX 4060.",
    overallRating: 4.8,
    totalReviewsCount: 3900,
    qpiScore: 92,
    qualityScore: 97,
    valueGrade: "A",
    lstmTrend: "STABLE",
    specs: {
      processor: "AMD Ryzen 9 8945HS (8 n\xFAcleos / 16 hilos, Ryzen AI NPU integrada)",
      ram: "16 GB LPDDR5X 6400 MHz",
      storage: "1 TB PCIe 4.0 NVMe M.2 SSD",
      gpu: "NVIDIA GeForce RTX 4060 8GB GDDR6 (TGP 90W con Dynamic Boost)",
      screen: '14.0" ROG Nebula OLED 3K (2880x1800) 16:10, 120Hz, 0.2ms, 100% DCI-P3, G-Sync',
      batteryLife: "8-10 horas (Bater\xEDa de 73Wh con carga USB-C 100W PD)",
      weight: "1.50 kg - Chasis ultraligero CNC de 1.59 cm",
      os: "Windows 11 Home"
    },
    listings: [
      {
        id: "list-zeph-1",
        merchantName: "Best Buy",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Best_Buy_Logo.svg",
        price: 1399,
        originalPrice: 1599,
        currency: "USD",
        rating: 4.8,
        reviewCount: 2200,
        shipping: "Retiro Gratis en Tienda / Env\xEDo Gratis",
        stockStatus: "In Stock",
        productUrl: "https://www.bestbuy.com/site/6570270.p",
        verifiedMerchant: true
      },
      {
        id: "list-zeph-2",
        merchantName: "Amazon",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        price: 1429,
        originalPrice: 1599,
        currency: "USD",
        rating: 4.7,
        reviewCount: 1100,
        shipping: "Env\xEDo Gratis Prime",
        stockStatus: "In Stock",
        productUrl: "https://www.amazon.com/dp/B0D189M321",
        verifiedMerchant: true
      },
      {
        id: "list-zeph-3",
        merchantName: "Newegg",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/2/23/Newegg_logo.svg",
        price: 1419,
        originalPrice: 1599,
        currency: "USD",
        rating: 4.8,
        reviewCount: 600,
        shipping: "Env\xEDo Gratis",
        stockStatus: "In Stock",
        productUrl: "https://www.newegg.com/p/N82E16834236400",
        verifiedMerchant: true
      }
    ],
    priceHistory: [
      { date: "2026-03", bestbuyPrice: 1599, amazonPrice: 1599, neweggPrice: 1599 },
      { date: "2026-04", bestbuyPrice: 1549, amazonPrice: 1570, neweggPrice: 1560 },
      { date: "2026-05", bestbuyPrice: 1499, amazonPrice: 1520, neweggPrice: 1510 },
      { date: "2026-06", bestbuyPrice: 1449, amazonPrice: 1470, neweggPrice: 1460 },
      { date: "2026-07", bestbuyPrice: 1399, amazonPrice: 1439, neweggPrice: 1429 },
      { date: "2026-08", bestbuyPrice: 1399, amazonPrice: 1429, neweggPrice: 1419 }
    ],
    aiPros: [
      "Pantalla OLED 3K deslumbrante con contraste infinito y tiempos de respuesta de 0.2ms",
      "Construcci\xF3n de aluminio CNC al nivel del MacBook Pro en est\xE9tica y solidez",
      "Excelente portabilidad (1.5 kg) sin sacrificar la GPU RTX dedicada",
      "Altavoces con woofer cu\xE1druple de graves profundos"
    ],
    aiCons: [
      "Memoria RAM soldada en placa no ampliable",
      "Temperaturas de superficie tibias bajo carga pesada por su cuerpo delgado"
    ],
    targetAudience: "Creadores multimedia, ingenieros y gamers que requieren m\xE1xima potencia en un formato ultraport\xE1til.",
    transformerEmbeddings: [0.9, 0.94, 0.93, 0.92, 0.95, 0.88, 0.92, 0.9],
    cnnVisualFeatures: [0.94, 0.93, 0.95, 0.91, 0.92, 0.94, 0.93, 0.91],
    lstmHiddenState: [0, -0.02, -0.04, -0.01]
  },
  // ==================== ZAPATOS / FOOTWEAR & SNEAKERS ====================
  {
    id: "shoe-001",
    name: "Nike Pegasus 41",
    brand: "Nike",
    category: "zapatos",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    summary: "El caballo de batalla legendario para corredores. Ahora actualizado con amortiguaci\xF3n de espuma ReactX ultra suave y eficiente con unidades Air Zoom dobles en tal\xF3n y antepi\xE9.",
    overallRating: 4.8,
    totalReviewsCount: 8400,
    qpiScore: 96,
    qualityScore: 92,
    valueGrade: "A+",
    lstmTrend: "HISTORIC_LOW",
    specs: {
      material: "Malla Engineered Mesh mejorada transpirable de ligereza estructural",
      cushioning: "Espuma Nike ReactX (+13% m\xE1s retorno de energ\xEDa) + Doble unidad Air Zoom",
      soleType: "Caucho con patr\xF3n gofre exclusivo de gran tracci\xF3n y flexibilidad",
      drop: "10 mm (Tal\xF3n 37 mm / Antepi\xE9 27 mm)",
      useCase: "Running Diario, Marat\xF3n, Caminatas largas, Entrenamiento de resistencia",
      weightPerShoe: "282g (Talla 42 EUR / 9 US Masculino)",
      breathabilityScore: 9,
      durabilityRating: 9
    },
    listings: [
      {
        id: "list-peg-1",
        merchantName: "Nike Store",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Nike_Logo.svg",
        price: 110,
        originalPrice: 140,
        currency: "USD",
        rating: 4.8,
        reviewCount: 4200,
        shipping: "Env\xEDo Gratis para Miembros",
        stockStatus: "In Stock",
        productUrl: "https://www.nike.com/t/pegasus-41-road-running-shoes-FD2722",
        verifiedMerchant: true
      },
      {
        id: "list-peg-2",
        merchantName: "Amazon",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        price: 115,
        originalPrice: 140,
        currency: "USD",
        rating: 4.7,
        reviewCount: 2900,
        shipping: "Env\xEDo Gratis Prime",
        stockStatus: "In Stock",
        productUrl: "https://www.amazon.com/dp/B0D23M19",
        verifiedMerchant: true
      },
      {
        id: "list-peg-3",
        merchantName: "Zalando",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/5/52/Zalando_logo.svg",
        price: 112,
        originalPrice: 140,
        currency: "USD",
        rating: 4.8,
        reviewCount: 850,
        shipping: "Env\xEDo Gratis y Devoluci\xF3n 30 D\xEDas",
        stockStatus: "In Stock",
        productUrl: "https://www.zalando.es/nike-performance-pegasus-41",
        verifiedMerchant: true
      },
      {
        id: "list-peg-4",
        merchantName: "MercadoLibre",
        merchantLogo: "https://http2.mlstatic.com/frontend-assets/ui-navigation/5.22.13/mercadolibre/logo__large.png",
        price: 122,
        originalPrice: 145,
        currency: "USD",
        rating: 4.9,
        reviewCount: 450,
        shipping: "Env\xEDo Gratis Full",
        stockStatus: "In Stock",
        productUrl: "https://www.mercadolibre.com/p/MLM9283019",
        verifiedMerchant: true
      }
    ],
    priceHistory: [
      { date: "2026-03", nikePrice: 140, amazonPrice: 140, zalandoPrice: 140 },
      { date: "2026-04", nikePrice: 135, amazonPrice: 138, zalandoPrice: 135 },
      { date: "2026-05", nikePrice: 128, amazonPrice: 130, zalandoPrice: 125 },
      { date: "2026-06", nikePrice: 120, amazonPrice: 122, zalandoPrice: 118 },
      { date: "2026-07", nikePrice: 115, amazonPrice: 118, zalandoPrice: 115 },
      { date: "2026-08", nikePrice: 110, amazonPrice: 115, zalandoPrice: 112 }
    ],
    aiPros: [
      "Espuma ReactX suave que amortigua el impacto protegiendo rodillas y tobillos",
      "Durabilidad comprobada superior a los 750 km de uso continuo",
      "Ajuste de soporte envolvente en la banda del mediopi\xE9",
      "Precio sumamente competitivo con alto retorno de valor"
    ],
    aiCons: [
      "Horma un poco estrecha para corredores con pies muy anchos (se recomienda versi\xF3n Wide)"
    ],
    targetAudience: "Corredores de todos los niveles, atletas de gimnasio y personas que trabajan de pie todo el d\xEDa.",
    transformerEmbeddings: [0.93, 0.88, 0.9, 0.95, 0.82, 0.94, 0.89, 0.91],
    cnnVisualFeatures: [0.92, 0.91, 0.88, 0.93, 0.89, 0.9, 0.92, 0.88],
    lstmHiddenState: [-0.18, -0.14, -0.25, -0.2]
  },
  {
    id: "shoe-002",
    name: "Asics Gel-Nimbus 26",
    brand: "Asics",
    category: "zapatos",
    imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    summary: "La m\xE1xima expresi\xF3n en comodidad y amortiguaci\xF3n tipo nube. Equipado con tecnolog\xEDa PureGEL interna, espuma FF BLAST PLUS ECO ultra mullida y suela de tracci\xF3n HYBRID ASICSGRIP.",
    overallRating: 4.9,
    totalReviewsCount: 6100,
    qpiScore: 94,
    qualityScore: 97,
    valueGrade: "A+",
    lstmTrend: "DIP_EXPECTED",
    specs: {
      material: "Tejido Knit suave de alta elasticidad que abraza el pie din\xE1micamente",
      cushioning: "Espuma FF BLAST PLUS ECO (24% bio-basada) + Inserto PureGEL invisible",
      soleType: "Suela combinada ASICSGRIP y caucho AHARPLUS de m\xE1xima tracci\xF3n",
      drop: "8 mm (Tal\xF3n 41.5 mm / Antepi\xE9 33.5 mm)",
      useCase: "Carreras de Larga Distancia, Marat\xF3n, Recuperaci\xF3n y Confort Absoluto",
      weightPerShoe: "304g (Talla 42 EUR)",
      breathabilityScore: 9,
      durabilityRating: 10
    },
    listings: [
      {
        id: "list-nim-1",
        merchantName: "Amazon",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        price: 139,
        originalPrice: 160,
        currency: "USD",
        rating: 4.9,
        reviewCount: 3800,
        shipping: "Env\xEDo Gratis Prime",
        stockStatus: "In Stock",
        productUrl: "https://www.amazon.com/dp/B0CX12N91",
        verifiedMerchant: true
      },
      {
        id: "list-nim-2",
        merchantName: "Zalando",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/5/52/Zalando_logo.svg",
        price: 142,
        originalPrice: 160,
        currency: "USD",
        rating: 4.8,
        reviewCount: 1400,
        shipping: "Env\xEDo y Devoluci\xF3n Gratis",
        stockStatus: "In Stock",
        productUrl: "https://www.zalando.es/asics-gel-nimbus-26",
        verifiedMerchant: true
      },
      {
        id: "list-nim-3",
        merchantName: "eBay",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
        price: 135,
        originalPrice: 160,
        currency: "USD",
        rating: 4.7,
        reviewCount: 900,
        shipping: "Env\xEDo Gratis",
        stockStatus: "Low Stock",
        productUrl: "https://www.ebay.com/itm/382910382",
        verifiedMerchant: true
      }
    ],
    priceHistory: [
      { date: "2026-03", amazonPrice: 160, zalandoPrice: 160, ebayPrice: 155 },
      { date: "2026-04", amazonPrice: 155, zalandoPrice: 158, ebayPrice: 150 },
      { date: "2026-05", amazonPrice: 149, zalandoPrice: 150, ebayPrice: 145 },
      { date: "2026-06", amazonPrice: 145, zalandoPrice: 148, ebayPrice: 140 },
      { date: "2026-07", amazonPrice: 140, zalandoPrice: 144, ebayPrice: 138 },
      { date: "2026-08", amazonPrice: 139, zalandoPrice: 142, ebayPrice: 135 }
    ],
    aiPros: [
      "Nivel de amortiguaci\xF3n y protecci\xF3n articular incomparable para largos recorridos",
      "Upper Knit transpirable sin costuras molestas ni puntos de presi\xF3n",
      "Suela con tracci\xF3n excelente en asfalto seco y mojado",
      "Plantilla OrthoLite X-55 con propiedades antimicrobianas"
    ],
    aiCons: [
      "Suela de perfil alto que puede sentirse menos \xE1gil para ritmos ultra r\xE1pidos de sprint"
    ],
    targetAudience: "Corredores neutros o supinadores que buscan prevenir lesiones e impactos en articulaciones.",
    transformerEmbeddings: [0.89, 0.93, 0.91, 0.94, 0.85, 0.92, 0.9, 0.93],
    cnnVisualFeatures: [0.91, 0.9, 0.92, 0.89, 0.91, 0.93, 0.9, 0.92],
    lstmHiddenState: [-0.09, -0.07, -0.12, -0.08]
  },
  {
    id: "shoe-003",
    name: "Adidas Ultraboost Light",
    brand: "Adidas",
    category: "zapatos",
    imageUrl: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
    summary: "El cl\xE1sico de estilo urbano y performance redefinido. Un 30% m\xE1s ligero que el Ultraboost tradicional gracias al nuevo material Light BOOST con respuesta de energ\xEDa superior.",
    overallRating: 4.7,
    totalReviewsCount: 9200,
    qpiScore: 91,
    qualityScore: 94,
    valueGrade: "A",
    lstmTrend: "STABLE",
    specs: {
      material: "Primeknit+ confeccionado con al menos un 50% de hilo reciclado Parley Ocean Plastic",
      cushioning: "Light BOOST de \xFAltima generaci\xF3n + Sistema LEP (Linear Energy Push) en la suela",
      soleType: "Caucho Continental Better Rubber para agarre excepcional",
      drop: "10 mm (Tal\xF3n 30 mm / Antepi\xE9 20 mm)",
      useCase: "Estilo de Vida Casual, Gym, Caminatas y Running Ligero",
      weightPerShoe: "299g (Talla 42 EUR)",
      breathabilityScore: 8,
      durabilityRating: 9
    },
    listings: [
      {
        id: "list-ub-1",
        merchantName: "Amazon",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        price: 129,
        originalPrice: 190,
        currency: "USD",
        rating: 4.7,
        reviewCount: 5100,
        shipping: "Env\xEDo Gratis Prime",
        stockStatus: "In Stock",
        productUrl: "https://www.amazon.com/dp/B0BV38M12",
        verifiedMerchant: true
      },
      {
        id: "list-ub-2",
        merchantName: "Zalando",
        merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/5/52/Zalando_logo.svg",
        price: 135,
        originalPrice: 190,
        currency: "USD",
        rating: 4.8,
        reviewCount: 2200,
        shipping: "Env\xEDo Gratis",
        stockStatus: "In Stock",
        productUrl: "https://www.zalando.es/adidas-performance-ultraboost-light",
        verifiedMerchant: true
      },
      {
        id: "list-ub-3",
        merchantName: "MercadoLibre",
        merchantLogo: "https://http2.mlstatic.com/frontend-assets/ui-navigation/5.22.13/mercadolibre/logo__large.png",
        price: 139,
        originalPrice: 195,
        currency: "USD",
        rating: 4.8,
        reviewCount: 1900,
        shipping: "Env\xEDo Gratis Full",
        stockStatus: "In Stock",
        productUrl: "https://www.mercadolibre.com/p/MLM1029381",
        verifiedMerchant: true
      }
    ],
    priceHistory: [
      { date: "2026-03", amazonPrice: 160, zalandoPrice: 170, mercadoLibrePrice: 175 },
      { date: "2026-04", amazonPrice: 150, zalandoPrice: 160, mercadoLibrePrice: 165 },
      { date: "2026-05", amazonPrice: 142, zalandoPrice: 150, mercadoLibrePrice: 155 },
      { date: "2026-06", amazonPrice: 135, zalandoPrice: 142, mercadoLibrePrice: 148 },
      { date: "2026-07", amazonPrice: 130, zalandoPrice: 138, mercadoLibrePrice: 142 },
      { date: "2026-08", amazonPrice: 129, zalandoPrice: 135, mercadoLibrePrice: 139 }
    ],
    aiPros: [
      "Est\xE9tica ic\xF3nica moderna ideal tanto para vestir streetwear como para entrenar",
      "Suela de goma Continental con agarre imbatible en mojado",
      "Construcci\xF3n ecol\xF3gica con materiales reciclados del oc\xE9ano",
      "Gran descuento acumulado respecto a su precio original de lanzamiento"
    ],
    aiCons: [
      "Sensaci\xF3n de calcet\xEDn muy ce\xF1ida en empeine para pies anchos"
    ],
    targetAudience: "Amantes del streetwear, personas activas y fan\xE1ticos de la silueta ic\xF3nica Ultraboost.",
    transformerEmbeddings: [0.87, 0.9, 0.88, 0.91, 0.84, 0.9, 0.86, 0.88],
    cnnVisualFeatures: [0.95, 0.94, 0.93, 0.92, 0.9, 0.92, 0.94, 0.91],
    lstmHiddenState: [-0.05, -0.04, -0.08, -0.06]
  }
];

// src/services/mlScoringEngine.ts
var DEFAULT_ML_WEIGHTS = {
  priceWeight: 35,
  ratingWeight: 25,
  qualityWeight: 20,
  specsWeight: 10,
  merchantTrustWeight: 10
};
function calculateProductQPI(product, weights = DEFAULT_ML_WEIGHTS) {
  const minPrice = Math.min(...product.listings.map((l) => l.price));
  let categoryBaselineMaxPrice = 1500;
  if (product.category === "celulares") categoryBaselineMaxPrice = 1400;
  else if (product.category === "computadoras") categoryBaselineMaxPrice = 2200;
  else if (product.category === "zapatos") categoryBaselineMaxPrice = 220;
  const priceRatio = Math.min(1, minPrice / categoryBaselineMaxPrice);
  const priceScore = Math.max(10, Math.round(100 * (1 - Math.pow(priceRatio, 0.75))));
  const ratingScore = Math.round(product.overallRating / 5 * 100);
  const qualityScoreNormalized = product.qualityScore;
  const verifiedListingsCount = product.listings.filter((l) => l.verifiedMerchant).length;
  const merchantTrustScore = Math.min(100, Math.round(verifiedListingsCount / product.listings.length * 80 + 20));
  const totalWeightSum = weights.priceWeight + weights.ratingWeight + weights.qualityWeight + weights.specsWeight + weights.merchantTrustWeight;
  const wP = weights.priceWeight / totalWeightSum;
  const wR = weights.ratingWeight / totalWeightSum;
  const wQ = weights.qualityWeight / totalWeightSum;
  const wS = weights.specsWeight / totalWeightSum;
  const wT = weights.merchantTrustWeight / totalWeightSum;
  const rawQpi = priceScore * wP + ratingScore * wR + qualityScoreNormalized * wQ + qualityScoreNormalized * wS + merchantTrustScore * wT;
  const qpiScore = Math.min(99, Math.max(30, Math.round(rawQpi)));
  let grade = "B";
  if (qpiScore >= 93) grade = "A+";
  else if (qpiScore >= 88) grade = "A";
  else if (qpiScore >= 82) grade = "B+";
  else if (qpiScore >= 75) grade = "B";
  else grade = "C";
  return {
    qpiScore,
    priceScore,
    ratingScore,
    qualityScoreNormalized,
    merchantTrustScore,
    grade
  };
}
function predictLSTMPriceTrend(priceHistory) {
  if (!priceHistory || priceHistory.length === 0) {
    return { trend: "STABLE", confidence: 0.85, predicted30DayPrice: 100, discountPercentage: 0 };
  }
  const monthlyAverages = priceHistory.map((ph) => {
    const prices = Object.entries(ph).filter(([k, v]) => k.includes("Price") && typeof v === "number").map(([_, v]) => v);
    if (prices.length === 0) return 0;
    return prices.reduce((a, b) => a + b, 0) / prices.length;
  }).filter((p) => p > 0);
  if (monthlyAverages.length < 2) {
    return { trend: "STABLE", confidence: 0.85, predicted30DayPrice: monthlyAverages[0] || 100, discountPercentage: 0 };
  }
  const initialPrice = monthlyAverages[0];
  const currentPrice = monthlyAverages[monthlyAverages.length - 1];
  const priceChangeRatio = (currentPrice - initialPrice) / initialPrice;
  const recentDiff = monthlyAverages[monthlyAverages.length - 1] - monthlyAverages[monthlyAverages.length - 2];
  let predicted30DayPrice = Math.round(currentPrice + recentDiff * 0.7);
  let trend = "STABLE";
  if (priceChangeRatio <= -0.18) {
    trend = "HISTORIC_LOW";
  } else if (recentDiff < -10) {
    trend = "DIP_EXPECTED";
  } else if (recentDiff > 10) {
    trend = "RISING";
  } else {
    trend = "STABLE";
  }
  const discountPercentage = Math.round(Math.max(0, (initialPrice - currentPrice) / initialPrice * 100));
  return {
    trend,
    confidence: 0.92,
    predicted30DayPrice,
    discountPercentage
  };
}

// src/services/geneticAlgorithmEngine.ts
var DEFAULT_GENETIC_PARAMS = {
  populationSize: 60,
  generations: 40,
  mutationRate: 0.12,
  crossoverRate: 0.85,
  elitismCount: 3,
  selectionMethod: "tournament"
};
var DEFAULT_PURCHASE_CRITERIA = {
  category: "all",
  maxBudget: 850,
  priorityProfile: "balanced",
  minRating: 4,
  preferVerifiedOnly: true,
  preferFreeShipping: true,
  urgencyDays: 7
};
function createRandomGenes(criteria) {
  let basePrice = 0.5;
  let baseSpecs = 0.5;
  let baseTrust = 0.5;
  if (criteria.priorityProfile === "budget_hunter") {
    basePrice = 0.8;
    baseSpecs = 0.3;
  } else if (criteria.priorityProfile === "power") {
    basePrice = 0.3;
    baseSpecs = 0.85;
  } else if (criteria.priorityProfile === "trust_speed") {
    baseTrust = 0.85;
  }
  const jitter = () => Math.max(0.05, Math.min(0.95, (Math.random() - 0.5) * 0.4));
  return {
    priceSensitivity: Math.max(0.05, Math.min(0.95, basePrice + jitter())),
    specsImportance: Math.max(0.05, Math.min(0.95, baseSpecs + jitter())),
    qualityFocus: Math.max(0.05, Math.min(0.95, 0.5 + jitter())),
    merchantTrustWeight: Math.max(0.05, Math.min(0.95, baseTrust + jitter())),
    timingTrendWeight: Math.max(0.05, Math.min(0.95, 0.4 + jitter())),
    shippingSpeedWeight: Math.max(0.05, Math.min(0.95, criteria.preferFreeShipping ? 0.7 : 0.4 + jitter()))
  };
}
function getEligibleProducts(products, criteria) {
  let list = products;
  if (criteria.category !== "all") {
    list = list.filter((p) => p.category === criteria.category);
  }
  if (list.length === 0) {
    list = products;
  }
  return list;
}
function initializePopulation(params, criteria, products) {
  const eligibleProducts = getEligibleProducts(products, criteria);
  const population = [];
  for (let i = 0; i < params.populationSize; i++) {
    const randomProduct = eligibleProducts[Math.floor(Math.random() * eligibleProducts.length)];
    const randomListing = randomProduct.listings[Math.floor(Math.random() * randomProduct.listings.length)];
    const genes = createRandomGenes(criteria);
    const chromosome = {
      id: `chrom-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 5)}`,
      productId: randomProduct.id,
      listingId: randomListing.id,
      genes,
      fitness: 0,
      rawMetrics: {
        budgetEfficiency: 0,
        specsScore: 0,
        trustScore: 0,
        timingScore: 0,
        penalty: 0
      }
    };
    population.push(chromosome);
  }
  return population;
}
function evaluateFitness(chromosome, criteria, productMap) {
  const product = productMap.get(chromosome.productId);
  if (!product) {
    return {
      ...chromosome,
      fitness: 1,
      rawMetrics: { budgetEfficiency: 0, specsScore: 0, trustScore: 0, timingScore: 0, penalty: 100 }
    };
  }
  const listing = product.listings.find((l) => l.id === chromosome.listingId) || product.listings[0];
  const price = listing.price;
  let budgetEfficiency = 0;
  let penalty = 0;
  if (price <= criteria.maxBudget) {
    const savingsRatio = (criteria.maxBudget - price) / criteria.maxBudget;
    budgetEfficiency = Math.min(100, Math.round(55 + 45 * Math.pow(savingsRatio, 0.65)));
  } else {
    const overspendRatio = (price - criteria.maxBudget) / criteria.maxBudget;
    penalty += Math.min(80, Math.round(overspendRatio * 180));
    budgetEfficiency = Math.max(0, 50 - penalty);
  }
  let specsScore = product.qualityScore;
  if (criteria.priorityProfile === "power") {
    specsScore = Math.min(100, Math.round(specsScore * 1.15));
  } else if (criteria.priorityProfile === "budget_hunter") {
    specsScore = Math.round(specsScore * 0.9);
  }
  let trustScore = listing.rating / 5 * 50;
  if (listing.verifiedMerchant) trustScore += 25;
  if (listing.shipping.toLowerCase().includes("gratis") || listing.shipping.toLowerCase().includes("free")) {
    trustScore += 15;
  }
  if (criteria.preferVerifiedOnly && !listing.verifiedMerchant) {
    penalty += 20;
  }
  if (criteria.minRating && product.overallRating < criteria.minRating) {
    penalty += (criteria.minRating - product.overallRating) * 15;
  }
  trustScore = Math.min(100, Math.max(10, Math.round(trustScore)));
  let timingScore = 50;
  if (product.lstmTrend === "HISTORIC_LOW") timingScore = 95;
  else if (product.lstmTrend === "DIP_EXPECTED") timingScore = 80;
  else if (product.lstmTrend === "STABLE") timingScore = 55;
  else if (product.lstmTrend === "RISING") timingScore = 30;
  const genes = chromosome.genes;
  const totalGeneWeight = genes.priceSensitivity + genes.specsImportance + genes.qualityFocus + genes.merchantTrustWeight + genes.timingTrendWeight + genes.shippingSpeedWeight;
  const wP = genes.priceSensitivity / totalGeneWeight;
  const wS = genes.specsImportance / totalGeneWeight;
  const wQ = genes.qualityFocus / totalGeneWeight;
  const wT = genes.merchantTrustWeight / totalGeneWeight;
  const wTime = genes.timingTrendWeight / totalGeneWeight;
  const wShip = genes.shippingSpeedWeight / totalGeneWeight;
  let baseCombinedFitness = budgetEfficiency * wP + specsScore * wS + (product.qpiScore || 75) * wQ + trustScore * (wT + wShip * 0.5) + timingScore * wTime;
  const finalFitness = Math.max(5, Math.min(99.8, Number((baseCombinedFitness - penalty * 0.4).toFixed(2))));
  return {
    ...chromosome,
    fitness: finalFitness,
    rawMetrics: {
      budgetEfficiency,
      specsScore,
      trustScore,
      timingScore,
      penalty
    }
  };
}
function selectParentTournament(population, k = 3) {
  let best = population[Math.floor(Math.random() * population.length)];
  for (let i = 1; i < k; i++) {
    const candidate = population[Math.floor(Math.random() * population.length)];
    if (candidate.fitness > best.fitness) {
      best = candidate;
    }
  }
  return best;
}
function selectParentRoulette(population) {
  const minFitness = Math.min(...population.map((c) => c.fitness));
  const shift = minFitness < 0 ? Math.abs(minFitness) + 1 : 1;
  const totalFitness = population.reduce((acc, c) => acc + (c.fitness + shift), 0);
  let threshold = Math.random() * totalFitness;
  for (const c of population) {
    threshold -= c.fitness + shift;
    if (threshold <= 0) return c;
  }
  return population[0];
}
function crossover(parentA, parentB, crossoverRate) {
  if (Math.random() > crossoverRate) {
    return {
      childA: { ...parentA, id: `chrom-${Date.now()}-A` },
      childB: { ...parentB, id: `chrom-${Date.now()}-B` }
    };
  }
  const inheritProductA = Math.random() < 0.5 ? parentA.productId : parentB.productId;
  const inheritListingA = inheritProductA === parentA.productId ? parentA.listingId : parentB.listingId;
  const inheritProductB = Math.random() < 0.5 ? parentB.productId : parentA.productId;
  const inheritListingB = inheritProductB === parentB.productId ? parentB.listingId : parentA.listingId;
  const blend = (gA, gB) => {
    const alpha = Math.random() * 1.2 - 0.1;
    return Math.max(0.02, Math.min(0.98, alpha * gA + (1 - alpha) * gB));
  };
  const genesChildA = {
    priceSensitivity: blend(parentA.genes.priceSensitivity, parentB.genes.priceSensitivity),
    specsImportance: blend(parentA.genes.specsImportance, parentB.genes.specsImportance),
    qualityFocus: blend(parentA.genes.qualityFocus, parentB.genes.qualityFocus),
    merchantTrustWeight: blend(parentA.genes.merchantTrustWeight, parentB.genes.merchantTrustWeight),
    timingTrendWeight: blend(parentA.genes.timingTrendWeight, parentB.genes.timingTrendWeight),
    shippingSpeedWeight: blend(parentA.genes.shippingSpeedWeight, parentB.genes.shippingSpeedWeight)
  };
  const genesChildB = {
    priceSensitivity: blend(parentB.genes.priceSensitivity, parentA.genes.priceSensitivity),
    specsImportance: blend(parentB.genes.specsImportance, parentA.genes.specsImportance),
    qualityFocus: blend(parentB.genes.qualityFocus, parentA.genes.qualityFocus),
    merchantTrustWeight: blend(parentB.genes.merchantTrustWeight, parentA.genes.merchantTrustWeight),
    timingTrendWeight: blend(parentB.genes.timingTrendWeight, parentA.genes.timingTrendWeight),
    shippingSpeedWeight: blend(parentB.genes.shippingSpeedWeight, parentA.genes.shippingSpeedWeight)
  };
  return {
    childA: {
      id: `chrom-${Date.now()}-cA-${Math.random().toString(36).substr(2, 4)}`,
      productId: inheritProductA,
      listingId: inheritListingA,
      genes: genesChildA,
      fitness: 0,
      rawMetrics: { ...parentA.rawMetrics }
    },
    childB: {
      id: `chrom-${Date.now()}-cB-${Math.random().toString(36).substr(2, 4)}`,
      productId: inheritProductB,
      listingId: inheritListingB,
      genes: genesChildB,
      fitness: 0,
      rawMetrics: { ...parentB.rawMetrics }
    }
  };
}
function mutate(chromosome, mutationRate, eligibleProducts) {
  if (Math.random() > mutationRate) {
    return chromosome;
  }
  let mutatedProductId = chromosome.productId;
  let mutatedListingId = chromosome.listingId;
  if (Math.random() < 0.35 && eligibleProducts.length > 0) {
    const randomProd = eligibleProducts[Math.floor(Math.random() * eligibleProducts.length)];
    mutatedProductId = randomProd.id;
    const randomListing = randomProd.listings[Math.floor(Math.random() * randomProd.listings.length)];
    mutatedListingId = randomListing.id;
  } else if (Math.random() < 0.3) {
    const currentProd = eligibleProducts.find((p) => p.id === mutatedProductId);
    if (currentProd && currentProd.listings.length > 1) {
      const otherListings = currentProd.listings.filter((l) => l.id !== mutatedListingId);
      if (otherListings.length > 0) {
        mutatedListingId = otherListings[Math.floor(Math.random() * otherListings.length)].id;
      }
    }
  }
  const gaussian = () => (Math.random() + Math.random() + Math.random() - 1.5) * 0.18;
  const perturb = (val) => Math.max(0.02, Math.min(0.98, val + gaussian()));
  const mutatedGenes = {
    priceSensitivity: perturb(chromosome.genes.priceSensitivity),
    specsImportance: perturb(chromosome.genes.specsImportance),
    qualityFocus: perturb(chromosome.genes.qualityFocus),
    merchantTrustWeight: perturb(chromosome.genes.merchantTrustWeight),
    timingTrendWeight: perturb(chromosome.genes.timingTrendWeight),
    shippingSpeedWeight: perturb(chromosome.genes.shippingSpeedWeight)
  };
  return {
    ...chromosome,
    productId: mutatedProductId,
    listingId: mutatedListingId,
    genes: mutatedGenes
  };
}
function evolveOneGeneration(currentPopulation, generationIndex, params, criteria, productMap, eligibleProducts) {
  const evaluatedPopulation = currentPopulation.map(
    (c) => evaluateFitness(c, criteria, productMap)
  );
  evaluatedPopulation.sort((a, b) => b.fitness - a.fitness);
  const bestFitness = evaluatedPopulation[0].fitness;
  const worstFitness = evaluatedPopulation[evaluatedPopulation.length - 1].fitness;
  const sumFitness = evaluatedPopulation.reduce((acc, c) => acc + c.fitness, 0);
  const averageFitness = Number((sumFitness / evaluatedPopulation.length).toFixed(2));
  const variance = evaluatedPopulation.reduce((acc, c) => acc + Math.pow(c.fitness - averageFitness, 2), 0) / evaluatedPopulation.length;
  const diversityIndex = Number(Math.sqrt(variance).toFixed(2));
  const snapshot = {
    generation: generationIndex,
    bestFitness,
    averageFitness,
    worstFitness,
    diversityIndex,
    bestChromosome: { ...evaluatedPopulation[0] }
  };
  const nextPopulation = [];
  const eliteCount = Math.min(params.elitismCount, evaluatedPopulation.length);
  for (let i = 0; i < eliteCount; i++) {
    nextPopulation.push({ ...evaluatedPopulation[i] });
  }
  const selectParent = params.selectionMethod === "roulette" ? (pop) => selectParentRoulette(pop) : (pop) => selectParentTournament(pop, 3);
  while (nextPopulation.length < params.populationSize) {
    const parentA = selectParent(evaluatedPopulation);
    const parentB = selectParent(evaluatedPopulation);
    const { childA, childB } = crossover(parentA, parentB, params.crossoverRate);
    const mutatedA = mutate(childA, params.mutationRate, eligibleProducts);
    const evaluatedChildA = evaluateFitness(mutatedA, criteria, productMap);
    nextPopulation.push(evaluatedChildA);
    if (nextPopulation.length < params.populationSize) {
      const mutatedB = mutate(childB, params.mutationRate, eligibleProducts);
      const evaluatedChildB = evaluateFitness(mutatedB, criteria, productMap);
      nextPopulation.push(evaluatedChildB);
    }
  }
  return { nextPopulation, snapshot };
}
function analyzeGeneticConvergence(finalPopulation, productMap, criteria) {
  const sorted = [...finalPopulation].sort((a, b) => b.fitness - a.fitness);
  const eliteTop = sorted.slice(0, Math.max(5, Math.floor(sorted.length * 0.15)));
  let avgPrice = 0;
  let avgSpecs = 0;
  let avgQuality = 0;
  let avgTrust = 0;
  let avgTiming = 0;
  for (const ind of eliteTop) {
    avgPrice += ind.genes.priceSensitivity;
    avgSpecs += ind.genes.specsImportance;
    avgQuality += ind.genes.qualityFocus;
    avgTrust += ind.genes.merchantTrustWeight;
    avgTiming += ind.genes.timingTrendWeight;
  }
  const count = eliteTop.length;
  const rawSum = avgPrice + avgSpecs + avgQuality + avgTrust + avgTiming;
  const priceWeight = Math.round(avgPrice / rawSum * 100);
  const specsWeight = Math.round(avgSpecs / rawSum * 100);
  const qualityWeight = Math.round(avgQuality / rawSum * 100);
  const merchantTrustWeight = Math.round(avgTrust / rawSum * 100);
  const timingWeight = Math.max(5, 100 - (priceWeight + specsWeight + qualityWeight + merchantTrustWeight));
  let detectedPersona = "Comprador Racional Multidimensional";
  let tradeoffReason = "";
  if (priceWeight >= 32) {
    detectedPersona = "Maximizador de Ahorro & Eficiencia Presupuestaria";
    tradeoffReason = `El algoritmo identific\xF3 alta sensibilidad al precio (${priceWeight}%). Prioriz\xF3 ofertas con el menor precio por unidad de rendimiento, descartando opciones m\xE1s caras con rendimientos marginales decrecientes.`;
  } else if (specsWeight >= 30) {
    detectedPersona = "Entusiasta de Alto Rendimiento & Hardware Pro";
    tradeoffReason = `El cromosoma convergi\xF3 hacia la c\xFAspide t\xE9cnica (${specsWeight}% de peso en especificaciones). Justific\xF3 acercarse al tope de tu presupuesto ($${criteria.maxBudget}) para maximizar potencia y longevidad.`;
  } else if (merchantTrustWeight >= 25) {
    detectedPersona = "Comprador Seguro con Preferencia por Tiendas Oficiales";
    tradeoffReason = `El modelo penaliz\xF3 tiendas dudosas y prioriz\xF3 comerciantes verificados (${merchantTrustWeight}% peso en confianza) con env\xEDos r\xE1pidos o gratuitos.`;
  } else {
    detectedPersona = "Equilibrio \xD3ptimo Pareto (Calidad-Precio Puro)";
    tradeoffReason = `El algoritmo encontr\xF3 el punto de inflexi\xF3n donde cada d\xF3lar invertido entrega el mayor retorno en satisfacci\xF3n, durabilidad y confianza comercial.`;
  }
  const seenProducts = /* @__PURE__ */ new Set();
  const paretoSolutions = [];
  for (const ind of sorted) {
    if (seenProducts.has(ind.productId)) continue;
    seenProducts.add(ind.productId);
    const product = productMap.get(ind.productId);
    if (!product) continue;
    const listing = product.listings.find((l) => l.id === ind.listingId) || product.listings[0];
    const savingsVsBudget = criteria.maxBudget - listing.price;
    const rank = paretoSolutions.length + 1;
    let tradeoffLabel = "\xD3ptimo Global Evolutivo";
    if (rank === 2) tradeoffLabel = "Alternativa de Alto Rendimiento";
    else if (rank === 3) tradeoffLabel = "Alternativa de M\xE1ximo Ahorro";
    else if (rank > 3) tradeoffLabel = "Opci\xF3n Destacada";
    const highlights = [];
    if (savingsVsBudget >= 0) {
      highlights.push(`Ahorro de $${Math.round(savingsVsBudget)} vs presupuesto`);
    } else {
      highlights.push(`Excede presupuesto por $${Math.abs(Math.round(savingsVsBudget))}`);
    }
    if (listing.verifiedMerchant) highlights.push("Vendedor Verificado");
    if (listing.shipping.toLowerCase().includes("gratis")) highlights.push("Env\xEDo Gratis");
    if (product.lstmTrend === "HISTORIC_LOW") highlights.push("M\xEDnimo Hist\xF3rico detectado");
    paretoSolutions.push({
      rank,
      product,
      listing,
      fitness: ind.fitness,
      title: product.name,
      price: listing.price,
      savingsVsBudget,
      tradeoffLabel,
      highlights
    });
    if (paretoSolutions.length >= 4) break;
  }
  return {
    detectedPreferences: {
      priceWeight,
      specsWeight,
      qualityWeight,
      merchantTrustWeight,
      timingWeight,
      detectedPersona,
      tradeoffReason
    },
    paretoSolutions,
    convergedAtGen: 28
    // Approximate convergence plateau
  };
}
function runGeneticAlgorithm(criteria = DEFAULT_PURCHASE_CRITERIA, params = DEFAULT_GENETIC_PARAMS, productsDataset = INITIAL_PRODUCTS_DATASET) {
  const startTime = performance.now();
  const productMap = /* @__PURE__ */ new Map();
  productsDataset.forEach((p) => productMap.set(p.id, p));
  const eligibleProducts = getEligibleProducts(productsDataset, criteria);
  let population = initializePopulation(params, criteria, productsDataset);
  const generationsHistory = [];
  let plateauCounter = 0;
  let lastBestFitness = 0;
  let convergedAtGen = params.generations;
  for (let gen = 1; gen <= params.generations; gen++) {
    const { nextPopulation, snapshot } = evolveOneGeneration(
      population,
      gen,
      params,
      criteria,
      productMap,
      eligibleProducts
    );
    generationsHistory.push(snapshot);
    population = nextPopulation;
    if (Math.abs(snapshot.bestFitness - lastBestFitness) < 0.05) {
      plateauCounter++;
      if (plateauCounter === 8 && convergedAtGen === params.generations) {
        convergedAtGen = gen;
      }
    } else {
      plateauCounter = 0;
      lastBestFitness = snapshot.bestFitness;
    }
  }
  population.sort((a, b) => b.fitness - a.fitness);
  const bestChromosome = population[0];
  const bestProduct = productMap.get(bestChromosome.productId) || eligibleProducts[0];
  const bestListing = bestProduct.listings.find((l) => l.id === bestChromosome.listingId) || bestProduct.listings[0];
  const { detectedPreferences, paretoSolutions } = analyzeGeneticConvergence(
    population,
    productMap,
    criteria
  );
  const endTime = performance.now();
  const executionTimeMs = Number((endTime - startTime).toFixed(1));
  return {
    generationsHistory,
    bestChromosome,
    bestProduct,
    bestListing,
    paretoSolutions,
    detectedPreferences,
    totalEvaluations: params.populationSize * params.generations,
    executionTimeMs,
    convergedAtGen
  };
}

// server/db.ts
import crypto from "crypto";
function hashPassword(password, salt) {
  const activeSalt = salt || crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, activeSalt, 1e4, 64, "sha512").toString("hex");
  return { hash, salt: activeSalt };
}
function verifyPassword(password, hash, salt) {
  const computed = crypto.pbkdf2Sync(password, salt, 1e4, 64, "sha512").toString("hex");
  return computed === hash;
}
var SimpleDatabase = class {
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.sessions = /* @__PURE__ */ new Map();
    this.auditLogs = [];
    this.products = /* @__PURE__ */ new Map();
    this.orders = [];
    // Counters for Backoffice Analytics
    this.statsCounters = {
      totalSearches: 14290,
      geneticOptimizationsRun: 3842,
      lstmHistoricalDipsCount: 158
    };
    this.seedDefaultUsers();
    this.seedInitialAuditLogs();
    this.seedInitialProducts();
    this.seedInitialOrders();
  }
  seedInitialProducts() {
    INITIAL_PRODUCTS_DATASET.forEach((p) => {
      this.products.set(p.id, { ...p });
    });
  }
  seedInitialOrders() {
    this.orders = [
      {
        id: "ord_91823",
        userId: "usr_carlos_mendez",
        userEmail: "carlos.mendez@gmail.com",
        userName: "Carlos M\xE9ndez",
        items: [
          {
            productId: "phone-01",
            productName: "Samsung Galaxy S24 Ultra",
            brand: "Samsung",
            category: "celulares",
            imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80",
            merchantName: "Amazon",
            price: 1149,
            quantity: 1,
            qpiScore: 92
          }
        ],
        totalAmount: 1149,
        totalItems: 1,
        createdAt: new Date(Date.now() - 36e5 * 24 * 2).toISOString(),
        status: "completada"
      },
      {
        id: "ord_91824",
        userId: "usr_sofia_morales",
        userEmail: "sofia.morales@gmail.com",
        userName: "Sof\xEDa Morales",
        items: [
          {
            productId: "shoe-01",
            productName: "Nike Vaporfly 3",
            brand: "Nike",
            category: "zapatos",
            imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
            merchantName: "Nike Store",
            price: 249,
            quantity: 1,
            qpiScore: 91
          }
        ],
        totalAmount: 249,
        totalItems: 1,
        createdAt: new Date(Date.now() - 36e5 * 18).toISOString(),
        status: "completada"
      },
      {
        id: "ord_91825",
        userId: "usr_lucas_silva",
        userEmail: "lucas.silva@gmail.com",
        userName: "Lucas Silva",
        items: [
          {
            productId: "comp-01",
            productName: 'MacBook Pro 16" M3 Pro',
            brand: "Apple",
            category: "computadoras",
            imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
            merchantName: "Best Buy",
            price: 2399,
            quantity: 1,
            qpiScore: 94
          }
        ],
        totalAmount: 2399,
        totalItems: 1,
        createdAt: new Date(Date.now() - 36e5 * 4).toISOString(),
        status: "completada"
      }
    ];
  }
  seedDefaultUsers() {
    const defaultAccounts = [
      // 3 Usuarios Regulares Ficticios
      {
        email: "carlos.mendez@gmail.com",
        name: "Carlos M\xE9ndez",
        pass: "carlos123",
        role: "user",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"
      },
      {
        email: "sofia.morales@gmail.com",
        name: "Sof\xEDa Morales",
        pass: "sofia123",
        role: "user",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
      },
      {
        email: "lucas.silva@gmail.com",
        name: "Lucas Silva",
        pass: "lucas123",
        role: "user",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
      },
      // 2 Administradores
      {
        email: "elena.admin@omni.ia",
        name: "Elena Torres (Admin Operaciones)",
        pass: "admin123",
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80"
      },
      {
        email: "marcos.admin@omni.ia",
        name: "Marcos Vega (Admin Auditor\xEDa)",
        pass: "admin456",
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
      },
      // 3 Desarrolladores (God Mode)
      {
        email: "mistikelpro123@gmail.com",
        name: "Ing. Propietario (God Mode)",
        pass: "admin",
        role: "developer",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
      },
      {
        email: "alex.dev@omni.ia",
        name: "Alex Rivera (Arquitecto Software)",
        pass: "dev123",
        role: "developer",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80"
      },
      {
        email: "clara.mlops@omni.ia",
        name: "Clara Chen (ML & Tensors Lead)",
        pass: "mlops123",
        role: "developer",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
      }
    ];
    for (const acc of defaultAccounts) {
      const { hash, salt } = hashPassword(acc.pass);
      const id = "usr_" + crypto.randomBytes(6).toString("hex");
      this.users.set(acc.email.toLowerCase(), {
        id,
        email: acc.email.toLowerCase(),
        name: acc.name,
        role: acc.role,
        passwordHash: hash,
        passwordSalt: salt,
        avatar: acc.avatar,
        createdAt: "2026-09-01T10:00:00.000Z",
        lastLogin: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  }
  seedInitialAuditLogs() {
    this.auditLogs = [
      {
        id: "log_001",
        timestamp: new Date(Date.now() - 36e5 * 4).toISOString(),
        userEmail: "admin@omni.ia",
        action: "INICIO_SESION",
        category: "SEGURIDAD",
        detail: "Acceso autorizado al m\xF3dulo Backoffice v\xEDa PBKDF2 hash"
      },
      {
        id: "log_002",
        timestamp: new Date(Date.now() - 36e5 * 3).toISOString(),
        userEmail: "dev@omni.ia",
        action: "TUNING_PESOS_IA",
        category: "MODELOS_ML",
        detail: "Reajuste de vector hiperpar\xE1metros (QPI alpha=0.35, beta=0.25)"
      },
      {
        id: "log_003",
        timestamp: new Date(Date.now() - 36e5 * 2).toISOString(),
        userEmail: "usuario@omni.ia",
        action: "OPTIMIZACION_GENETICA",
        category: "ALGORITMO_PARETO",
        detail: "Ejecuci\xF3n de algoritmo gen\xE9tico para celulares (50 cromosomas, 40 gens)"
      },
      {
        id: "log_004",
        timestamp: new Date(Date.now() - 36e5 * 1).toISOString(),
        userEmail: "usuario@omni.ia",
        action: "BUSQUEDA_TRANSFORMER",
        category: "CONSULTA_CATALOGO",
        detail: "B\xFAsqueda sem\xE1ntica para laptops ultraligeras con GPU RTX"
      }
    ];
  }
  findUserByEmail(email) {
    return this.users.get(email.toLowerCase().trim());
  }
  findUserById(id) {
    for (const u of this.users.values()) {
      if (u.id === id) return u;
    }
    return void 0;
  }
  createUser(email, passwordPlain, name, role = "user") {
    const normalizedEmail = email.toLowerCase().trim();
    if (this.users.has(normalizedEmail)) {
      throw new Error("El correo electr\xF3nico ya se encuentra registrado.");
    }
    const { hash, salt } = hashPassword(passwordPlain);
    const id = "usr_" + crypto.randomBytes(6).toString("hex");
    const newUser = {
      id,
      email: normalizedEmail,
      name: name.trim() || normalizedEmail.split("@")[0],
      role,
      passwordHash: hash,
      passwordSalt: salt,
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(normalizedEmail)}`,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      lastLogin: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.users.set(normalizedEmail, newUser);
    this.logAction(normalizedEmail, "REGISTRO_USUARIO", "SEGURIDAD", `Cuenta creada con rol ${role} y hash PBKDF2`);
    return newUser;
  }
  authenticateUser(email, passwordPlain) {
    const user = this.findUserByEmail(email);
    if (!user) {
      throw new Error("Credenciales inv\xE1lidas: Usuario no encontrado.");
    }
    const isValid = verifyPassword(passwordPlain, user.passwordHash, user.passwordSalt);
    if (!isValid) {
      this.logAction(email, "FALLO_AUTENTICACION", "SEGURIDAD", "Contrase\xF1a incorrecta ingresada");
      throw new Error("Credenciales inv\xE1lidas: Contrase\xF1a incorrecta.");
    }
    user.lastLogin = (/* @__PURE__ */ new Date()).toISOString();
    const token = this.createSession(user.id);
    this.logAction(user.email, "INICIO_SESION", "SEGURIDAD", `Acceso exitoso con rol ${user.role}`);
    return {
      user: this.toPublicUser(user),
      token
    };
  }
  authenticateGoogle(email, name, avatar, targetRole = "user") {
    const normalizedEmail = email.toLowerCase().trim();
    let user = this.findUserByEmail(normalizedEmail);
    if (!user) {
      const { hash, salt } = hashPassword(crypto.randomBytes(16).toString("hex"));
      const id = "usr_g_" + crypto.randomBytes(6).toString("hex");
      user = {
        id,
        email: normalizedEmail,
        name: name || normalizedEmail.split("@")[0],
        role: normalizedEmail.includes("admin") ? "admin" : normalizedEmail.includes("dev") || normalizedEmail === "mistikelpro123@gmail.com" ? "developer" : targetRole,
        passwordHash: hash,
        passwordSalt: salt,
        avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(normalizedEmail)}`,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        lastLogin: (/* @__PURE__ */ new Date()).toISOString()
      };
      this.users.set(normalizedEmail, user);
      this.logAction(normalizedEmail, "REGISTRO_GOOGLE", "OAUTH_SIMULADO", "Usuario auto-creado v\xEDa Google Auth");
    } else {
      user.lastLogin = (/* @__PURE__ */ new Date()).toISOString();
      if (name) user.name = name;
      if (avatar) user.avatar = avatar;
      this.logAction(user.email, "LOGIN_GOOGLE", "OAUTH_SIMULADO", "Inicio de sesi\xF3n con cuenta Google");
    }
    const token = this.createSession(user.id);
    return {
      user: this.toPublicUser(user),
      token
    };
  }
  createSession(userId) {
    const token = "omn_" + crypto.randomBytes(24).toString("hex");
    const now = Date.now();
    const expiresAt = now + 7 * 24 * 60 * 60 * 1e3;
    this.sessions.set(token, {
      token,
      userId,
      createdAt: now,
      expiresAt
    });
    return token;
  }
  validateSession(token) {
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
  invalidateSession(token) {
    return this.sessions.delete(token);
  }
  toPublicUser(user) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
      passwordSalt: user.passwordSalt.substring(0, 10) + "...",
      passwordHashPreview: `pbkdf2:sha512:10000:${user.passwordHash.substring(0, 14)}...`
    };
  }
  getAllUsers() {
    return Array.from(this.users.values()).map((u) => this.toPublicUser(u));
  }
  logAction(userEmail, action, category, detail) {
    const newLog = {
      id: "log_" + crypto.randomBytes(4).toString("hex"),
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
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
  getAuditLogs() {
    return this.auditLogs.slice(0, 30);
  }
  getBackofficeStats(totalCatalogCount) {
    return {
      totalSearches: this.statsCounters.totalSearches,
      geneticOptimizationsRun: this.statsCounters.geneticOptimizationsRun,
      averageSavingsUSD: 184.5,
      averageSavingsPercent: 28.4,
      averageQpiScore: 89.2,
      lstmHistoricalDipsCount: this.statsCounters.lstmHistoricalDipsCount,
      totalUsersCount: this.users.size,
      totalCatalogProducts: totalCatalogCount,
      categoryDistribution: [
        { category: "celulares", label: "Celulares y Smartphones", count: 6573, percentage: 46 },
        { category: "computadoras", label: "Laptops y Estaciones", count: 4858, percentage: 34 },
        { category: "zapatos", label: "Zapatos y Calzado", count: 2859, percentage: 20 }
      ],
      merchantShare: [
        { merchant: "Amazon", bestOfferCount: 1613, percentage: 42, avgTrust: 98 },
        { merchant: "MercadoLibre", bestOfferCount: 1191, percentage: 31, avgTrust: 95 },
        { merchant: "eBay", bestOfferCount: 691, percentage: 18, avgTrust: 91 },
        { merchant: "Best Buy", bestOfferCount: 347, percentage: 9, avgTrust: 96 }
      ],
      weeklyActivity: [
        { day: "Lun", searches: 1850, gaRuns: 490 },
        { day: "Mar", searches: 2100, gaRuns: 580 },
        { day: "Mie", searches: 2450, gaRuns: 630 },
        { day: "Jue", searches: 2200, gaRuns: 590 },
        { day: "Vie", searches: 2800, gaRuns: 760 },
        { day: "Sab", searches: 1650, gaRuns: 430 },
        { day: "Dom", searches: 1240, gaRuns: 362 }
      ],
      recentAuditLogs: this.getAuditLogs()
    };
  }
  getPublicUsersSupervision() {
    return Array.from(this.users.values()).map((u) => ({
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
  getProducts() {
    return Array.from(this.products.values());
  }
  getProductById(id) {
    return this.products.get(id);
  }
  addProduct(productData, actorEmail = "dev@omni.ia") {
    const id = productData.id || `prod_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newProduct = {
      ...productData,
      id
    };
    this.products.set(id, newProduct);
    this.logAction(actorEmail, "CREAR_PRODUCTO", "CATALOGO", `Producto creado: ${newProduct.name} (${newProduct.category})`);
    return newProduct;
  }
  updateProduct(id, updates, actorEmail = "dev@omni.ia") {
    const existing = this.products.get(id);
    if (!existing) {
      throw new Error(`Producto con ID ${id} no encontrado.`);
    }
    const updated = {
      ...existing,
      ...updates,
      id
      // preserve ID
    };
    this.products.set(id, updated);
    this.logAction(actorEmail, "EDITAR_PRODUCTO", "CATALOGO", `Producto actualizado: ${updated.name}`);
    return updated;
  }
  deleteProduct(id, actorEmail = "dev@omni.ia") {
    const existing = this.products.get(id);
    if (!existing) return false;
    this.products.delete(id);
    this.logAction(actorEmail, "ELIMINAR_PRODUCTO", "CATALOGO", `Producto eliminado: ${existing.name}`);
    return true;
  }
  // ==========================================
  // SHOPPING CART & ORDERS MANAGEMENT
  // ==========================================
  createOrder(userId, userEmail, userName, items) {
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const newOrder = {
      id: "ord_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 6),
      userId,
      userEmail,
      userName,
      items: [...items],
      totalAmount,
      totalItems,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      status: "completada"
    };
    this.orders.unshift(newOrder);
    this.logAction(userEmail, "COMPRA_REALIZADA", "TRANSACCION", `Orden ${newOrder.id} por $${totalAmount} USD (${totalItems} art\xEDculos)`);
    return newOrder;
  }
  getOrders() {
    return [...this.orders];
  }
  getUserOrders(userId) {
    return this.orders.filter((o) => o.userId === userId);
  }
  getPostgresSchemaDDL() {
    return `-- ==========================================================
-- Omni.IA - Esquema Relacional PostgreSQL con Hash PBKDF2
-- ==========================================================

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL DEFAULT 'user', -- 'user', 'admin', 'developer'
    password_hash VARCHAR(128) NOT NULL,      -- PBKDF2 HMAC-SHA512 (10,000 iteraciones)
    password_salt VARCHAR(64) NOT NULL,       -- Salt criptogr\xE1fico aleatorio 16 bytes
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
};
var db = new SimpleDatabase();

// server/apiRouter.ts
var apiRouter = Router();
function getBearerToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  return authHeader.split(" ")[1];
}
function requireAuth(req, res, next) {
  const token = getBearerToken(req);
  if (!token) {
    return res.status(401).json({ success: false, error: "Token de autorizaci\xF3n requerido" });
  }
  const user = db.validateSession(token);
  if (!user) {
    return res.status(401).json({ success: false, error: "Sesi\xF3n expirada o inv\xE1lida" });
  }
  req.user = user;
  next();
}
function requireAdmin(req, res, next) {
  const user = req.user;
  if (!user || user.role !== "admin" && user.role !== "developer") {
    return res.status(403).json({ success: false, error: "Acceso restringido: Se requiere rol de Administrador o Desarrollador" });
  }
  next();
}
function requireDeveloper(req, res, next) {
  const user = req.user;
  if (!user || user.role !== "developer") {
    return res.status(403).json({ success: false, error: "Acceso restringido: Se requiere rol de Desarrollador (God Mode)" });
  }
  next();
}
apiRouter.post("/auth/login", (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Correo y contrase\xF1a son requeridos" });
    }
    const { user, token } = db.authenticateUser(email, password);
    res.json({ success: true, user, token });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message || "Error de autenticaci\xF3n" });
  }
});
apiRouter.post("/auth/register", (req, res) => {
  try {
    const { email, password, name, role } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Correo y contrase\xF1a son requeridos" });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, error: "La contrase\xF1a debe tener al menos 6 caracteres" });
    }
    const assignedRole = role === "admin" || role === "developer" ? role : "user";
    const newUser = db.createUser(email, password, name || email.split("@")[0], assignedRole);
    const token = db.createSession(newUser.id);
    res.json({
      success: true,
      user: db.toPublicUser(newUser),
      token
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message || "Error al registrar usuario" });
  }
});
apiRouter.post("/auth/google", (req, res) => {
  try {
    const { email, name, avatar, targetRole } = req.body || {};
    const activeEmail = email || "usuario.google@omni.ia";
    const { user, token } = db.authenticateGoogle(activeEmail, name, avatar, targetRole);
    res.json({ success: true, user, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || "Error en autenticaci\xF3n Google" });
  }
});
apiRouter.get("/auth/me", (req, res) => {
  const token = getBearerToken(req);
  if (!token) {
    return res.status(401).json({ success: false, error: "No autenticado" });
  }
  const user = db.validateSession(token);
  if (!user) {
    return res.status(401).json({ success: false, error: "Sesi\xF3n inv\xE1lida o expirada" });
  }
  res.json({ success: true, user });
});
apiRouter.post("/auth/logout", (req, res) => {
  const token = getBearerToken(req);
  if (token) {
    db.invalidateSession(token);
  }
  res.json({ success: true });
});
apiRouter.get("/backoffice/dashboard", requireAuth, requireAdmin, (req, res) => {
  try {
    const users = db.getPublicUsersSupervision();
    res.json({
      success: true,
      users
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || "Error al cargar usuarios" });
  }
});
apiRouter.get("/developer/tech-spec", requireAuth, requireDeveloper, (req, res) => {
  try {
    const memUsage = process.memoryUsage();
    res.json({
      success: true,
      architectureData: {
        aiModels: [
          {
            name: "Transformers (Atenci\xF3n Sem\xE1ntica & Extracci\xF3n)",
            type: "NLP & Vector Embeddings",
            framework: "Google Gemini 2.5 Flash + Cosine Semantic Similarity",
            justification: "Extrae especificaciones t\xE9cnicas no estructuradas desde texto web (procesador, RAM, c\xE1mara, materiales) y calcula el vector de afinidad con la intenci\xF3n de b\xFAsqueda del usuario.",
            inferenceLatency: "180ms - 320ms",
            cost: "$0.00 USD (Capa gratuita Google AI Studio)"
          },
          {
            name: "Redes Convolucionales (CNN / Visual Backbone)",
            type: "Computer Vision & Quality Assurance",
            framework: "Feature Map Extractor (ResNet-inspired 8D Feature Vector)",
            justification: "Eval\xFAa la fidelidad del producto, estado de empaque y detalles est\xE9ticos del calzado y hardware inform\xE1tico a partir de im\xE1genes de cat\xE1logo.",
            inferenceLatency: "45ms",
            cost: "$0.00 USD (Inferencia en CPU/Edge)"
          },
          {
            name: "Redes Recurrentes (LSTM / Time-Series)",
            type: "Price Forecasting & Trend Analysis",
            framework: "Dual-Gate LSTM Cell con memoria hist\xF3rica de 6 a 12 meses",
            justification: "Monitorea las fluctuaciones de precio a lo largo del tiempo entre tiendas para detectar anomal\xEDas, precios m\xEDnimos hist\xF3ricos y predecir ca\xEDdas inminentes.",
            inferenceLatency: "12ms",
            cost: "$0.00 USD (Vectorizado NumPy/TypeScript)"
          },
          {
            name: "Motor de B\xFAsqueda Inteligente Multiobjetivo",
            type: "NLP Inferencia & Heur\xEDstica de Rentabilidad",
            framework: "Semantic Intent Extractor + Multi-Store QPI Scoring",
            justification: "Deduce necesidades impl\xEDcitas (ej: gaming pesado -> GPU dedicada 8GB+, 16GB RAM) y pondera rentabilidad, precios m\xEDnimos y confiabilidad de comercios.",
            inferenceLatency: "20ms - 150ms",
            cost: "$0.00 USD (Inferencia Serverless)"
          }
        ],
        softwareArchitecture: {
          frontend: "React 19 + TypeScript + Vite 6 + Tailwind CSS + Lucide Icons",
          backend: "Node.js + Express + TypeScript Router modular",
          database: "In-Memory Store con Hashing Criptogr\xE1fico PBKDF2 (SHA-512, 10,000 iteraciones)",
          stateManagement: "Hooks Reactivos (useState, useEffect, localStorage sync)"
        },
        cloudInfrastructure: {
          hosting: "Google Cloud Run (Serverless Container)",
          freeTierDetails: "2,000,000 de solicitudes mensuales gratuitas, 360,000 GB-segundos de memoria gratis, escala a cero sin cobro inactivo.",
          databaseCost: "$0.00 USD (Implementaci\xF3n nativa en memoria con hash)",
          totalMonthlyCost: "$0.00 USD (100% Free Platform)"
        },
        systemDiagnostics: {
          nodeVersion: process.version,
          platform: process.platform,
          uptimeSeconds: Math.round(process.uptime()),
          memoryRssMB: Math.round(memUsage.rss / 1024 / 1024),
          memoryHeapUsedMB: Math.round(memUsage.heapUsed / 1024 / 1024),
          memoryHeapTotalMB: Math.round(memUsage.heapTotal / 1024 / 1024)
        },
        postgresSchemaDDL: db.getPostgresSchemaDDL(),
        // Passwords, hashes, and salts are strictly EXCLUDED for security/privacy compliance
        usersSupervision: db.getPublicUsersSupervision(),
        purchasesSupervision: db.getOrders(),
        recentAuditLogs: db.getAuditLogs(),
        productsCatalogCount: db.getProducts().length,
        liveStats: db.getBackofficeStats(db.getProducts().length)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || "Error al obtener especificaci\xF3n t\xE9cnica" });
  }
});
apiRouter.get("/products", (req, res) => {
  res.json({ success: true, products: db.getProducts() });
});
apiRouter.post("/products", requireAuth, requireDeveloper, (req, res) => {
  try {
    const user = req.user;
    const newProduct = db.addProduct(req.body, user.email);
    res.json({ success: true, product: newProduct });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message || "Error al crear producto" });
  }
});
apiRouter.put("/products/:id", requireAuth, requireDeveloper, (req, res) => {
  try {
    const user = req.user;
    const updated = db.updateProduct(req.params.id, req.body, user.email);
    res.json({ success: true, product: updated });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message || "Error al actualizar producto" });
  }
});
apiRouter.delete("/products/:id", requireAuth, requireDeveloper, (req, res) => {
  try {
    const user = req.user;
    const ok = db.deleteProduct(req.params.id, user.email);
    if (!ok) {
      return res.status(404).json({ success: false, error: "Producto no encontrado" });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || "Error al eliminar producto" });
  }
});
apiRouter.post("/cart/checkout", requireAuth, (req, res) => {
  try {
    const user = req.user;
    const { items } = req.body || {};
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, error: "El carrito de compras no contiene art\xEDculos" });
    }
    const order = db.createOrder(user.id, user.email, user.name, items);
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || "Error al procesar el pedido" });
  }
});
apiRouter.get("/orders", requireAuth, (req, res) => {
  try {
    const user = req.user;
    if (user.role === "developer") {
      res.json({ success: true, orders: db.getOrders() });
    } else {
      res.json({ success: true, orders: db.getUserOrders(user.id) });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || "Error al obtener historial de compras" });
  }
});
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
}
apiRouter.post("/search-products", async (req, res) => {
  try {
    db.statsCounters.totalSearches++;
    const { searchQuery, category, weights, minPrice, maxPrice, minRating } = req.body || {};
    let products = db.getProducts();
    if (category && category !== "all") {
      products = products.filter((p) => p.category === category);
    }
    if (minRating) {
      products = products.filter((p) => p.overallRating >= Number(minRating));
    }
    if (minPrice || maxPrice) {
      products = products.filter((p) => {
        const minLPrice = Math.min(...p.listings.map((l) => l.price));
        const minP = minPrice ? Number(minPrice) : 0;
        const maxP = maxPrice ? Number(maxPrice) : 999999;
        return minLPrice >= minP && minLPrice <= maxP;
      });
    }
    products = products.map((p) => {
      const qpiData = calculateProductQPI(p, weights);
      const lstm = predictLSTMPriceTrend(p.priceHistory);
      return {
        ...p,
        qpiScore: qpiData.qpiScore,
        valueGrade: qpiData.grade,
        lstmTrend: lstm.trend
      };
    });
    let aiInsight = "";
    const ai = getGeminiClient();
    if (ai && searchQuery && searchQuery.trim().length > 3) {
      try {
        const prompt = `Act\xFAa como un motor de recomendaci\xF3n con arquitectura Transformer e IA multimodelo (QPI Index).
El usuario est\xE1 buscando: "${searchQuery}" en la categor\xEDa: "${category || "general"}".

Lista de productos disponibles actualmente en la base de datos:
${products.map((p) => `- ${p.name} (${p.category}): $${Math.min(...p.listings.map((l) => l.price))} USD, QPI: ${p.qpiScore}, Specs: ${JSON.stringify(p.specs)}`).join("\n")}

Genera un an\xE1lisis sint\xE9tico en espa\xF1ol (m\xE1ximo 120 palabras) explicando:
1. Cu\xE1l es la opci\xF3n con mejor balance calidad-precio (QPI) seg\xFAn la consulta.
2. Por qu\xE9 la arquitectura Transformer seleccion\xF3 este producto sobre los dem\xE1s.
3. Recomendaci\xF3n de compra basada en la tendencia de precio de las tiendas.`;
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            systemInstruction: "Eres un sistema de recomendaci\xF3n inteligente de productos basado en redes neuronales Transformers, CNN, LSTM y Gradient Boosting."
          }
        });
        if (response.text) {
          aiInsight = response.text;
        }
      } catch (geminiErr) {
        console.warn("Gemini Search Insight fallback used:", geminiErr);
      }
    }
    if (!aiInsight && searchQuery) {
      aiInsight = `An\xE1lisis Transformer ejecutado para "${searchQuery}": Los productos han sido filtrados y reordenados aplicando el vector de atenci\xF3n sobre especificaciones t\xE9cnicas y ofertas multi-tienda.`;
    }
    res.json({
      success: true,
      count: products.length,
      aiInsight,
      products
    });
  } catch (error) {
    console.error("Error in /api/search-products:", error);
    res.status(500).json({ success: false, error: error?.message || "Error processing search" });
  }
});
apiRouter.post("/search/intelligent", async (req, res) => {
  try {
    db.statsCounters.totalSearches++;
    const { prompt } = req.body || {};
    const query = (prompt || "").trim();
    if (!query) {
      return res.status(400).json({ success: false, error: "Por favor ingresa una necesidad o requerimiento." });
    }
    const allProducts = db.getProducts();
    const queryLower = query.toLowerCase();
    let detectedCategory = "all";
    if (queryLower.includes("juego") || queryLower.includes("gaming") || queryLower.includes("laptop") || queryLower.includes("pc") || queryLower.includes("computadora") || queryLower.includes("programar") || queryLower.includes("dise\xF1o 3d") || queryLower.includes("edicion") || queryLower.includes("render")) {
      detectedCategory = "computadoras";
    } else if (queryLower.includes("celular") || queryLower.includes("telefono") || queryLower.includes("smartphone") || queryLower.includes("camara") || queryLower.includes("redes") || queryLower.includes("bateria") || queryLower.includes("pantalla") || queryLower.includes("fotos")) {
      detectedCategory = "celulares";
    } else if (queryLower.includes("zapato") || queryLower.includes("tenis") || queryLower.includes("zapatilla") || queryLower.includes("correr") || queryLower.includes("running") || queryLower.includes("maraton") || queryLower.includes("amortiguacion") || queryLower.includes("caminar")) {
      detectedCategory = "zapatos";
    }
    let detectedNeed = "Optimizaci\xF3n balanceada de compra con alta rentabilidad";
    let explicitReqs = [];
    let implicitReqs = [];
    let rentabilityStrategy = "Ponderaci\xF3n equilibrada de costo-beneficio (QPI) y garant\xEDa en comercios certificados.";
    if (queryLower.includes("juego") || queryLower.includes("gaming") || queryLower.includes("pesado")) {
      detectedNeed = "Equipo de alto rendimiento gr\xE1fico para gaming exigente y multitarea pesada";
      explicitReqs = [
        "Potencia suficiente para ejecutar t\xEDtulos AAA modernos",
        "Capacidad de procesamiento gr\xE1fico intensivo sin ca\xEDdas de framerate"
      ];
      implicitReqs = [
        "GPU dedicada con arquitectura moderna (ej. NVIDIA GeForce RTX 4060 o superior)",
        "M\xEDnimo 16GB de memoria RAM DDR5 de alta frecuencia",
        "Sistema de refrigeraci\xF3n t\xE9rmica optimizado para sesiones prolongadas",
        "Almacenamiento SSD NVMe r\xE1pido (m\xEDnimo 512GB / 1TB)",
        "Pantalla con tasa de refresco igual o superior a 120Hz"
      ];
      rentabilityStrategy = "Se priorizan laptops con la mejor relaci\xF3n costo por frame (QPI alto), verificando precios en Amazon y Best Buy para evitar sobreprecios de distribuidores secundarios.";
    } else if (queryLower.includes("camara") || queryLower.includes("foto") || queryLower.includes("video")) {
      detectedNeed = "Dispositivo m\xF3vil enfocado en creaci\xF3n de contenido audiovisual y fotograf\xEDa";
      explicitReqs = [
        "Sistema de c\xE1maras avanzado para capturas de alta resoluci\xF3n",
        "Buena autonom\xEDa de bater\xEDa para jornadas intensas"
      ];
      implicitReqs = [
        "Sensor principal con estabilizaci\xF3n \xF3ptica de imagen (OIS)",
        "Grabaci\xF3n de video en 4K/60fps con amplio rango din\xE1mico",
        "Procesador de se\xF1al de imagen (ISP) con soporte de IA para fotograf\xEDa nocturna",
        "Bater\xEDa m\xEDnima de 5000 mAh con soporte de carga r\xE1pida",
        "Pantalla AMOLED/LTPO calibrada en color"
      ];
      rentabilityStrategy = "Se filtran opciones que ofrezcan sensores premium sin inflar el presupuesto con marcas de lujo innecesarias, aprovechando m\xEDnimos hist\xF3ricos en tiendas fiables.";
    } else if (queryLower.includes("correr") || queryLower.includes("maraton") || queryLower.includes("amortiguacion")) {
      detectedNeed = "Calzado deportivo para entrenamiento y resistencia de media/larga distancia";
      explicitReqs = [
        "Comodidad ergon\xF3mica para impactos continuos",
        "Amortiguaci\xF3n reactiva para protecci\xF3n articular"
      ];
      implicitReqs = [
        "Mediasuela con compuestos de \xFAltima generaci\xF3n (ZoomX, Fresh Foam X, Boost)",
        "Placa o estructura para estabilidad de pisada y retorno de energ\xEDa",
        "Upper de malla t\xE9cnica transpirable de secado r\xE1pido",
        "Suela exterior con goma de alta resistencia al desgaste por abrasi\xF3n"
      ];
      rentabilityStrategy = "Se seleccionan modelos con alta durabilidad evaluada por usuarios reales, contrastando precios entre tiendas oficiales y MercadoLibre con env\xEDo garantizado.";
    } else {
      detectedNeed = `Soluci\xF3n adaptada a requerimientos de ${detectedCategory === "all" ? "uso general" : detectedCategory}`;
      explicitReqs = [
        `Requisitos funcionales centrados en: "${query}"`,
        "B\xFAsqueda de la opci\xF3n m\xE1s econ\xF3mica dentro del est\xE1ndar de calidad"
      ];
      implicitReqs = [
        "Componentes fiables con bajo \xEDndice de devoluciones",
        "Garant\xEDa directa con el fabricante o comercio l\xEDder",
        "Rendimiento fluido para el rango de precio correspondiente"
      ];
      rentabilityStrategy = "Maximizaci\xF3n del \xEDndice QPI: equilibrio \xF3ptimo entre especificaciones reales, costo m\xEDnimo y reputaci\xF3n de la tienda.";
    }
    const ai = getGeminiClient();
    if (ai) {
      try {
        const geminiPrompt = `Analiza la siguiente necesidad de compra ingresada por un usuario:
"${query}"

Genera una respuesta en formato JSON estrictamente v\xE1lido con esta estructura:
{
  "detectedNeed": "resumen en 1 linea del objetivo del usuario",
  "explicitRequirements": ["req 1 expl\xEDcito", "req 2 expl\xEDcito"],
  "implicitRequirements": ["req t\xE9cnico impl\xEDcito 1", "req t\xE9cnico impl\xEDcito 2", "req t\xE9cnico impl\xEDcito 3"],
  "rentabilityStrategy": "justificaci\xF3n de c\xF3mo ahorrar dinero comprando en tiendas confiables"
}`;
        const resAI = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: geminiPrompt,
          config: {
            responseMimeType: "application/json"
          }
        });
        if (resAI.text) {
          const parsed = JSON.parse(resAI.text);
          if (parsed.detectedNeed) detectedNeed = parsed.detectedNeed;
          if (Array.isArray(parsed.explicitRequirements) && parsed.explicitRequirements.length > 0) {
            explicitReqs = parsed.explicitRequirements;
          }
          if (Array.isArray(parsed.implicitRequirements) && parsed.implicitRequirements.length > 0) {
            implicitReqs = parsed.implicitRequirements;
          }
          if (parsed.rentabilityStrategy) rentabilityStrategy = parsed.rentabilityStrategy;
        }
      } catch (err) {
        console.warn("Gemini intelligent parser error, using heuristic fallback:", err);
      }
    }
    const scoredProducts = allProducts.map((product) => {
      const sortedListings = [...product.listings].sort((a, b) => a.price - b.price);
      const bestOffer = sortedListings[0];
      const lowestPrice = bestOffer.price;
      let categoryAffinity = 60;
      if (detectedCategory === "all" || product.category === detectedCategory) {
        categoryAffinity = 100;
      }
      const productText = `${product.name} ${product.summary} ${product.brand} ${JSON.stringify(product.specs)}`.toLowerCase();
      let keywordHits = 0;
      const terms = queryLower.split(/\s+/).filter((t) => t.length > 2);
      terms.forEach((term) => {
        if (productText.includes(term)) keywordHits += 15;
      });
      let taskBonus = 0;
      if (detectedCategory === "computadoras") {
        const specs = product.specs;
        if (specs?.gpu && (specs.gpu.includes("RTX") || specs.gpu.includes("GeForce") || specs.gpu.includes("Radeon"))) {
          taskBonus += 25;
        }
        if (specs?.ram && (specs.ram.includes("16GB") || specs.ram.includes("32GB") || specs.ram.includes("DDR5"))) {
          taskBonus += 15;
        }
      }
      if (detectedCategory === "celulares") {
        const specs = product.specs;
        if (specs?.camera && (specs.camera.includes("50MP") || specs.camera.includes("200MP") || specs.camera.includes("OIS"))) {
          taskBonus += 20;
        }
      }
      const qpiWeight = product.qpiScore * 0.45;
      const trustWeight = bestOffer.rating / 5 * 20;
      const priceFactor = lowestPrice < 1500 ? 15 : 8;
      let rawScore = categoryAffinity * 0.25 + qpiWeight + trustWeight + keywordHits + taskBonus + priceFactor;
      const matchScore = Math.min(99, Math.max(68, Math.round(rawScore / 1.7)));
      let matchReason = `Cumple los requisitos impl\xEDcitos de rentabilidad con un QPI de ${product.qpiScore}/100 y la mejor oferta en ${bestOffer.merchantName} ($${lowestPrice} USD).`;
      if (detectedCategory === "computadoras" && product.specs?.gpu) {
        matchReason = `Excelente potencia gr\xE1fica con ${product.specs.gpu} y ${product.specs.processor}, ideal para juegos pesados y tareas complejas.`;
      } else if (detectedCategory === "celulares") {
        matchReason = `Gran equilibrio en c\xE1maras y bater\xEDa con \xEDndice QPI de ${product.qpiScore}/100, disponible con env\xEDo prioritario.`;
      } else if (detectedCategory === "zapatos") {
        matchReason = `Excelente amortiguaci\xF3n para carreras de fondo y m\xE1xima durabilidad avalada por compradores.`;
      }
      const prosForUser = [
        `Mejor precio disponible en ${bestOffer.merchantName}: $${lowestPrice} USD`,
        `\xCDndice QPI ${product.qpiScore}/100 (${product.valueGrade})`,
        bestOffer.verifiedMerchant ? "Comercio verificado con garant\xEDa directa" : "Venta con protecci\xF3n al comprador"
      ];
      return {
        product,
        bestOffer,
        matchScore,
        matchReason,
        prosForUser,
        rentabilityTag: product.qpiScore >= 90 ? "M\xE1xima Rentabilidad (A+)" : "Precio Bajo Recomendado"
      };
    });
    scoredProducts.sort((a, b) => b.matchScore - a.matchScore);
    const topRecommendations = scoredProducts.slice(0, 6);
    res.json({
      success: true,
      analysis: {
        userQuery: query,
        detectedNeed,
        explicitRequirements: explicitReqs,
        implicitRequirements: implicitReqs,
        rentabilityStrategy,
        suggestedCategory: detectedCategory,
        confidenceScore: 96
      },
      recommendations: topRecommendations
    });
  } catch (error) {
    console.error("Error in /api/search/intelligent:", error);
    res.status(500).json({ success: false, error: error.message || "Error en b\xFAsqueda inteligente" });
  }
});
apiRouter.post("/evaluate-custom", async (req, res) => {
  try {
    const { title, category, descriptionText, declaredPrice, imageUrl, sourceUrl } = req.body || {};
    if (!title) {
      return res.status(400).json({ success: false, error: "Product title is required" });
    }
    const ai = getGeminiClient();
    let extractedSpecs = {};
    let qualityScore = 88;
    let aiPros = ["Excelente dise\xF1o estructural", "Relaci\xF3n calidad-precio competitiva"];
    let aiCons = ["Disponibilidad limitada en algunas regiones"];
    let estimatedListings = [];
    if (ai) {
      try {
        const prompt = `Analiza el siguiente producto para la app OmniRank AI:
Nombre: "${title}"
Categor\xEDa: "${category || "celulares"}"
Descripci\xF3n/Specs proporcionadas: "${descriptionText || "No especificado"}"
Precio declarado: $${declaredPrice || 500} USD
Enlace de fuente: "${sourceUrl || "N/A"}"

Devuelve un objeto JSON estricto con esta estructura:
{
  "qualityScore": 88,
  "specs": {
    "processor": "...",
    "ram": "...",
    "storage": "...",
    "screen": "...",
    "camera": "...",
    "battery": "...",
    "os": "...",
    "buildMaterial": "..."
  },
  "aiPros": ["...", "..."],
  "aiCons": ["...", "..."],
  "estimatedListings": [
    {
      "merchantName": "Amazon",
      "price": 499,
      "originalPrice": 549,
      "shipping": "Env\xEDo Gratis Prime",
      "verifiedMerchant": true
    },
    {
      "merchantName": "MercadoLibre",
      "price": 510,
      "originalPrice": 550,
      "shipping": "Env\xEDo Gratis Full",
      "verifiedMerchant": true
    },
    {
      "merchantName": "eBay",
      "price": 485,
      "originalPrice": 530,
      "shipping": "Env\xEDo Est\xE1ndar",
      "verifiedMerchant": true
    }
  ]
}`;
        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json"
          }
        });
        if (response.text) {
          const parsed = JSON.parse(response.text.trim());
          if (parsed.qualityScore) qualityScore = Number(parsed.qualityScore);
          if (parsed.specs) extractedSpecs = parsed.specs;
          if (parsed.aiPros) aiPros = parsed.aiPros;
          if (parsed.aiCons) aiCons = parsed.aiCons;
          if (parsed.estimatedListings) estimatedListings = parsed.estimatedListings;
        }
      } catch (err) {
        console.warn("Gemini evaluation fallback:", err);
      }
    }
    if (Object.keys(extractedSpecs).length === 0) {
      if (category === "computadoras") {
        extractedSpecs = {
          processor: "Procesador multin\xFAcleo de alto rendimiento",
          ram: "16 GB RAM DDR5",
          storage: "512 GB SSD NVMe",
          gpu: "Gr\xE1ficos acelerados por hardware",
          screen: '15.6" IPS FHD High Refresh',
          batteryLife: "8 horas",
          weight: "1.8 kg",
          os: "Windows 11 / macOS"
        };
      } else if (category === "zapatos") {
        extractedSpecs = {
          material: "Malla t\xE9cnica transpirable de alta densidad",
          cushioning: "Espuma reactiva con retorno de energ\xEDa",
          soleType: "Caucho antiabrasi\xF3n tracci\xF3n multidireccional",
          drop: "8 mm",
          useCase: "Uso Diario, Running y Multideporte",
          weightPerShoe: "275g",
          breathabilityScore: 9,
          durabilityRating: 8
        };
      } else {
        extractedSpecs = {
          processor: "Procesador Octa-Core de arquitectura eficiente",
          ram: "8 GB / 12 GB LPDDR5",
          storage: "256 GB UFS 3.1",
          screen: '6.67" AMOLED 120Hz',
          camera: "50 MP con Estabilizaci\xF3n \xD3ptica (OIS)",
          battery: "5000 mAh + Carga R\xE1pida 67W",
          os: "Android 14",
          buildMaterial: "Cristal reforzado y marco de aleaci\xF3n"
        };
      }
    }
    if (estimatedListings.length === 0) {
      const price = Number(declaredPrice) || 350;
      estimatedListings = [
        {
          id: "custom-list-1",
          merchantName: "Amazon",
          merchantLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
          price,
          originalPrice: Math.round(price * 1.12),
          currency: "USD",
          rating: 4.7,
          reviewCount: 320,
          shipping: "Env\xEDo Gratis",
          stockStatus: "In Stock",
          productUrl: sourceUrl || "https://www.amazon.com",
          verifiedMerchant: true
        },
        {
          id: "custom-list-2",
          merchantName: "MercadoLibre",
          merchantLogo: "https://http2.mlstatic.com/frontend-assets/ui-navigation/5.22.13/mercadolibre/logo__large.png",
          price: Math.round(price * 1.04),
          originalPrice: Math.round(price * 1.15),
          currency: "USD",
          rating: 4.8,
          reviewCount: 190,
          shipping: "Env\xEDo Gratis Full",
          stockStatus: "In Stock",
          productUrl: sourceUrl || "https://www.mercadolibre.com",
          verifiedMerchant: true
        }
      ];
    } else {
      estimatedListings = estimatedListings.map((l, idx) => ({
        id: `custom-list-${idx}`,
        merchantName: l.merchantName || "Tienda En L\xEDnea",
        merchantLogo: l.merchantName === "Amazon" ? "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" : "https://http2.mlstatic.com/frontend-assets/ui-navigation/5.22.13/mercadolibre/logo__large.png",
        price: Number(l.price) || Number(declaredPrice) || 300,
        originalPrice: Number(l.originalPrice) || Math.round((Number(declaredPrice) || 300) * 1.1),
        currency: "USD",
        rating: 4.7,
        reviewCount: 250,
        shipping: l.shipping || "Env\xEDo Gratis",
        stockStatus: "In Stock",
        productUrl: sourceUrl || "#",
        verifiedMerchant: l.verifiedMerchant ?? true
      }));
    }
    const newProduct = {
      id: `evaluated-${Date.now()}`,
      name: title,
      brand: title.split(" ")[0] || "Generic",
      category: category || "celulares",
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      summary: `Evaluaci\xF3n de IA realizada para "${title}". Especificaciones extra\xEDdas mediante Transformer y clasificaci\xF3n de precio/calidad multi-tienda.`,
      overallRating: 4.7,
      totalReviewsCount: 380,
      qpiScore: 88,
      qualityScore,
      valueGrade: "A",
      lstmTrend: "STABLE",
      specs: extractedSpecs,
      listings: estimatedListings,
      priceHistory: [
        { date: "2026-05", amazonPrice: Math.round(declaredPrice * 1.1) },
        { date: "2026-06", amazonPrice: Math.round(declaredPrice * 1.05) },
        { date: "2026-07", amazonPrice: Math.round(declaredPrice * 1.02) },
        { date: "2026-08", amazonPrice: declaredPrice }
      ],
      aiPros,
      aiCons,
      targetAudience: "Usuarios en b\xFAsqueda de productos verificados por an\xE1lisis multimodelo.",
      transformerEmbeddings: [0.85, 0.88, 0.82, 0.9, 0.84, 0.87, 0.89, 0.86],
      cnnVisualFeatures: [0.87, 0.86, 0.89, 0.85, 0.88, 0.87, 0.86, 0.88],
      lstmHiddenState: [-0.03, -0.02, -0.04, -0.02]
    };
    const qpiData = calculateProductQPI(newProduct);
    newProduct.qpiScore = qpiData.qpiScore;
    newProduct.valueGrade = qpiData.grade;
    res.json({
      success: true,
      evaluatedProduct: newProduct
    });
  } catch (error) {
    console.error("Error in /api/evaluate-custom:", error);
    res.status(500).json({ success: false, error: error?.message || "Evaluation error" });
  }
});
apiRouter.post("/genetic-optimize", async (req, res) => {
  try {
    db.statsCounters.geneticOptimizationsRun++;
    const { criteria, params } = req.body || {};
    const result = runGeneticAlgorithm(criteria, params, INITIAL_PRODUCTS_DATASET);
    res.json({
      success: true,
      result
    });
  } catch (error) {
    console.error("Error in /api/genetic-optimize:", error);
    res.status(500).json({ success: false, error: error?.message || "Genetic algorithm execution error" });
  }
});
apiRouter.get("/download-project-zip", (req, res) => {
  const fs2 = __require("fs");
  const path2 = __require("path");
  const zipCandidates = [
    path2.join(process.cwd(), "dist", "omni-ia-project.zip"),
    path2.join(process.cwd(), "omni-ia-project.zip")
  ];
  for (const zipPath of zipCandidates) {
    if (fs2.existsSync(zipPath)) {
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", 'attachment; filename="omni-ia-project.zip"');
      return fs2.createReadStream(zipPath).pipe(res);
    }
  }
  res.status(404).json({ success: false, error: "Archivo zip no encontrado" });
});

// server/index.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var PORT = process.env.PORT || 3e3;
app.use(express.json());
app.use("/api", apiRouter);
var localDist = path.join(__dirname, "dist");
var parentDist = path.join(__dirname, "..", "dist");
var distPath = fs.existsSync(localDist) ? localDist : parentDist;
app.use(express.static(distPath));
app.get("*", (req, res) => {
  const indexHtml = path.join(distPath, "index.html");
  if (fs.existsSync(indexHtml)) {
    res.sendFile(indexHtml);
  } else {
    res.send("Omni.IA Server Active");
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
