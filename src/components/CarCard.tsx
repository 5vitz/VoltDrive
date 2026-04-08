import { useState } from 'react';
import { Car } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Gauge, MapPin, ChevronRight, Rotate3d, Calculator } from 'lucide-react';
import FinancingSimulator from './FinancingSimulator';

interface CarCardProps {
  car: Car;
  onSelect: (car: Car) => void;
  onView360: (car: Car) => void;
  key?: string;
}

export default function CarCard({ car, onSelect, onView360 }: CarCardProps) {
  const [showFinancing, setShowFinancing] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col h-full"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {car.category}
        </div>
        
        {/* 360 View Overlay Button */}
        <button
          onClick={() => onView360(car)}
          className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md hover:bg-blue-600 text-white p-3 rounded-full transition-all transform hover:scale-110 border border-white/10 group/360"
        >
          <Rotate3d className="w-5 h-5 group-hover/360:rotate-180 transition-transform duration-500" />
        </button>
      </div>

      <div className="p-8 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{car.name}</h3>
            <p className="text-zinc-500 text-sm">{car.model}</p>
          </div>
          <div className="text-right">
            <p className="text-blue-400 font-mono font-bold text-lg">
              R$ {car.price.toLocaleString('pt-BR')}
            </p>
            <p className="text-zinc-600 text-xs uppercase tracking-widest">Preço Estimado</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-zinc-400">
            <Zap className="w-4 h-4 text-blue-500" />
            <span className="text-sm">{car.acceleration} (0-100)</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <Gauge className="w-4 h-4 text-blue-500" />
            <span className="text-sm">{car.range}km Autonomia</span>
          </div>
        </div>

        <p className="text-zinc-400 text-sm mb-8 line-clamp-2 leading-relaxed">
          {car.description}
        </p>

        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFinancing(!showFinancing)}
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                showFinancing ? 'text-blue-400' : 'text-zinc-500 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4" />
              {showFinancing ? 'Ocultar Simulação' : 'Simular Financiamento'}
            </button>
            <button
              onClick={() => onSelect(car)}
              className="flex items-center gap-2 text-white font-medium hover:text-blue-400 transition-colors group/btn"
            >
              Detalhes
              <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>

          <AnimatePresence>
            {showFinancing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <FinancingSimulator price={car.price} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
