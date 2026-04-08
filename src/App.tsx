/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car } from './types';
import { BYD_CARS } from './constants';
import Hero from './components/Hero';
import CarCard from './components/CarCard';
import AIAssistant from './components/AIAssistant';
import LeadForm from './components/LeadForm';
import CarVisualizer from './components/CarVisualizer';
import BusinessVision from './components/BusinessVision';
import { ShieldCheck, Zap, Globe, Menu, X } from 'lucide-react';

export default function App() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [visualizingCar, setVisualizingCar] = useState<Car | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tighter">VoltDrive</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#catalog" className="hover:text-white transition-colors">Modelos</a>
            <a href="#benefits" className="hover:text-white transition-colors">Vantagens</a>
            <a href="#vision" className="hover:text-white transition-colors">Visão</a>
            <a href="#ai-assistant" className="hover:text-white transition-colors">Consultoria IA</a>
            <a href="#vision" className="bg-white text-black px-5 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all">
              Seja um Parceiro
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 flex flex-col gap-6 md:hidden"
          >
            <a href="#catalog" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold">Modelos</a>
            <a href="#benefits" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold">Vantagens</a>
            <a href="#ai-assistant" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold">Consultoria IA</a>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Hero />

        {/* Catalog Section */}
        <section id="catalog" className="py-24 bg-black">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-xl">
                <h2 className="text-5xl font-bold tracking-tight mb-4">Showroom Digital</h2>
                <p className="text-zinc-500">Explore a linha completa BYD. Do compacto urbano ao sedan de luxo, temos o elétrico perfeito para você.</p>
              </div>
              <div className="flex gap-2">
                <button className="px-6 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-sm hover:bg-zinc-800 transition-colors">Todos</button>
                <button className="px-6 py-2 text-zinc-500 text-sm hover:text-white transition-colors">SUV</button>
                <button className="px-6 py-2 text-zinc-500 text-sm hover:text-white transition-colors">Sedan</button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {BYD_CARS.map((car) => (
                <CarCard 
                  key={car.id} 
                  car={car} 
                  onSelect={(c: Car) => setSelectedCar(c)} 
                  onView360={(c: Car) => setVisualizingCar(c)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-24 bg-zinc-950 border-y border-zinc-900">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
                  <ShieldCheck className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Garantia Certificada</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Todos os veículos passam por uma inspeção rigorosa de 250 itens antes de serem listados em nossa plataforma.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
                  <Zap className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Carregamento Rápido</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Consultoria completa para instalação de wallbox em sua residência ou condomínio, garantindo energia sempre pronta.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
                  <Globe className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Sustentabilidade Real</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Reduza sua pegada de carbono a zero enquanto desfruta de uma tecnologia de ponta e economia de combustível.
                </p>
              </div>
            </div>
          </div>
        </section>

        <AIAssistant />

        <BusinessVision />

        {/* CTA Section */}
        <section className="py-24 bg-blue-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          </div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Pronto para o próximo nível?</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Junte-se a milhares de brasileiros que já fizeram a transição para a BYD. 
              Economia, silêncio e potência em um só lugar.
            </p>
            <button className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-xl">
              Falar com um Especialista
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 py-20 border-t border-zinc-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white fill-current" />
                </div>
                <span className="text-xl font-bold tracking-tighter">VoltDrive</span>
              </div>
              <p className="text-zinc-500 max-w-sm leading-relaxed">
                VoltDrive é uma plataforma independente de consultoria e intermediação digital para veículos BYD. 
                Não somos uma concessionária oficial, mas sim seu parceiro na jornada elétrica.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-zinc-400">Links Rápidos</h4>
              <ul className="space-y-4 text-zinc-500 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Como Funciona</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog de Mobilidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-zinc-400">Contato</h4>
              <ul className="space-y-4 text-zinc-500 text-sm">
                <li>contato@voltdrive.com.br</li>
                <li>0800 123 4567</li>
                <li>São Paulo, SP - Brasil</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-900 text-center text-zinc-600 text-xs">
            © 2026 VoltDrive Digital Showroom. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Lead Form Modal */}
      <AnimatePresence>
        {selectedCar && (
          <LeadForm 
            selectedCar={selectedCar} 
            onClose={() => setSelectedCar(null)} 
          />
        )}
      </AnimatePresence>

      {/* 360 Visualizer Modal */}
      <AnimatePresence>
        {visualizingCar && (
          <CarVisualizer
            car={visualizingCar}
            onClose={() => setVisualizingCar(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
