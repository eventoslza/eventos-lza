import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import { salvarEvento, deletarEvento, fazerLogout } from '../actions'
import { LayoutDashboard, Calendar, Star, Users, ShieldCheck, BarChart3, QrCode, LogOut, PlusCircle, Bell, Image as ImageIcon } from 'lucide-react'

const prisma = new PrismaClient()

export default async function AdminPage() {
  const session = cookies().get("lza_admin_session")
  if (!session) return <p>Acesso Negado</p>

  const admin = await prisma.user.findUnique({ where: { id: session.value } })
  const eventos = await prisma.evento.findMany({ orderBy: { data: 'desc' } })
  const apoiados = eventos.filter(e => e.apoiado).length

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans">
      
      {/* MENU LATERAL (SEÇÃO 2 DA IMAGEM) */}
      <aside className="w-64 bg-black border-r border-[#FDB813]/10 p-6 hidden md:flex flex-col gap-8">
        <img src="/logo-lza.png" className="h-10" />
        <nav className="flex flex-col gap-4 text-xs font-bold uppercase tracking-tighter text-gray-500">
          <div className="flex items-center gap-3 text-[#FDB813] bg-[#FDB813]/5 p-3 rounded-xl"><LayoutDashboard size={18}/> Dashboard</div>
          <div className="flex items-center gap-3 p-3 hover:text-white transition"><Calendar size={18}/> Eventos</div>
          <div className="flex items-center gap-3 p-3 hover:text-white transition"><Star size={18}/> Eventos Apoiados</div>
          <div className="flex items-center gap-3 p-3 hover:text-white transition"><Users size={18}/> Administradores</div>
          <div className="flex items-center gap-3 p-3 hover:text-white transition"><ImageIcon size={18}/> Banners</div>
        </nav>
        <form action={fazerLogout} className="mt-auto">
          <button className="flex items-center gap-3 text-red-500 p-3 font-bold uppercase text-[10px]"><LogOut size={18}/> Sair</button>
        </form>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-black italic uppercase">Dashboard</h1>
          <div className="flex items-center gap-4 bg-zinc-900 p-2 pr-6 rounded-full border border-white/5">
             <img src={admin?.foto} className="h-8 w-8 rounded-full border border-[#FDB813]" />
             <div className="text-[10px] uppercase font-bold">Olá, <span className="text-[#FDB813]">{admin?.nome.split(' ')[0]}</span></div>
             <Bell size={16} className="text-gray-500 ml-2" />
          </div>
        </header>

        {/* STATS (ESTILO DA IMAGEM) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-[#111] p-6 rounded-3xl border border-white/5 text-center">
            <Calendar className="mx-auto mb-2 text-gray-600" size={20} />
            <div className="text-2xl font-black">{eventos.length}</div>
            <div className="text-[8px] uppercase font-bold text-gray-500">Eventos</div>
          </div>
          <div className="bg-[#111] p-6 rounded-3xl border border-white/5 text-center">
            <Star className="mx-auto mb-2 text-gray-600" size={20} />
            <div className="text-2xl font-black">{apoiados}</div>
            <div className="text-[8px] uppercase font-bold text-gray-500">Apoiados</div>
          </div>
          <div className="bg-[#111] p-6 rounded-3xl border border-white/5 text-center text-[#FDB813]">
             <BarChart3 className="mx-auto mb-2" size={20} />
             <div className="text-2xl font-black">15.892</div>
             <div className="text-[8px] uppercase font-bold">Acessos</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* PERFIL DO ADMINISTRADOR (SESSÃO 5 DA IMAGEM) */}
           <div className="bg-gradient-to-b from-zinc-900 to-black border-2 border-[#FDB813] rounded-[40px] p-8 text-center relative overflow-hidden">
              <img src="/logo-lza.png" className="h-6 mx-auto mb-6 opacity-50" />
              <img src={admin?.foto} className="w-32 h-32 rounded-full mx-auto border-4 border-[#FDB813] object-cover mb-6" />
              <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-none mb-1">{admin?.nome}</h3>
              <p className="text-[#FDB813] text-[10px] font-bold uppercase tracking-widest mb-6">{admin?.cargo}</p>
              
              <div className="bg-white p-3 rounded-2xl inline-block mb-6">
                 <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=LZA-AUTH-${admin?.cadastroNum}`} className="h-24 w-24" />
              </div>

              <div className="text-left space-y-3 border-t border-white/10 pt-6">
                 <div className="flex justify-between text-[10px] font-bold uppercase">
                    <span className="text-gray-500">Cadastro:</span> <span>{admin?.cadastroNum}</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-bold uppercase">
                    <span className="text-gray-500">Ingresso:</span> <span>15/01/2025</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-bold uppercase text-[#FDB813]">
                    <span>Nível de Acesso:</span> <span>{admin?.nivel} ADMINISTRADOR</span>
                 </div>
              </div>
           </div>

           {/* CADASTRO RÁPIDO */}
           <div className="bg-[#111] p-8 rounded-[40px] border border-white/5">
              <h2 className="text-[#FDB813] font-black italic uppercase mb-6 flex items-center gap-2">
                 <PlusCircle size={20}/> Cadastrar Evento
              </h2>
              <form action={salvarEvento} className="space-y-4">
                 <input name="nome" placeholder="Nome do Evento" className="w-full bg-black border border-white/10 p-4 rounded-xl outline-none focus:border-[#FDB813]" />
                 <input name="data" type="date" className="w-full bg-black border border-white/10 p-4 rounded-xl outline-none focus:border-[#FDB813]" />
                 <input name="cidade" placeholder="Cidade" className="w-full bg-black border border-white/10 p-4 rounded-xl outline-none focus:border-[#FDB813]" />
                 <input name="banner" placeholder="URL do Banner" className="w-full bg-black border border-white/10 p-4 rounded-xl outline-none focus:border-[#FDB813]" />
                 <div className="bg-black/50 p-4 rounded-xl border border-white/5 flex gap-4">
                    <label className="text-[10px] font-bold uppercase flex items-center gap-2 text-[#FDB813]">
                       <input type="checkbox" name="apoiado" className="accent-[#FDB813]" /> Selo de Apoio
                    </label>
                    <label className="text-[10px] font-bold uppercase flex items-center gap-2 text-[#FDB813]">
                       <input type="checkbox" name="destaque" className="accent-[#FDB813]" /> Cronômetro
                    </label>
                 </div>
                 <button className="w-full bg-[#FDB813] text-black font-black py-4 rounded-2xl uppercase shadow-lg">Publicar Agora</button>
              </form>
           </div>
        </div>
      </main>
    </div>
  )
}
