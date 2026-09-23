import React from 'react';
import { Sliders, RotateCcw, Sparkles, Trophy, Award, Smartphone, Laptop, Footprints } from 'lucide-react';
import { MLWeights, Product } from '../types/product';
import { calculateProductQPI } from '../services/mlScoringEngine';

interface LabWeightsTunerProps {
  weights: MLWeights;
  setWeights: React.Dispatch<React.SetStateAction<MLWeights>>;
  onResetWeights: () => void;
  products: Product[];
}

export const LabWeightsTuner: React.FC<LabWeightsTunerProps> = ({
  weights,
  setWeights,
  onResetWeights,
  products
}) => {

  // Recalculate ranks for the current weights
  const scoredProducts = products.map(p => {
    const qpi = calculateProductQPI(p, weights);
    return {
      ...p,
      customQPI: qpi.qpiScore,
      customGrade: qpi.grade
    };
  }).sort((a, b) => b.customQPI - a.customQPI);

  const topPhone = scoredProducts.find(p => p.category === 'celulares');
  const topLaptop = scoredProducts.find(p => p.category === 'computadoras');
  const topShoe = scoredProducts.find(p => p.category === 'zapatos');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-3 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <Sliders className="w-4 h-4 text-emerald-400" />
          <span>Laboratorio de Hiperparámetros ML</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-100">
          Ajuste Dinámico de Pesos para el Algoritmo QPI
        </h1>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          Modifica los coeficientes del vector de ponderación para re-clasificar los productos según tus prioridades personales (Ahorro, Rendimiento Máximo o Confianza).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sliders Box */}
        <div className="lg:col-span-1 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Matriz de Pesos (Vector $W$)</span>
            </h3>
            <button
              onClick={onResetWeights}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all text-xs flex items-center gap-1"
              title="Restablecer valores predeterminados"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-5 text-xs">
            {/* Price Weight */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-slate-300">Ahorro y Precio ($w_p$):</span>
                <span className="text-emerald-400 font-mono text-sm">{weights.priceWeight}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={weights.priceWeight}
                onChange={(e) => setWeights(prev => ({ ...prev, priceWeight: Number(e.target.value) }))}
                className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">Premia productos con menor precio dentro de su categoría.</p>
            </div>

            {/* Rating Weight */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-slate-300">Valoraciones de Usuarios ($w_r$):</span>
                <span className="text-emerald-400 font-mono text-sm">{weights.ratingWeight}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={weights.ratingWeight}
                onChange={(e) => setWeights(prev => ({ ...prev, ratingWeight: Number(e.target.value) }))}
                className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">Pondera la satisfacción promedio de compradores verificados.</p>
            </div>

            {/* Quality Weight */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-slate-300">Calidad de Materiales ($w_q$):</span>
                <span className="text-emerald-400 font-mono text-sm">{weights.qualityWeight}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={weights.qualityWeight}
                onChange={(e) => setWeights(prev => ({ ...prev, qualityWeight: Number(e.target.value) }))}
                className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">Valora titanio, cristal Gorilla, suela Vibram y disipación.</p>
            </div>

            {/* Specs Weight */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-slate-300">Especificaciones Técnicas ($w_s$):</span>
                <span className="text-emerald-400 font-mono text-sm">{weights.specsWeight}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={weights.specsWeight}
                onChange={(e) => setWeights(prev => ({ ...prev, specsWeight: Number(e.target.value) }))}
                className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">Fuerza bruta de CPU, GPU, RAM, Cámaras y Espuma de impacto.</p>
            </div>

            {/* Merchant Trust Weight */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-slate-300">Confianza de Tiendas ($w_t$):</span>
                <span className="text-emerald-400 font-mono text-sm">{weights.merchantTrustWeight}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={weights.merchantTrustWeight}
                onChange={(e) => setWeights(prev => ({ ...prev, merchantTrustWeight: Number(e.target.value) }))}
                className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">Verificación de vendedores y garantías de envío gratis.</p>
            </div>
          </div>
        </div>

        {/* Live Top Winners by Category */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>Ganadores de Categoría Según tus Pesos Actuales</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Phone Winner */}
              {topPhone && (
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs font-bold text-cyan-400">
                    <span className="flex items-center gap-1"><Smartphone className="w-3.5 h-3.5" /> Celular Top</span>
                    <span className="bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">QPI: {topPhone.customQPI}</span>
                  </div>
                  <img src={topPhone.imageUrl} alt={topPhone.name} className="w-full h-28 object-cover rounded-lg" />
                  <div>
                    <h4 className="font-bold text-slate-100 text-xs line-clamp-1">{topPhone.name}</h4>
                    <span className="text-xs text-emerald-400 font-extrabold mt-0.5 block">
                      ${Math.min(...topPhone.listings.map(l => l.price))} USD
                    </span>
                  </div>
                </div>
              )}

              {/* Laptop Winner */}
              {topLaptop && (
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-400">
                    <span className="flex items-center gap-1"><Laptop className="w-3.5 h-3.5" /> Laptop Top</span>
                    <span className="bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">QPI: {topLaptop.customQPI}</span>
                  </div>
                  <img src={topLaptop.imageUrl} alt={topLaptop.name} className="w-full h-28 object-cover rounded-lg" />
                  <div>
                    <h4 className="font-bold text-slate-100 text-xs line-clamp-1">{topLaptop.name}</h4>
                    <span className="text-xs text-emerald-400 font-extrabold mt-0.5 block">
                      ${Math.min(...topLaptop.listings.map(l => l.price))} USD
                    </span>
                  </div>
                </div>
              )}

              {/* Shoe Winner */}
              {topShoe && (
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                    <span className="flex items-center gap-1"><Footprints className="w-3.5 h-3.5" /> Zapatos Top</span>
                    <span className="bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">QPI: {topShoe.customQPI}</span>
                  </div>
                  <img src={topShoe.imageUrl} alt={topShoe.name} className="w-full h-28 object-cover rounded-lg" />
                  <div>
                    <h4 className="font-bold text-slate-100 text-xs line-clamp-1">{topShoe.name}</h4>
                    <span className="text-xs text-emerald-400 font-extrabold mt-0.5 block">
                      ${Math.min(...topShoe.listings.map(l => l.price))} USD
                    </span>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Complete Ranking Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="font-bold text-slate-100 text-sm">
              Ranking General Recalculado ({scoredProducts.length} Productos)
            </h3>

            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950 text-xs">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-3">Pos.</th>
                    <th className="p-3">Producto</th>
                    <th className="p-3">Categoría</th>
                    <th className="p-3">Precio Mín</th>
                    <th className="p-3">Puntaje QPI Ajustado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {scoredProducts.map((prod, index) => (
                    <tr key={prod.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="p-3 font-mono font-bold text-slate-500">#{index + 1}</td>
                      <td className="p-3 font-bold text-slate-200">{prod.name}</td>
                      <td className="p-3 capitalize text-slate-400">{prod.category}</td>
                      <td className="p-3 font-mono text-cyan-400 font-bold">${Math.min(...prod.listings.map(l => l.price))} USD</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 rounded-md font-bold text-xs bg-slate-900 border border-cyan-500/30 text-cyan-300">
                          {prod.customQPI} / 100 ({prod.customGrade})
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
