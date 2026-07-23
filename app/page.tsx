import { PrismaClient } from '@prisma/client'
import { Rocket, Calendar, MapPin, Ticket, ShieldCheck, Instagram, MessageCircle, Clock } from 'lucide-react'

const prisma = new PrismaClient()

export default async function Home() {
  const agora = new Date()
  const eventos = await prisma.evento.findMany({ where: { ativo: true }, orderBy: { data: 'asc' } })
  const proximoEvento = eventos[0]

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans">
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-[#FDB813]/30 px-6 py-4 flex justify-between items-center">
        <img src="/logo-lza.png" alt="LZA" className="h-12" />
        <div className="flex gap-4">
          <button className="bg-[#FDB813] text-black px-5 py-2 rounded-full font-black text-xs uppercase shadow-[0_0_15px_#FDB813]">Anuncie</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-6 text-center bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900 to-black">
        <h1 className="text-4xl md:text-7xl font-black italic uppercase text-[#FDB813] mb-4">Eventos LZA</h1>
        <p className="text-gray-400 tracking-[0.3em] uppercase text-sm mb-10">Decolando a sua diversão 🚀</p>

        {/* CONTADOR DINÂMICO */}
        {proximoEvento && (
          <div className="inline-block bg-zinc-900 border-2 border-[#FDB813] p-6 rounded-[35px] shadow-[0_0_30px_rgba(253,184,19,0.2)] mb-12">
            <p className="text-[10px] font-bold uppercase mb-3 text-white/60">Faltam para {proximoEvento.nome}</p>
            <div className="flex gap-6 text-3xl font-black italic">
               <div>12 <span className="block text-[8px] not-italic text-gray-500">DIAS</span></div>
               <div className="text-[#FDB813]">:</div>
               <div>08 <span className="block text-[8px] not-italic text-gray-500">HORAS</span></div>
            </div>
          </div>
        )}

        <div className="flex justify-center gap-4">
          <button className="border border-white/20 px-8 py-3 rounded-xl font-bold uppercase text-xs">Calendário</button>
        </div>
      </section>

      {/* LISTA DE EVENTOS */}
      <section className="px-6 py-10">
        <h2 className="text-xl font-black italic border-l-4 border-[#FDB813] pl-3 mb-10 uppercase">Próximos Eventos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventos.map((ev) => (
            <div key={ev.id} className="relative bg-zinc-900 rounded-[30px] overflow-hidden border border-white/5 hover:border-[#FDB813]/50 transition-all group">
              <img src={ev.banner} className="w-full h-64 object-cover grayscale-[30%] group-hover:grayscale-0 transition duration-500" alt={ev.nome} />
              
              {/* SELO DE APOIO */}
              {ev.apoiado && (
                <div className="absolute top-4 right-4 bg-[#FDB813] text-black px-3 py-1 rounded-full text-[8px] font-black uppercase flex items-center gap-1 shadow-lg">
                  <ShieldCheck size={10} /> Apoiado por LZA
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-black uppercase text-[#FDB813] italic mb-4 leading-tight">{ev.nome}</h3>
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-2"><MapPin size={14}/> {ev.cidade}</div>
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-6"><Calendar size={14}/> {new Date(ev.data).toLocaleDateString('pt-BR')}</div>
                <button className="w-full bg-white/5 hover:bg-[#FDB813] hover:text-black border border-white/10 py-3 rounded-xl font-bold transition text-xs uppercase tracking-widest">Ver Detalhes</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHATSAPP FLUTUANTE */}
      <a href="https://wa.me/5562994319156" className="fixed bottom-6 right-6 bg-[#25D366] p-4 rounded-full shadow-2xl z-50 animate-bounce">
        <MessageCircle size={28} color="white" />
      </a>
    </div>
  )
}
