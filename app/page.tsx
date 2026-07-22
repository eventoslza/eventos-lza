// app/page.tsx
import { Rocket, Calendar, MapPin, Share2, Ticket } from 'lucide-react';
import './globals.css';
export default function Home() {
  return (
    <div className="bg-lza-black text-white min-h-screen font-sans">
      {/* NAVBAR MOBILE-FIRST */}
      <nav className="p-4 flex justify-between items-center border-b border-lza-gold/20 sticky top-0 bg-black/90 z-50">
        <img src="/logo-lza.png" className="h-10" alt="LZA" />
        <button className="bg-lza-gold text-black px-4 py-2 rounded-full font-black text-xs uppercase">Anuncie</button>
      </nav>

      {/* HERO SECTION */}
      <section className="relative py-16 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-lza-gold/5 blur-3xl rounded-full" />
        <Rocket className="mx-auto text-lza-gold mb-4 animate-bounce" size={40} />
        <h1 className="text-4xl font-black italic uppercase leading-none">
          Conectando você aos <span className="text-lza-gold">Maiores Eventos</span>
        </h1>
        <p className="mt-4 text-gray-400 text-sm uppercase tracking-widest">A maior vitrine de entretenimento de Luziânia e Região</p>
      </section>

      {/* CONTADOR EXPOAGRO (DIFERENCIAL) */}
      <div className="mx-6 p-6 bg-gradient-to-br from-lza-dark to-black border-2 border-lza-gold rounded-3xl text-center shadow-[0_0_20px_rgba(253,184,19,0.2)]">
        <h2 className="text-lza-gold font-black italic mb-4 uppercase">Contagem Regressiva: EXPOAGRO</h2>
        <div className="flex justify-around text-2xl font-mono font-bold">
          <div>15 <span className="block text-[10px] uppercase text-gray-500">Dias</span></div>
          <div>08 <span className="block text-[10px] uppercase text-gray-500">Horas</span></div>
          <div>42 <span className="block text-[10px] uppercase text-gray-500">Min</span></div>
        </div>
      </div>

      {/* LISTA DE EVENTOS DIVULGADOS */}
      <section className="p-6 space-y-8">
        <h3 className="text-xl font-black italic border-l-4 border-lza-gold pl-3 uppercase">Eventos <span className="text-lza-gold">Em Destaque</span></h3>
        
        {/* Card de Exemplo */}
        <div className="bg-lza-dark rounded-3xl overflow-hidden border border-white/5">
          <div className="relative h-60">
            <img src="/banner-rodeio.jpg" className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 bg-lza-red text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase">Rodeio</div>
          </div>
          <div className="p-6">
            <h4 className="text-2xl font-black italic text-white uppercase">Rodeio Show 2024</h4>
            <div className="flex items-center gap-2 text-gray-400 text-sm mt-2"><Calendar size={14}/> 20 de Julho • 21:00h</div>
            <div className="flex items-center gap-2 text-gray-400 text-sm"><MapPin size={14}/> Parque de Exposições, Luziânia</div>
            
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button className="bg-lza-gold text-black font-black py-3 rounded-xl text-xs uppercase flex items-center justify-center gap-2">
                <Ticket size={16}/> Ingressos
              </button>
              <button className="bg-white/5 text-white font-bold py-3 rounded-xl text-xs uppercase flex items-center justify-center gap-2">
                <Share2 size={16}/> Divulgar
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
