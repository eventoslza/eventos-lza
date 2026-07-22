import { Rocket, Users, MapPin, Calendar, Ticket, Instagram, WhatsappIcon, Menu, Star, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-brand-black min-h-screen text-white selection:bg-brand-gold selection:text-black">
      
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-brand-gold/20 px-6 py-4 flex justify-between items-center">
        <img src="/logo-lza.png" alt="LZA" className="h-10 md:h-14" />
        <div className="hidden md:flex gap-8 font-bold uppercase text-xs tracking-widest">
          <a href="#eventos" className="hover:text-brand-gold transition">Eventos</a>
          <a href="/sobre" className="hover:text-brand-gold transition">Sobre Nós</a>
          <a href="/galeria" className="hover:text-brand-gold transition">Galeria</a>
          <a href="/contato" className="hover:text-brand-gold transition">Contato</a>
        </div>
        <button className="bg-brand-gold text-black px-6 py-2 rounded-full font-black text-xs uppercase hover:scale-105 transition shadow-[0_0_15px_rgba(212,175,55,0.3)]">
          Anuncie
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 scale-110 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black"></div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <div className="flex justify-center mb-6">
             <span className="bg-brand-gold/10 border border-brand-gold text-brand-gold px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase animate-bounce">
               O Foguete da Região 🚀
             </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black italic uppercase leading-none drop-shadow-2xl">
            CONECTANDO VOCÊ AOS <br/>
            <span className="text-brand-gold">MAIORES EVENTOS</span>
          </h1>
          <p className="text-gray-400 mt-6 text-sm md:text-xl uppercase tracking-[0.3em] font-light">
            A maior vitrine de entretenimento de Luziânia e Região
          </p>
          
          {/* GRANDE CONTADOR */}
          <div className="mt-12 inline-block bg-white/5 backdrop-blur-lg border-2 border-brand-gold p-8 rounded-[40px] shadow-[0_0_50px_rgba(212,175,55,0.15)]">
            <p className="text-brand-gold font-bold mb-4 uppercase tracking-tighter">Próximo Grande Evento: EXPOAGRO</p>
            <div className="flex gap-6 md:gap-12 text-3xl md:text-6xl font-mono font-black">
              <div>15 <span className="block text-[10px] text-gray-500 uppercase">Dias</span></div>
              <div className="text-brand-gold">:</div>
              <div>08 <span className="block text-[10px] text-gray-500 uppercase">Horas</span></div>
              <div className="text-brand-gold">:</div>
              <div>42 <span className="block text-[10px] text-gray-500 uppercase">Min</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* NÚMEROS DA EMPRESA */}
      <section className="py-20 bg-brand-dark">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Eventos Divulgados', val: '500+', icon: <Calendar className="text-brand-gold"/> },
            { label: 'Cidades Atendidas', val: '15+', icon: <MapPin className="text-brand-gold"/> },
            { label: 'Parceiros Oficiais', val: '120+', icon: <Star className="text-brand-gold"/> },
            { label: 'Credibilidade', val: '100%', icon: <ShieldCheck className="text-brand-gold"/> },
          ].map((stat, i) => (
            <div key={i} className="text-center p-8 rounded-3xl border border-white/5 bg-black/50 hover:border-brand-gold transition duration-500">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h2 className="text-4xl font-black text-white mb-2">{stat.val}</h2>
              <p className="text-gray-500 uppercase text-[10px] font-bold tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EVENTOS EM DESTAQUE */}
      <section id="eventos" className="py-20 container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black italic uppercase">Eventos em <span className="text-brand-gold">Destaque</span></h2>
            <div className="h-1 w-20 bg-brand-gold mt-2"></div>
          </div>
          <button className="text-brand-gold font-bold uppercase text-xs hover:underline">Ver Calendário Completo</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[1, 2, 3].map((item) => (
            <div key={item} className="group bg-brand-dark rounded-[35px] overflow-hidden border border-white/10 hover:border-brand-gold transition-all duration-500 shadow-2xl">
              <div className="relative h-80 overflow-hidden">
                <img src={`/banner-exemplo-${item}.jpg`} alt="Evento" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute top-6 left-6 bg-brand-gold text-black px-4 py-1 rounded-full text-[10px] font-black uppercase">Rodeio Show</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black uppercase italic leading-tight text-white group-hover:text-brand-gold transition">NOME DO EVENTO REGIONAL 2024</h3>
                <div className="flex items-center gap-2 text-gray-400 mt-4 text-sm font-medium">
                   <Calendar size={16} className="text-brand-gold" /> 25 de Agosto • 20:00h
                </div>
                <div className="flex items-center gap-2 text-gray-400 mt-2 text-sm font-medium">
                   <MapPin size={16} className="text-brand-gold" /> Parque de Exposições, Luziânia
                </div>
                
                <div className="mt-8 flex flex-col gap-3">
                  <button className="w-full bg-brand-gold text-black font-black py-4 rounded-2xl hover:bg-brand-goldLight transition shadow-lg flex items-center justify-center gap-2 uppercase tracking-tighter">
                    <Ticket size={18} /> Garantir Ingresso
                  </button>
                  <button className="w-full bg-white/5 text-white font-bold py-4 rounded-2xl border border-white/10 hover:bg-white/10 transition uppercase text-xs">
                    Saiba Mais Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER PREMIUM */}
      <footer className="bg-black py-20 border-t border-brand-gold/10">
        <div className="container mx-auto px-6 text-center">
          <img src="/logo-lza.png" alt="LZA" className="h-16 mx-auto mb-8 opacity-80" />
          <p className="text-gray-500 max-w-lg mx-auto mb-10 text-sm leading-relaxed">
            A maior vitrine de eventos de Luziânia e região. Transformamos a divulgação em sucesso de público. 
            Não fazemos cobertura, fazemos acontecer.
          </p>
          <div className="flex justify-center gap-6 mb-12">
            <a href="#" className="p-4 bg-brand-dark rounded-full border border-white/5 hover:border-brand-gold transition"><Instagram size={24} className="text-brand-gold"/></a>
            <a href="#" className="p-4 bg-brand-dark rounded-full border border-white/5 hover:border-brand-gold transition"><Rocket size={24} className="text-brand-gold"/></a>
          </div>
          <p className="text-[10px] text-gray-700 uppercase tracking-widest font-bold">
            © 2024 EVENTOS LZA • Desenvolvido para decolar a região
          </p>
        </div>
      </footer>

      {/* WHATSAPP FLUTUANTE */}
      <a href="https://wa.me/5562994319156" className="fixed bottom-10 right-10 z-50 bg-[#25D366] p-5 rounded-full shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:scale-110 transition transform active:scale-95">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-8 h-8" alt="WhatsApp" />
      </a>
    </div>
  );
}
