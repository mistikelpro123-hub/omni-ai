import React, { useState } from 'react';
import { GenerationSnapshot } from '../types/product';

interface GeneticConvergenceChartProps {
  history: GenerationSnapshot[];
  currentGenIndex?: number;
  convergedAtGen?: number;
}

export const GeneticConvergenceChart: React.FC<GeneticConvergenceChartProps> = ({
  history,
  currentGenIndex,
  convergedAtGen
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!history || history.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-slate-500 text-xs italic bg-slate-900/50 rounded-xl border border-slate-800">
        Ejecuta el algoritmo genético para visualizar la curva de convergencia en tiempo real.
      </div>
    );
  }

  const activeHistory = currentGenIndex !== undefined
    ? history.slice(0, currentGenIndex + 1)
    : history;

  const width = 680;
  const height = 210;
  const padding = { top: 20, right: 30, bottom: 30, left: 45 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const totalPoints = Math.max(history.length, 2);
  const minFitness = 20;
  const maxFitness = 100;

  const getX = (idx: number) => padding.left + (idx / (totalPoints - 1)) * chartW;
  const getY = (val: number) => padding.top + chartH - ((Math.min(100, Math.max(minFitness, val)) - minFitness) / (maxFitness - minFitness)) * chartH;

  // Generate path data for Best Fitness
  const bestPoints = activeHistory.map((s, idx) => `${getX(idx)},${getY(s.bestFitness)}`).join(' ');
  const bestPath = activeHistory.length > 0
    ? `M ${activeHistory.map((s, idx) => `${getX(idx)},${getY(s.bestFitness)}`).join(' L ')}`
    : '';

  // Generate path data for Average Fitness
  const avgPath = activeHistory.length > 0
    ? `M ${activeHistory.map((s, idx) => `${getX(idx)},${getY(s.averageFitness)}`).join(' L ')}`
    : '';

  // Area under best fitness curve
  const areaPath = activeHistory.length > 0
    ? `${bestPath} L ${getX(activeHistory.length - 1)},${getY(minFitness)} L ${getX(0)},${getY(minFitness)} Z`
    : '';

  const activeHoverData = hoveredIndex !== null && activeHistory[hoveredIndex]
    ? activeHistory[hoveredIndex]
    : activeHistory[activeHistory.length - 1];

  return (
    <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div>
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <span>Curva de Convergencia y Aptitud (Fitness)</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
              Generación {activeHistory.length} / {history.length}
            </span>
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Evolución de la aptitud máxima y promedio de la población a través de las generaciones
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-emerald-400 rounded-full inline-block shadow-sm shadow-emerald-400/50"></span>
            <span className="text-slate-300 font-medium">Fitness Máximo (Élite)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-indigo-400 rounded-full inline-block"></span>
            <span className="text-slate-400">Fitness Promedio</span>
          </div>
          {convergedAtGen && (
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-pulse"></span>
              <span className="text-amber-300 text-[11px]">Meseta: Gen {convergedAtGen}</span>
            </div>
          )}
        </div>
      </div>

      {/* SVG Container */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto select-none overflow-visible"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            <linearGradient id="bestFitnessArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="bestStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[20, 40, 60, 80, 100].map(val => (
            <g key={val}>
              <line
                x1={padding.left}
                y1={getY(val)}
                x2={width - padding.right}
                y2={getY(val)}
                stroke="#334155"
                strokeDasharray="3 3"
                strokeOpacity={0.4}
              />
              <text
                x={padding.left - 8}
                y={getY(val) + 3}
                fill="#64748b"
                fontSize="10"
                textAnchor="end"
                fontFamily="monospace"
              >
                {val}
              </text>
            </g>
          ))}

          {/* Area fill */}
          {areaPath && (
            <path d={areaPath} fill="url(#bestFitnessArea)" />
          )}

          {/* Average Fitness Line */}
          {avgPath && (
            <path
              d={avgPath}
              fill="none"
              stroke="#818cf8"
              strokeWidth="2"
              strokeDasharray="4 2"
              opacity="0.85"
            />
          )}

          {/* Best Fitness Line */}
          {bestPath && (
            <path
              d={bestPath}
              fill="none"
              stroke="url(#bestStroke)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Converged Marker vertical dashed line */}
          {convergedAtGen && convergedAtGen <= activeHistory.length && (
            <g>
              <line
                x1={getX(convergedAtGen - 1)}
                y1={padding.top}
                x2={getX(convergedAtGen - 1)}
                y2={height - padding.bottom}
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                opacity="0.8"
              />
              <circle
                cx={getX(convergedAtGen - 1)}
                cy={getY(activeHistory[convergedAtGen - 1]?.bestFitness || 80)}
                r="4"
                fill="#f59e0b"
                stroke="#0f172a"
                strokeWidth="1.5"
              />
            </g>
          )}

          {/* Interactive points & hover columns */}
          {activeHistory.map((s, idx) => (
            <rect
              key={idx}
              x={getX(idx) - (chartW / totalPoints) / 2}
              y={padding.top}
              width={chartW / totalPoints}
              height={chartH}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIndex(idx)}
            />
          ))}

          {/* Active Hover Marker */}
          {hoveredIndex !== null && activeHistory[hoveredIndex] && (
            <g>
              <line
                x1={getX(hoveredIndex)}
                y1={padding.top}
                x2={getX(hoveredIndex)}
                y2={height - padding.bottom}
                stroke="#94a3b8"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <circle
                cx={getX(hoveredIndex)}
                cy={getY(activeHistory[hoveredIndex].bestFitness)}
                r="5"
                fill="#10b981"
                stroke="#0f172a"
                strokeWidth="2"
              />
              <circle
                cx={getX(hoveredIndex)}
                cy={getY(activeHistory[hoveredIndex].averageFitness)}
                r="4"
                fill="#818cf8"
                stroke="#0f172a"
                strokeWidth="2"
              />
            </g>
          )}

          {/* X axis labels */}
          <text
            x={padding.left}
            y={height - 8}
            fill="#64748b"
            fontSize="10"
            fontFamily="monospace"
          >
            Gen 1
          </text>
          <text
            x={width / 2}
            y={height - 8}
            fill="#64748b"
            fontSize="10"
            textAnchor="middle"
            fontFamily="monospace"
          >
            Generación {Math.floor(history.length / 2)}
          </text>
          <text
            x={width - padding.right}
            y={height - 8}
            fill="#64748b"
            fontSize="10"
            textAnchor="end"
            fontFamily="monospace"
          >
            Gen {history.length}
          </text>
        </svg>

        {/* Hover Snapshot Metric Box */}
        {activeHoverData && (
          <div className="mt-2.5 pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <span className="font-mono text-slate-300">
              Gen {activeHoverData.generation}:
            </span>
            <div className="flex items-center gap-4">
              <span>
                Máx Fitness: <strong className="text-emerald-400 font-mono">{activeHoverData.bestFitness}</strong>/100
              </span>
              <span>
                Promedio: <strong className="text-indigo-300 font-mono">{activeHoverData.averageFitness}</strong>
              </span>
              <span>
                Diversidad: <strong className="text-slate-300 font-mono">{activeHoverData.diversityIndex}</strong>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
