import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import { salvarEvento, deletarEvento, fazerLogin, fazerLogout } from '../actions'
import { LayoutDashboard, Calendar, Star, Users, ShieldCheck, BarChart3, QrCode, LogOut, Edit, Trash2, Bell } from 'lucide-react'

const prisma = new PrismaClient()

export default async function AdminPage() {
  const session = cookies().get("lza_admin_session")
  if (!session) { /* Retornar tela de Login (conforme códigos anteriores) */ }

  const admin = await prisma.user.findUnique({ where: { id: session.value } })
  const eventos = await prisma.evento.findMany({ orderBy: { data: 'desc' } })

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      {/* SIDEBAR (SEÇÃO 2) */}
      <aside className="w-64 bg-black border-r border-[#FDB813]/10 p-6 hidden md:flex flex-col gap-8">
        <img src="/logo-lza.png" className="h-10" />
        <nav className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-tighter text-gray-500">
          <div className="flex items-center gap-3 text-[#FDB813] bg-[#FDB813]/5 p-3 rounded-xl"><LayoutDashboard size={18}/> Dashboard</div>
          <div className="flex items-center gap-3 p-3 hover:text-white transition"><Calendar size={18}/> Eventos</div>
          <div className="flex items-center gap-3 p-3 hover:text-white transition"><Users size={18}/> Administradores</div>
          <div className="flex items-center gap-3 p-3 hover:text-white transition"><BarChart3 size={18}/> Relatórios</div>
        </nav>
        <form action={fazerLogout} className="mt-auto"><button className="flex items-center gap-3 text-red-500 p-3 font-bold uppercase text-[10px]"><LogOut size={18}/> Sair</button></form>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter">Dashboard</h1>
          <div className="flex items-center gap-4 bg-zinc-900 p-2 pr-6 rounded-full border border-white/5">
             <img src={admin?.foto} className="h-8 w-8 rounded-full border border-[#FDB813] object-cover" />
             <div className="text-[10px] uppercase font-bold">Olá, <span className="text-[#FDB813]">{admin?.nome}</span></div>
             <Bell size={16} className="text-gray-500" />
          </div>
        </header>

        {/* ESTATÍSTICAS (SEÇÃO 7) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-[#111] p-6 rounded-3xl border border-white/5 text-center">
            <div className="text-2xl font-black">{eventos.length}</div>
            <div className="text-[8px] uppercase font-bold text-gray-500">Eventos</div>
          </div>
          <div className="bg-[#111] p-6 rounded-3xl border border-white/5 text-center text-[#FDB813]">
            <div className="text-2xl font-black">15.892</div>
            <div className="text-[8px] uppercase font-bold">Acessos Site</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* PERFIL (SEÇÃO 5) */}
           <div className="bg-gradient-to-b from-zinc-900 to-black border-2 border-[#FDB813] rounded-[40px] p-8 text-center relative overflow-hidden">
              <img src={admin?.foto} className="w-32 h-32 rounded-full mx-auto border-4 border-[#FDB813] object-cover mb-6" />
              <h3 className="text-2xl font-black italic uppercase leading-none mb-1">{admin?.nome}</h3>
              <p className="text-[#FDB813] text-[10px] font-bold uppercase tracking-widest mb-6">{admin?.cargo}</p>
              <div className="bg-white p-3 rounded-2xl inline-block mb-6"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=LZA-${admin?.cadastroNum}`} /></div>
              <div className="text-left space-y-3 border-t border-white/10 pt-6 text-[10px] font-bold uppercase">
                 <div className="flex justify-between"><span className="text-gray-500">Cadastro:</span> <span>{admin?.cadastroNum}</span></div>
                 <div className="flex justify-between text-[#FDB813]"><span>Acesso:</span> <span>SUPER ADMINISTRADOR</span></div>
              </div>
           </div>

           {/* CADASTRO (SEÇÃO 3) */}
           <div className="bg-[#111] p-8 rounded-[40px] border border-white/5">
              <h2 className="text-[#FDB813] font-black italic uppercase mb-6">Gerenciar Evento</h2>
              <form action={salvarEvento} className="space-y-4">
                 <input name="nome" placeholder="Nome do Evento" className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#FDB813]" />
                 <input name="banner" placeholder="URL da Imagem (Arte)" className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#FDB813]" />
                 <div className="flex gap-4">
                    <label className="text-[10px] font-bold uppercase flex items-center gap-2 text-[#FDB813]"><input type="checkbox" name="apoiado" /> Selo de Apoio</label>
                    <label className="text-[10px] font-bold uppercase flex items-center gap-2 text-[#FDB813]"><input type="checkbox" name="destaque" /> Cronômetro</label>
                 </div>
                 <button className="w-full bg-[#FDB813] text-black font-black py-4 rounded-2xl uppercase">Salvar no Portal</button>
              </form>
           </div>
        </div>
      </main>
    </div>
  )
}
