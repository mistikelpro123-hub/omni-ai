import React, { useState } from 'react';
import { PlusCircle, Sparkles, ExternalLink, Smartphone, Laptop, Footprints, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ProductCategory, Product } from '../types/product';

interface CustomProductEvaluatorProps {
  onAddEvaluatedProduct: (product: Product) => void;
  onNavigateSearch: () => void;
}

export const CustomProductEvaluator: React.FC<CustomProductEvaluatorProps> = ({
  onAddEvaluatedProduct,
  onNavigateSearch
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProductCategory>('celulares');
  const [declaredPrice, setDeclaredPrice] = useState<number>(499);
  const [descriptionText, setDescriptionText] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [evaluatedResult, setEvaluatedResult] = useState<Product | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage('Por favor ingresa el nombre del producto.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setEvaluatedResult(null);

    try {
      const response = await fetch('/api/evaluate-custom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          declaredPrice,
          descriptionText,
          sourceUrl,
          imageUrl
        })
      });

      const data = await response.json();

      if (data.success && data.evaluatedProduct) {
        setEvaluatedResult(data.evaluatedProduct);
        onAddEvaluatedProduct(data.evaluatedProduct);
      } else {
        setErrorMessage(data.error || 'No se pudo realizar la evaluación.');
      }
    } catch (err: any) {
      console.error('Custom evaluation failed:', err);
      setErrorMessage('Error de conexión con el servidor de IA.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-3 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950 border border-amber-800 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <PlusCircle className="w-4 h-4 text-amber-400" />
          <span>Evaluador de Producto Custom / URL Externa</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-100">
          Clasifica Cualquier Celular, Computadora o Zapato con IA
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
          Ingresa los datos o el enlace de cualquier producto de la web. La arquitectura Transformer extraerá las especificaciones y calculará su puntaje QPI multitienda.
        </p>
      </div>

      {/* Form Container */}
      <form onSubmit={handleEvaluate} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
        
        {errorMessage && (
          <div className="p-4 bg-red-950/80 border border-red-800 text-red-300 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Product Name */}
        <div className="space-y-1.5 text-xs">
          <label className="font-bold text-slate-300">Nombre o Modelo del Producto <span className="text-amber-400">*</span></label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Xiaomi 14 Ultra 5G / Nike Vaporfly 3 / Dell XPS 16 Laptop"
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            required
          />
        </div>

        {/* Category & Declared Price Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">Categoría Objetivo</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ProductCategory)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <option value="celulares">📱 Celular / Smartphone</option>
              <option value="computadoras">💻 Computadora / Laptop</option>
              <option value="zapatos">👟 Zapato / Footwear</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">Precio Declarado ($ USD)</label>
            <input
              type="number"
              value={declaredPrice}
              onChange={(e) => setDeclaredPrice(Number(e.target.value))}
              min="10"
              max="10000"
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Source URL & Optional Image URL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">Enlace de la Tienda (Opcional)</label>
            <input
              type="url"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="https://www.amazon.com/dp/..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">URL de Imagen (Opcional)</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Raw Description / Technical Specs */}
        <div className="space-y-1.5 text-xs">
          <label className="font-bold text-slate-300">Especificaciones o Descripción del Vendedor</label>
          <textarea
            value={descriptionText}
            onChange={(e) => setDescriptionText(e.target.value)}
            rows={4}
            placeholder="Pega aquí el texto con procesador, RAM, pantalla, material de suela o detalles para que el Transformer los extraiga..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:outline-none leading-relaxed"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/10 transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Ejecutando Inferencia Transformer + ML Scorer...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Evaluar Producto & Agregar a la Base de Datos</span>
            </>
          )}
        </button>

      </form>

      {/* Evaluated Product Result Banner */}
      {evaluatedResult && (
        <div className="p-6 bg-slate-900 border-2 border-emerald-500/50 rounded-2xl space-y-4 shadow-2xl animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Evaluación Exitosa por Transformer + ML
            </span>
            <span className="text-xs font-black text-slate-950 bg-emerald-400 px-2.5 py-0.5 rounded">
              QPI Score: {evaluatedResult.qpiScore}/100
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img src={evaluatedResult.imageUrl} alt={evaluatedResult.name} className="w-24 h-24 object-cover rounded-xl border border-slate-800 shrink-0" />
            <div className="space-y-1 text-xs text-slate-300">
              <h3 className="text-base font-bold text-slate-100">{evaluatedResult.name}</h3>
              <p className="text-slate-400 line-clamp-2">{evaluatedResult.summary}</p>
              <div className="pt-2 flex items-center gap-3">
                <span className="text-cyan-400 font-extrabold text-sm">
                  ${Math.min(...evaluatedResult.listings.map(l => l.price))} USD
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">
                  Calculado para {evaluatedResult.listings.length} tiendas hipotéticas.
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onNavigateSearch}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
          >
            <span>Ver Producto Agregado en la Galería General</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      )}

    </div>
  );
};
