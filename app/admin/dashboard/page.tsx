import { Plus, List, Users, LayoutDashboard, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-brand-black flex text-white font-sans">
      {/* Sidebar Mobile adaptado */}
      <div className="hidden md:flex w-64 bg-black border-r border-brand-gold/10 p-8 flex-col gap-10">
        <img src="/logo-lza.png" className="w-32" />
        <nav className="space-y-6">
          <a href="#" className="flex items-center gap-3 text-brand-gold font-bold"><LayoutDashboard/> Dashboard</a>
          <a href="#" className="flex items-center gap-3 text-gray-500 hover:text-white transition"><Plus/> Novo Evento</a>
          <a href="#" className="flex items-center gap-3 text-gray-500 hover:text-white transition"><Users/> Parceiros</a>
        </nav>
      </div>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-6 md:p-12">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-black italic uppercase">Painel <span className="text-brand-gold">Controle</span></h1>
          <button className="bg-brand-gold text-black px-6 py-2 rounded-xl font-bold flex items-center gap-2">
            <Plus size={20}/> NOVO EVENTO
          </button>
        </header>

        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-brand-dark p-6 rounded-3xl border border-white/5">
            <p className="text-gray-500 text-xs font-bold uppercase">Eventos Ativos</p>
            <p className="text-4xl font-black text-brand-gold">12</p>
          </div>
          <div className="bg-brand-dark p-6 rounded-3xl border border-white/5">
            <p className="text-gray-500 text-xs font-bold uppercase">Solicitações</p>
            <p className="text-4xl font-black text-brand-gold">05</p>
          </div>
        </div>

        {/* Tabela de Eventos */}
        <div className="bg-brand-dark rounded-3xl border border-white/5 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-black text-brand-gold font-bold uppercase text-[10px]">
              <tr>
                <th className="p-5">Evento</th>
                <th className="p-5 text-center">Data</th>
                <th className="p-5 text-center">Status</th>
                <th className="p-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-white/5 transition">
                  <td className="p-5 font-bold italic uppercase">Expoagro Luziânia 2024</td>
                  <td className="p-5 text-center text-gray-400 font-mono">15/08/2024</td>
                  <td className="p-5 text-center"><span className="bg-green-500/20 text-green-500 px-3 py-1 rounded-full text-[10px] font-bold">ATIVO</span></td>
                  <td className="p-5 text-right flex justify-end gap-3 font-bold text-xs uppercase">
                    <button className="text-brand-gold">Editar</button>
                    <button className="text-red-500">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
