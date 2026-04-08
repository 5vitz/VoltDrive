import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Rotate3d, Palette, Info, Image as ImageIcon, Box } from 'lucide-react';
import { Car } from '../types';
import Car3DView from './Car3DView';

interface CarVisualizerProps {
  car: Car;
  onClose: () => void;
}

const ANGLES = [
  { id: 'front', label: 'Frente', suffix: '?q=80&w=1200&auto=format&fit=crop&auto=compress' },
  { id: 'side', label: 'Lateral', suffix: '?q=80&w=1200&auto=format&fit=crop&auto=compress&sat=-100' },
  { id: 'back', label: 'Traseira', suffix: '?q=80&w=1200&auto=format&fit=crop&auto=compress&hue=200' },
  { id: 'interior', label: 'Interior', suffix: '?q=80&w=1200&auto=format&fit=crop&auto=compress&blur=2' },
];

const COLORS = [
  { name: 'Branco Neve', hex: '#FFFFFF' },
  { name: 'Cinza Cosmos', hex: '#4A4A4A' },
  { name: 'Azul Oceano', hex: '#1E3A8A' },
  { name: 'Preto Noite', hex: '#000000' },
];

export default function CarVisualizer({ car, onClose }: CarVisualizerProps) {
  const [activeAngle, setActiveAngle] = useState(ANGLES[0]);
  const [activeColor, setActiveColor] = useState(COLORS[0]);
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="container mx-auto px-6 h-full flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center py-8 border-b border-white/10">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Rotate3d className="text-blue-500" />
              Showroom Imersivo
            </h2>
            <p className="text-zinc-500">{car.name} — {activeColor.name}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-zinc-900 p-1 rounded-xl flex border border-white/5">
              <button
                onClick={() => setViewMode('2d')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  viewMode === '2d' ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                FOTOS
              </button>
              <button
                onClick={() => setViewMode('3d')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  viewMode === '3d' ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:text-white'
                }`}
              >
                <Box className="w-4 h-4" />
                3D REAL-TIME
              </button>
            </div>
            <button 
              onClick={onClose}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main Viewport */}
        <div className="flex-grow flex flex-col lg:flex-row items-center justify-center gap-12 py-12">
          <div className="relative w-full lg:w-2/3 aspect-video rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.1)]">
            {viewMode === '2d' ? (
              <>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeAngle.id + activeColor.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    src={car.image + activeAngle.suffix}
                    alt={`${car.name} ${activeAngle.label}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                
                {/* Angle Controls Overlay */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10">
                  {ANGLES.map((angle) => (
                    <button
                      key={angle.id}
                      onClick={() => setActiveAngle(angle)}
                      className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                        activeAngle.id === angle.id 
                          ? 'bg-blue-600 text-white' 
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {angle.label}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <Car3DView />
            )}
          </div>

          {/* Configurator Sidebar */}
          <div className="w-full lg:w-1/3 flex flex-col gap-8">
            <div className="bg-zinc-900/50 border border-white/10 p-8 rounded-3xl">
              <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                <Palette className="w-5 h-5 text-blue-500" />
                Cores Externas
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setActiveColor(color)}
                    className={`group flex flex-col items-center gap-2 transition-transform hover:scale-110`}
                  >
                    <div 
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        activeColor.name === color.name ? 'border-blue-500 scale-110 shadow-lg shadow-blue-500/20' : 'border-white/10'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className={`text-[10px] uppercase tracking-tighter ${
                      activeColor.name === color.name ? 'text-blue-400' : 'text-zinc-500'
                    }`}>
                      {color.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 p-8 rounded-3xl">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500" />
                Destaques Técnicos
              </h3>
              <ul className="space-y-3">
                {car.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-zinc-400 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full bg-white text-black font-bold py-5 rounded-2xl hover:bg-blue-500 hover:text-white transition-all transform hover:-translate-y-1">
              Reservar este modelo
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
