import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Send } from 'lucide-react';
import { Car } from '../types';

interface LeadFormProps {
  selectedCar: Car | null;
  onClose: () => void;
}

export default function LeadForm({ selectedCar, onClose }: LeadFormProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend
    console.log('Lead captured:', { ...formData, carId: selectedCar?.id });
    setStep('success');
  };

  if (!selectedCar) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {step === 'form' ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={selectedCar.image} 
                    alt={selectedCar.name} 
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">Interesse no {selectedCar.name}</h3>
                    <p className="text-blue-400 text-sm">{selectedCar.model}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1">Nome Completo</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1">E-mail</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1">Telefone</label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1">Mensagem (Opcional)</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white h-24 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      placeholder="Tenho interesse em um test-drive..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Solicitar Orçamento
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-white mb-2">Solicitação Enviada!</h3>
                <p className="text-zinc-400 mb-8">
                  Um de nossos consultores VoltDrive entrará em contato em breve para dar continuidade ao seu sonho elétrico.
                </p>
                <button
                  onClick={onClose}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3 rounded-full transition-colors"
                >
                  Fechar
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
