import { motion } from 'motion/react';
import { Briefcase, BarChart3, Users, Smartphone, ShieldCheck, Landmark } from 'lucide-react';

export default function BusinessVision() {
  const pillars = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Showroom Imersivo 360°",
      description: "Eliminamos a barreira da distância com tecnologia de visualização ultra-realista. O cliente explora cada detalhe do painel e estofamento sem sair de casa."
    },
    {
      icon: <Landmark className="w-6 h-6" />,
      title: "Financiamento Inteligente",
      description: "Parcerias estratégicas com financeiras para oferecer a 'Taxa Verde'. Simuladores em tempo real que provam a viabilidade econômica do elétrico."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Originação de Leads de Elite",
      description: "Não entregamos apenas nomes, entregamos intenções de compra. Leads com crédito pré-analisado e modelo configurado, prontos para o fechamento."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Ecossistema de Parcerias",
      description: "Conectamos montadoras, financeiras e instaladores de infraestrutura de carga em uma jornada única e fluida para o consumidor final."
    }
  ];

  return (
    <section id="vision" className="py-32 bg-zinc-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-600/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-900/5 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.3em] font-bold mb-4 block">
              Nossa Visão de Negócio
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
              Transformando a Intenção em <span className="text-blue-500">Realidade Digital</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              O VoltDrive não é apenas um site de classificados. É um hub de tecnologia desenhado para resolver a maior dor do mercado automotivo de luxo: a confiança na decisão de compra à distância.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-zinc-900/50 border border-white/5 rounded-3xl hover:border-blue-500/30 transition-all group"
            >
              <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{pillar.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-zinc-900 to-black p-12 rounded-[3rem] border border-white/10 text-center"
        >
          <div className="max-w-2xl mx-auto">
            <Briefcase className="w-12 h-12 text-blue-500 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-6">Oportunidade de Parceria</h3>
            <p className="text-zinc-400 mb-10 leading-relaxed">
              Estamos buscando parceiros estratégicos (Financeiras, Concessionárias e Investidores) que compartilham a visão de que o futuro da venda automotiva é digital, imersivo e orientado a dados.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-blue-600/20">
                Agendar Reunião Estratégica
              </button>
              <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 rounded-full font-bold transition-all">
                Baixar Pitch Deck
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
