export default function AdminBadge({ admin }: { admin: any }) {
  return (
    <div className="w-72 bg-gradient-to-b from-zinc-800 to-black border-2 border-[#FDB813] rounded-3xl p-6 shadow-2xl text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-[#FDB813] shadow-[0_0_15px_#FDB813]"></div>
      
      <img src={admin.foto} className="w-24 h-24 rounded-full mx-auto border-2 border-[#FDB813] object-cover mb-4" />
      
      <h3 className="text-[#FDB813] font-black uppercase italic text-lg leading-tight">{admin.nome}</h3>
      <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-4">{admin.cargo}</p>
      
      <div className="bg-white p-2 rounded-xl inline-block mb-4">
        {/* Aqui você geraria um QR Code via biblioteca ou link da API */}
        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=LZA-${admin.cadastroNum}`} alt="QR Code" />
      </div>
      
      <div className="text-left text-[9px] text-gray-500 border-t border-white/10 pt-4 space-y-1 uppercase font-bold">
        <p>Cadastro: <span className="text-white">{admin.cadastroNum}</span></p>
        <p>Acesso: <span className="text-[#FDB813]">{admin.nivel}</span></p>
        <p>Desde: <span className="text-white">{new Date(admin.dataIngresso).toLocaleDateString()}</span></p>
      </div>
      
      <img src="/logo-lza.png" className="h-6 mx-auto mt-4 opacity-30 grayscale" />
    </div>
  )
}
