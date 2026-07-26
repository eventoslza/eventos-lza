import { PrismaClient } from '@prisma/client'
import { Rocket, Instagram, MessageCircle, Calendar, MapPin, Ticket, ShieldCheck, Facebook, Youtube, ChevronRight } from 'lucide-react'

const prisma = new PrismaClient()

export default async function Home() {
  const eventos = await prisma.evento.findMany({ where: { ativo: true }, orderBy: { data: 'asc' } })
  const destaque = await prisma.evento.findFirst({ where: { destaque: true } })
  const apoiados = eventos.filter(e => e.apoiado)

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#FDB813] selection:text-black">
      
      {/* HEADER DA IMAGEM */}
      <nav className="fixed w-full z-50 bg-black/90 border-b border-[#FDB813]/20 px-4 md:px-10 py-3 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <img src="/logo-lza.png" alt="LZA" className="h-12" />
          <div className="hidden lg:flex gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <a href="#" className="hover:text-[#FDB813]">Início</a>
            <a href="#" className="hover:text-[#FDB813]">Eventos</a>
            <a href="#" className="hover:text-[#FDB813]">Eventos Apoiados</a>
            <a href="#" className="hover:text-[#FDB813]">Sobre</a>
            <a href="#" className="hover:text-[#FDB813]">Contato</a>
          </div>
        </div>
        <button className="bg-[#FDB813] text-black px-5 py-2 rounded-lg font-black text-[10px] uppercase">Anuncie Conosco</button>
      </nav>

      {/* HERO SECTION (O FOGUETE DA REGIÃO) */}
      <section className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="text-left flex-1">
          <div className="flex items-center gap-2 mb-4 text-[#FDB813] font-bold text-xs">
            <img src="/logo-lza.png" className="h-6 grayscale brightness-200" /> EVENTOS LZA – REGIÃO –
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase leading-none mb-6">
            O FOGUETE DA <br/> <span className="text-[#FDB813]">REGIÃO 🚀</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-sm mb-8">Divulgando os melhores eventos de Luziânia e região com velocidade e qualidade.</p>
          <div className="flex gap-4 mb-10">
            <button className="bg-[#FDB813] text-black px-8 py-3 rounded-xl font-bold uppercase text-xs shadow-lg">Ver Calendário</button>
            <button className="border border-white/20 px-8 py-3 rounded-xl font-bold uppercase text-xs">Anuncie</button>
          </div>
          <div className="flex gap-4 text-gray-500">
            <Instagram size={18} /> <MessageCircle size={18} /> <Facebook size={18} /> <Youtube size={18} />
          </div>
        </div>

        {/* QUADRO DE CONTAGEM REGRESSIVA (DA IMAGEM) */}
        <div className="w-full max-w-sm bg-[#111] border-2 border-[#FDB813] rounded-[40px] p-8 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Rocket size={100} /></div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">Próximo Grande Evento</p>
          <div className="flex justify-around text-4xl font-black italic mb-2">
            <div>48 <span className="block text-[8px] not-italic text-gray-600">DIAS</span></div>
            <div className="text-[#FDB813]">:</div>
            <div>05 <span className="block text-[8px] not-italic text-gray-600">HORAS</span></div>
            <div className="text-[#FDB813]">:</div>
            <div>14 <span className="block text-[8px] not-italic text-gray-600">MIN</span></div>
          </div>
          <p className="text-[#FDB813] font-bold text-xs mt-4">EXPOAGRO 2026</p>
        </div>
      </section>

      {/* PRÓXIMOS EVENTOS (CARDS) */}
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-black italic border-l-4 border-[#FDB813] pl-3 uppercase">Próximos Eventos</h2>
          <button className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">Ver Todos <ChevronRight size={14}/></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {eventos.slice(0, 4).map(ev => (
            <div key={ev.id} className="bg-[#111] rounded-3xl overflow-hidden border border-white/5 hover:border-[#FDB813]/30 transition group">
              <img src={ev.banner} className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition" />
              <div className="p-5 text-center">
                <h4 className="font-black uppercase italic text-sm mb-4">{ev.nome}</h4>
                <div className="text-[10px] text-gray-500 space-y-1 mb-6 uppercase font-bold">
                  <p>{new Date(ev.data).toLocaleDateString()}</p>
                  <p>{ev.cidade}</p>
                </div>
                <button className="w-full border border-[#FDB813] text-[#FDB813] py-2 rounded-xl text-[10px] font-bold uppercase hover:bg-[#FDB813] hover:text-black transition flex items-center justify-center gap-2">
                  <Ticket size={12}/> Ingressos
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EVENTOS APOIADOS */}
      <section className="px-6 py-10 max-w-7xl mx-auto mb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-black italic border-l-4 border-[#FDB813] pl-3 uppercase">Eventos Apoiados</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {apoiados.map(ev => (
            <div key={ev.id} className="bg-gradient-to-br from-zinc-900 to-black p-5 rounded-[30px] border border-[#FDB813]/20 flex items-center gap-4">
              <img src={ev.banner} className="w-20 h-20 rounded-full border-2 border-[#FDB813] object-cover" />
              <div>
                <div className="bg-[#FDB813] text-black text-[7px] font-black px-2 py-0.5 rounded-full inline-block mb-1">APOIADO PELA EVENTOS LZA</div>
                <h4 className="font-bold text-sm uppercase">{ev.nome}</h4>
                <p className="text-[10px] text-gray-500 uppercase">{ev.cidade}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER DA IMAGEM */}
      <footer className="bg-black border-t border-[#FDB813]/10 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <img src="/logo-lza.png" className="h-10 mb-6" />
            <p className="text-gray-500 text-xs leading-relaxed italic">O foguete da região! 🚀 Divulgando os melhores eventos de Luziânia e região.</p>
          </div>
          <div>
            <h5 className="font-black uppercase text-xs mb-6 text-[#FDB813]">Navegação</h5>
            <ul className="text-xs text-gray-500 space-y-3 font-bold uppercase tracking-tighter">
              <li>Início</li><li>Eventos</li><li>Apoiados</li><li>Sobre</li>
            </ul>
          </div>
          <div>
            <h5 className="font-black uppercase text-xs mb-6 text-[#FDB813]">Contato</h5>
            <ul className="text-xs text-gray-500 space-y-3 font-bold uppercase tracking-tighter">
              <li>(61) 9 9999-9999</li>
              <li>contato@eventoslza.com.br</li>
              <li>Luziânia - Goiás</li>
            </ul>
          </div>
          <div className="text-center">
            <h5 className="font-black uppercase text-xs mb-6 text-[#FDB813]">Siga-nos</h5>
            <div className="flex justify-center gap-4 text-[#FDB813]">
              <Instagram size={24} /> <MessageCircle size={24} /> <Facebook size={24} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
