import { Rocket, Users, MapPin, Calendar, Ticket, Instagram, MessageCircle, Menu, Star, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white font-sans">
      
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-yellow-600/20 px-6 py-4 flex justify-between items-center">
        <img src="/logo-lza.png" alt="LZA" className="h-10 md:h-14" />
        <div className="hidden md:flex gap-8 font-bold uppercase text-xs tracking-widest">
          <a href="#eventos" className="hover:text-yellow-500 transition">Eventos</a>
          <a href="#" className="hover:text-yellow-500 transition">Sobre Nós</a>
          <a href="#" className="hover:text-yellow-500 transition">Galeria</a>
          <a href="#" className="hover:text-yellow-500 transition">Contato</a>
        </div>
        <button className="bg-yellow-500 text-black px-6 py-2 rounded-full font-black text-xs uppercase hover:scale-105 transition shadow-lg">
          Anuncie
        </button>
      </nav>

      {/* HERO SECTION - BANNER PRINCIPAL */}
      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10"></div>
        <div className="relative z-20 text-center px-4 max-w-5xl">
          <div className="flex justify-center mb-6">
             <span className="bg-yellow-500/10 border border-yellow-500 text-yellow-500 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase animate-bounce">
               O Foguete da Região 🚀
             </span>
          </div>
          <h1 className="text-4xl md:text-8xl font-black italic uppercase leading-none">
            CONECTANDO VOCÊ AOS <br/>
            <span className="text-yellow-500">MAIORES EVENTOS</span>
          </h1>
          <p className="text-gray-400 mt-6 text-sm md:text-xl uppercase tracking-[0.3em] font-light">
            A maior vitrine de entretenimento de Luziânia e Região
          </p>
          
          {/* CONTADOR DO PRÓXIMO GRANDE EVENTO */}
          <div className="mt-12 inline-block bg-white/5 backdrop-blur-lg border-2 border-yellow-500 p-6 md:p-8 rounded-[30px] shadow-2xl">
            <p className="text-yellow-500 font-bold mb-4 uppercase text-xs tracking-tighter">Próximo Grande Evento: EXPOAGRO</p>
            <div className="flex gap-4 md:gap-10 text-2xl md:text-6xl font-mono font-black">
              <div>15 <span className="block text-[10px] text-gray-500 uppercase">Dias</span></div>
              <div className="text-yellow-500">:</div>
              <div>08 <span className="block text-[10px] text-gray-500 uppercase">Horas</span></div>
              <div className="text-yellow-500">:</div>
              <div>42 <span className="block text-[10px] text-gray-500 uppercase">Min</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* NÚMEROS DA EMPRESA (ANIMADOS) */}
      <section className="py-16 bg-zinc-900/50">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Eventos Divulgados', val: '500+', icon: <Calendar className="text-yellow-500"/> },
            { label: 'Cidades Atendidas', val: '15+', icon: <MapPin className="text-yellow-500"/> },
            { label: 'Parceiros Oficiais', val: '120+', icon: <Star className="text-yellow-500"/> },
            { label: 'Credibilidade', val: '100%', icon: <ShieldCheck className="text-yellow-500"/> },
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-2xl border border-white/5 bg-black/50">
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <h2 className="text-2xl md:text-4xl font-black text-white">{stat.val}</h2>
              <p className="text-gray-500 uppercase text-[8px] md:text-[10px] font-bold tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO DE EVENTOS EM DESTAQUE */}
      <section id="eventos" className="py-20 container mx-auto px-6">
        <h2 className="text-3xl font-black italic uppercase mb-12 border-l-4 border-yellow-500 pl-4">Eventos em <span className="text-yellow-500">Destaque</span></h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="group bg-zinc-900 rounded-[30px] overflow-hidden border border-white/10 hover:border-yellow-500 transition-all duration-500">
            <div className="relative h-64 overflow-hidden">
              <img src="/banner-rodeio.jpg" alt="Evento" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase">Rodeio</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-black uppercase italic text-white group-hover:text-yellow-500 transition">RODEIO SHOW 2024</h3>
              <p className="text-gray-400 text-sm mt-2 font-medium">Parque de Exposições, Luziânia</p>
              <div className="mt-6">
                <button className="w-full bg-yellow-500 text-black font-black py-3 rounded-xl hover:bg-yellow-400 transition flex items-center justify-center gap-2 uppercase text-xs">
                  <Ticket size={16} /> Comprar Ingresso
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - RODAPÉ */}
      <footer className="bg-black py-12 border-t border-white/10 text-center px-6">
        <img src="/logo-lza.png" alt="LZA" className="h-10 mx-auto mb-6 opacity-50" />
        <p className="text-gray-400 text-sm mb-4">eventosluziania.regiao02@gmail.com</p>
        <div className="flex justify-center gap-6 mb-8">
          <a href="https://instagram.com/eventoslza.oficial" className="text-yellow-500 hover:text-white transition"><Instagram size={24}/></a>
          <a href="https://wa.me/5562994319156" className="text-yellow-500 hover:text-white transition"><MessageCircle size={24}/></a>
        </div>
        <p className="text-[10px] text-gray-600 uppercase tracking-widest">© 2024 EVENTOS LZA • CONECTANDO A REGIÃO</p>
      </footer>

      {/* BOTÃO FLUTUANTE WHATSAPP */}
      <a href="https://wa.me/5562994319156" className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-2xl z-50 hover:scale-110 transition-transform">
        <MessageCircle size={28} color="white" />
      </a>
    </div>
  );
}
