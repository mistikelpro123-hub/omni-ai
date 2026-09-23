import React, { useState } from 'react';
import { Network, Cpu, Layers, Activity, Server, Code2, Zap, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Database, BarChart3 } from 'lucide-react';
import { Product } from '../types/product';

interface ArchitectureExplainerProps {
  selectedProduct?: Product | null;
}

export const ArchitectureExplainer: React.FC<ArchitectureExplainerProps> = ({ selectedProduct }) => {
  const [selectedLayer, setSelectedLayer] = useState<'transformer' | 'cnn' | 'lstm' | 'mlScorer'>('transformer');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Title & Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800/80 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Network className="w-4 h-4 text-cyan-400" />
            <span>Sustentación Teórica & Arquitectura Híbrida IA</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight leading-tight">
            Combinación de Redes Neuronal: <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Transformers + CNN + LSTM + ML Scorer</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            <strong className="text-cyan-300">Omni.IA</strong> no depende de una sola técnica de IA. Combina cuatro arquitecturas complementarias para resolver el problema multidimensional de clasificar Celulares, Computadoras y Zapatos en múltiples tiendas en línea en base a especificaciones, historial de precios, imagen y reseñas.
          </p>
        </div>
      </div>

      {/* Interactive Neural Network Pipeline Flowchart */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              <span>Flujo de Inferencia en la Red Híbrida</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Haz clic en cualquier etapa para inspeccionar la formulación matemática y dimensiones del tensor.
            </p>
          </div>
          <span className="text-xs text-cyan-400 font-mono font-bold bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
            Pipeline Forward Pass
          </span>
        </div>

        {/* Pipeline Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Node 1: Transformer */}
          <button
            onClick={() => setSelectedLayer('transformer')}
            className={`p-4 rounded-xl text-left border transition-all relative ${
              selectedLayer === 'transformer'
                ? 'bg-cyan-950/60 border-cyan-500 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-cyan-400 font-mono uppercase">Etapa 1 • Text & Specs</span>
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="font-bold text-slate-100 text-sm">Transformer (Gemini 3.6)</h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              Atención Multicabeza para búsqueda semántica y extracción de specs.
            </p>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-500 font-mono">
              Tensor: [Batch, SeqLen, 768]
            </div>
          </button>

          {/* Node 2: CNN */}
          <button
            onClick={() => setSelectedLayer('cnn')}
            className={`p-4 rounded-xl text-left border transition-all relative ${
              selectedLayer === 'cnn'
                ? 'bg-indigo-950/60 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-indigo-400 font-mono uppercase">Etapa 2 • Vision</span>
              <Layers className="w-4 h-4 text-indigo-400" />
            </div>
            <h3 className="font-bold text-slate-100 text-sm">Red Convolucional (CNN)</h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              Extracción de mapas de características visuales en imágenes de producto.
            </p>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-500 font-mono">
              Tensor: [Batch, 512, 7, 7]
            </div>
          </button>

          {/* Node 3: LSTM */}
          <button
            onClick={() => setSelectedLayer('lstm')}
            className={`p-4 rounded-xl text-left border transition-all relative ${
              selectedLayer === 'lstm'
                ? 'bg-emerald-950/60 border-emerald-500 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-emerald-400 font-mono uppercase">Etapa 3 • Sequence</span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="font-bold text-slate-100 text-sm">Red Recurrente LSTM</h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              Modelado de secuencias temporales en precios multi-tienda a 6 meses.
            </p>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-500 font-mono">
              Tensor: [Batch, TimeSteps, 128]
            </div>
          </button>

          {/* Node 4: Gradient Boosting / ML Scorer */}
          <button
            onClick={() => setSelectedLayer('mlScorer')}
            className={`p-4 rounded-xl text-left border transition-all relative ${
              selectedLayer === 'mlScorer'
                ? 'bg-amber-950/60 border-amber-500 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-amber-400 font-mono uppercase">Etapa 4 • Scoring</span>
              <BarChart3 className="w-4 h-4 text-amber-400" />
            </div>
            <h3 className="font-bold text-slate-100 text-sm">Clasificador ML & QPI</h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              Ponderación vectorial para calcular el índice Calidad-Precio (QPI Index).
            </p>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-500 font-mono">
              Salida: QPI Score (0-100)
            </div>
          </button>

        </div>

        {/* Selected Layer Detailed Deep-Dive Card */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
          {selectedLayer === 'transformer' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">1. Arquitectura Transformer (Atención Multicabeza)</h3>
                  <p className="text-xs text-cyan-400 font-mono">Procesamiento de Lenguaje Natural & Extracción Zero-Shot</p>
                </div>
              </div>

              <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <p>
                  <strong>Por qué se usa:</strong> Los datos de tiendas como Amazon, MercadoLibre o Best Buy contienen descripciones no estructuradas ("iPhone 16 Pro Max Titanio 256GB 5G"). La arquitectura Transformer procesa esta secuencia de texto para estandarizar las especificaciones (Procesador, RAM, Amortiguación, Pantalla) y comprender la intención del usuario.
                </p>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg font-mono text-[11px] text-cyan-300 overflow-x-auto">
                  Attention(Q, K, V) = softmax( (Q * K^T) / sqrt(d_k) ) * V
                </div>
                <p>
                  El mecanismo de <em>Self-Attention</em> permite asociar palabras distantes en la búsqueda (ejemplo: "laptop" con "para programar y editar 4K") y ponderar las especificaciones relevantes.
                </p>
              </div>
            </div>
          )}

          {selectedLayer === 'cnn' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">2. Red Neuronal Convolucional (CNN)</h3>
                  <p className="text-xs text-indigo-400 font-mono">Análisis Visual de Calidad & Atractivo Estructural</p>
                </div>
              </div>

              <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <p>
                  <strong>Por qué se usa:</strong> Los compradores evalúan visualmente los productos (acabados de titanio en celulares, grosor del bisel en laptops, o geometría de la suela en zapatos). La CNN aplica filtros convolucionales 2D para extraer un vector de características visuales (v_vision).
                </p>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg font-mono text-[11px] text-indigo-300 overflow-x-auto">
                  f_(i,j) = Activation( sum( W * X_(i,j) ) + b )
                </div>
                <p>
                  Permite estimar la autenticidad visual y calidad percibida antes de integrar el puntaje en la recomendación final.
                </p>
              </div>
            </div>
          )}

          {selectedLayer === 'lstm' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">3. Red Recurrente LSTM (Long Short-Term Memory)</h3>
                  <p className="text-xs text-emerald-400 font-mono">Predicción Temporal de Precios & Detección de Descuentos Reales</p>
                </div>
              </div>

              <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <p>
                  <strong>Por qué se usa:</strong> Las ofertas en línea suelen ser engañosas (aumentos de precio previos a un descuento). Las redes LSTM utilizan puertas de olvido, entrada y salida para analizar las series temporales de precios de los últimos 6 meses en Amazon, eBay y MercadoLibre.
                </p>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg font-mono text-[11px] text-emerald-300 overflow-x-auto">
                  f_t = sigmoid( W_f * [h_(t-1), x_t] + b_f ), c_t = f_t * c_(t-1) + i_t * c_hat_t
                </div>
                <p>
                  Predice si el precio del producto bajará en los próximos 30 días o si se encuentra en su mínimo histórico.
                </p>
              </div>
            </div>
          )}

          {selectedLayer === 'mlScorer' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">4. Clasificador ML & Algoritmo QPI (Calidad-Precio)</h3>
                  <p className="text-xs text-amber-400 font-mono">Ponderación Multicriterio & Generación del Ranking Final</p>
                </div>
              </div>

              <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <p>
                  <strong>Por qué se usa:</strong> Combina las salidas heterogéneas de las redes anteriores (Embeddings de specs, características visuales de la CNN y predicción de precio de la LSTM) con el precio real y las valoraciones de los usuarios.
                </p>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg font-mono text-[11px] text-amber-300 overflow-x-auto">
                  QPI = w_p * Score_precio + w_r * Score_rating + w_q * Score_calidad + w_t * Score_tienda
                </div>
                <p>
                  Asigna una calificación transparente de 0 a 100 y una letra de valor (A+, A, B+, B, C).
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sustentación de Lenguaje y Framework */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Framework Justification */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-400">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">Sustentación del Framework & Lenguaje</h3>
              <p className="text-xs text-slate-400">TypeScript + Express + React 19 + Node.js</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p>
                <strong>TypeScript:</strong> Garantiza estricto tipado estático en la estructura de productos, especificaciones heterogéneas y tensores de salida de las redes.
              </p>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p>
                <strong>Express & Node.js Server:</strong> Proporciona un entorno full-stack unificado para ejecutar llamadas seguras al SDK de Gemini (<code>@google/genai</code>) del lado del servidor sin exponer claves API al navegador.
              </p>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p>
                <strong>React 19 & Tailwind CSS:</strong> Permite renderizar tableros reactivos ultra fluidos, gráficos comparativos de precios y recalculado instantáneo de hiperparámetros.
              </p>
            </div>
          </div>
        </div>

        {/* Free Platform Compliance Justification */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 rounded-xl text-emerald-400">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">Sustentación de Plataformas Gratuitas</h3>
              <p className="text-xs text-slate-400">Cumplimiento Mandatorio de Costo $0 USD</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p>
                <strong>Despliegue en Cloud Run (Free Tier):</strong> La APP ejecuta contenedores Node.js ligeros dentro de los límites de nivel gratuito de infraestructura serverless.
              </p>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p>
                <strong>Gemini API Tier Gratuito:</strong> Utiliza el modelo <code>gemini-3.6-flash</code> optimizado para búsquedas y extracción estructurada sin incurrir en costos de inferencia.
              </p>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p>
                <strong>Cálculo de Tensores en Cliente:</strong> Las matrices de puntuación QPI y predicción recurrente se procesan en la memoria del navegador para máxima eficiencia sin servidores dedicados de GPU costosos.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
