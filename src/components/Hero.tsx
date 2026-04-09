import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1920&auto=format&fit=crop"
          alt="BYD Future"
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-blue-400 font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
            O Futuro é Elétrico
          </span>
          <h1 className="text-6xl md:text-8xl font-sans font-bold text-white tracking-tighter mb-6">
            Volt<span className="text-blue-500">Drive</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 font-light leading-relaxed">
            "Tecnologia Dedicada que proporciona uma <span className="text-white font-medium">Experiência Digital</span> que informa, emociona, e se transforma em <span className="text-white font-medium">Experiência Real</span>."
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all transform hover:scale-105"
            >
              Explorar Modelos
            </button>
            <button 
              onClick={() => document.getElementById('ai-assistant')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full font-medium backdrop-blur-sm transition-all"
            >
              Consultor IA
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent mx-auto" />
      </motion.div>
    </section>
  );
}
