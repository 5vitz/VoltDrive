import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator, TrendingDown, Calendar, Wallet } from 'lucide-react';

interface FinancingSimulatorProps {
  price: number;
  onClose?: () => void;
}

export default function FinancingSimulator({ price }: FinancingSimulatorProps) {
  const [downPaymentPercent, setDownPaymentPercent] = useState(30);
  const [months, setMonths] = useState(48);
  const [interestRate] = useState(0.99); // 0.99% a.m. (Taxa Verde)

  const downPayment = (price * downPaymentPercent) / 100;
  const amountToFinance = price - downPayment;
  
  // PMT formula: [i * (1+i)^n] / [(1+i)^n - 1] * PV
  const i = interestRate / 100;
  const n = months;
  const monthlyPayment = amountToFinance * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);

  const fuelSavings = 600; // Estimated monthly savings vs gas

  return (
    <div className="bg-zinc-900/80 backdrop-blur-md border border-blue-500/20 rounded-2xl p-6 mt-4">
      <div className="flex items-center gap-2 mb-6 text-blue-400">
        <Calculator className="w-5 h-5" />
        <h4 className="font-bold uppercase text-xs tracking-widest">Simulador de Financiamento Verde</h4>
      </div>

      <div className="space-y-6">
        {/* Down Payment Slider */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs text-zinc-400 uppercase tracking-wider">Entrada: {downPaymentPercent}%</label>
            <span className="text-sm font-mono text-white">R$ {downPayment.toLocaleString('pt-BR')}</span>
          </div>
          <input
            type="range"
            min="10"
            max="80"
            step="5"
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Months Selection */}
        <div>
          <label className="text-xs text-zinc-400 uppercase tracking-wider mb-3 block">Prazo (Meses)</label>
          <div className="grid grid-cols-4 gap-2">
            {[24, 36, 48, 60].map((m) => (
              <button
                key={m}
                onClick={() => setMonths(m)}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  months === m ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'
                }`}
              >
                {m}x
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="bg-black/40 rounded-xl p-4 border border-white/5">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Parcela Mensal</p>
              <p className="text-2xl font-bold text-white font-mono">
                R$ {monthlyPayment.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-green-500 uppercase tracking-widest mb-1">Taxa Especial</p>
              <p className="text-sm font-bold text-green-400">{interestRate}% a.m.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <TrendingDown className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-blue-200 leading-relaxed">
              Com a economia de combustível (est. R$ {fuelSavings}/mês), sua parcela efetiva cai para 
              <span className="font-bold ml-1">R$ {(monthlyPayment - fuelSavings).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</span>.
            </p>
          </div>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group">
          <Wallet className="w-4 h-4" />
          Pré-Aprovar Crédito
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </button>
      </div>
    </div>
  );
}
