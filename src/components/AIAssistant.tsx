import { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { BYD_CARS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function AIAssistant() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Olá! Sou seu consultor digital VoltDrive. Qual seu perfil de uso? Posso te ajudar a escolher o BYD ideal para sua rotina.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const carContext = BYD_CARS.map(c => 
        `${c.name} (${c.category}): R$ ${c.price}, Autonomia ${c.range}km, 0-100 em ${c.acceleration}. ${c.description}`
      ).join('\n');

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: `Você é um consultor especialista em carros elétricos da BYD para a plataforma VoltDrive. 
          Seu objetivo é ajudar o usuário a escolher o melhor carro baseado nas necessidades dele.
          Use os seguintes dados dos carros disponíveis:
          ${carContext}
          
          Regras:
          1. Seja profissional, tecnológico e entusiasmado com mobilidade elétrica.
          2. Responda em Português do Brasil.
          3. Se o usuário perguntar sobre preços ou autonomia, use os dados fornecidos.
          4. Tente sempre recomendar um dos modelos da lista.
          5. Mantenha as respostas concisas e úteis.`,
        },
      });

      const assistantMessage = response.text || 'Desculpe, tive um problema ao processar sua resposta. Pode repetir?';
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Ops! Ocorreu um erro na conexão com meu cérebro digital.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-assistant" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Sparkles className="text-blue-500" />
              Consultoria Inteligente
            </h2>
            <p className="text-zinc-400">Tire suas dúvidas sobre autonomia, carregamento e qual modelo combina com você.</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="h-[500px] overflow-y-auto p-6 flex flex-col gap-4 scrollbar-hide">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-4 rounded-2xl flex gap-3 ${
                      m.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-zinc-800 text-zinc-200 rounded-tl-none'
                    }`}>
                      {m.role === 'assistant' && <Bot className="w-5 h-5 shrink-0 text-blue-400" />}
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                      {m.role === 'user' && <User className="w-5 h-5 shrink-0 text-blue-200" />}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 p-4 rounded-2xl rounded-tl-none flex gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-zinc-800/50 border-t border-zinc-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ex: Qual o melhor carro para quem viaja muito?"
                  className="flex-grow bg-zinc-900 border border-zinc-700 text-white rounded-full px-6 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-3 rounded-full transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
