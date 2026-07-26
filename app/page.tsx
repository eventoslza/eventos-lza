import { PrismaClient } from '@prisma/client'
import { Rocket, Instagram, MessageCircle, Calendar, MapPin, Ticket, ShieldCheck, Facebook, Youtube, ChevronRight } from 'lucide-react'

const prisma = new PrismaClient()

export default async function Home() {
  const eventos = await prisma.evento.findMany({ where: { ativo: true }, orderBy: { data: 'asc' } })
  const destaque = await prisma.evento.findFirst({ where: { destaque: true } })
  const apoiados = eventos.filter(e => e.apoiado)

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#FDB813] selection:text-black">
      
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-black/90 border-b border-[#FDB813]/20 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-10">
          <img src="/logo-lza.png" alt="LZA" className="h-10 md:h-14" />
          <div className="hidden lg:flex gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <a href="#" className="hover:text-[#FDB813]">Início</a>
            <a href="#eventos" className="hover:text-[#FDB813]">Eventos</a>
            <a href="#" className="hover:text-[#FDB813]">Sobre</a>
            <a href="#" className="hover:text-[#FDB813]">Contato</a>
          </div>
        </div>
        <button className="bg-[#FDB813] text-black px-6 py-2 rounded-lg font-black text-[10px] uppercase shadow-[0_0_15px_rgba(253,184,19,0.3)]">Anuncie Conosco</button>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4 text-[#FDB813] font-bold text-xs uppercase tracking-tighter">
            <img src="/logo-lza.png" className="h-5 grayscale brightness-200" /> EVENTOS LZA – REGIÃO –
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase leading-none mb-6">
            O FOGUETE DA <br/> <span className="text-[#FDB813]">REGIÃO 🚀</span>
          </h1>
          <p className="text-gray-500 text-sm max-w-sm mb-8 leading-relaxed font-medium">Divulgando os melhores eventos de Luziânia e região com velocidade e qualidade.</p>
          <div className="flex gap-4 mb-8">
            <button className="bg-[#FDB813] text-black px-8 py-3 rounded-xl font-bold uppercase text-xs">Ver Calendário</button>
            <button className="border border-white/20 px-8 py-3 rounded-xl font-bold uppercase text-xs">Anuncie</button>
          </div>
          <div className="flex gap-4 text-gray-500">
            <Instagram size={18} /> <MessageCircle size={18} /> <Facebook size={18} /> <Youtube size={18} />
          </div>
        </div>

        {/* CONTADOR (IDÊNTICO À ARTE) */}
        <div className="w-full max-w-sm bg-[#111] border-2 border-[#FDB813] rounded-[40px] p-8 text-center shadow-2xl relative overflow-hidden">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-6">Próximo Grande Evento</p>
          <div className="flex justify-around text-4xl font-black italic mb-2">
            <div>48 <span className="block text-[8px] not-italic text-gray-600">DIAS</span></div>
            <div className="text-[#FDB813]">:</div>
            <div>05 <span className="block text-[8px] not-italic text-gray-600">HORAS</span></div>
            <div className="text-[#FDB813]">:</div>
            <div>14 <span className="block text-[8px] not-italic text-gray-600">MIN</span></div>
          </div>
          <p className="text-[#FDB813] font-bold text-xs mt-6 uppercase tracking-widest">{destaque?.nome || 'EXPOAGRO 2026'}</p>
        </div>
      </section>

      {/* EVENTOS APOIADOS */}
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <h2 className="text-xl font-black italic border-l-4 border-[#FDB813] pl-3 uppercase mb-10">Eventos Apoiados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {apoiados.map(ev => (
            <div key={ev.id} className="bg-[#111] p-5 rounded-[30px] border border-[#FDB813]/20 flex items-center gap-4">
              <img src={ev.banner} className="w-16 h-16 rounded-full border-2 border-[#FDB813] object-cover" />
              <div>
                <div className="bg-[#FDB813] text-black text-[7px] font-black px-2 py-0.5 rounded-full inline-block mb-1">APOIADO PELA EVENTOS LZA</div>
                <h4 className="font-bold text-sm uppercase">{ev.nome}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-[#FDB813]/10 py-16 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div><img src="/logo-lza.png" className="h-10 mb-6" /><p className="text-gray-600 text-xs italic">O foguete da região! 🚀</p></div>
          <div><h5 className="font-black uppercase text-xs mb-6 text-[#FDB813]">Contato</h5><p className="text-xs text-gray-500">(61) 9 9431-9156</p></div>
          <div className="flex gap-4 text-[#FDB813] justify-end md:col-span-2">
            <Instagram size={24} /> <MessageCircle size={24} />
          </div>
        </div>
      </footer>
    </div>
  )
}
