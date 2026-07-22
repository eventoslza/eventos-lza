export default function Anuncie() {
  return (
    <div className="bg-brand-black min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto bg-brand-dark p-10 rounded-[40px] border border-brand-gold/20">
        <h1 className="text-4xl font-black italic text-brand-gold uppercase text-center mb-4">Anuncie seu <span className="text-white">Evento</span></h1>
        <p className="text-center text-gray-400 mb-10 uppercase text-xs tracking-widest">Leve seu público para outro nível com a Eventos LZA</p>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input placeholder="Seu Nome" className="bg-black border border-white/10 p-4 rounded-2xl outline-none focus:border-brand-gold text-white" />
            <input placeholder="WhatsApp" className="bg-black border border-white/10 p-4 rounded-2xl outline-none focus:border-brand-gold text-white" />
          </div>
          <input placeholder="Nome do Evento" className="w-full bg-black border border-white/10 p-4 rounded-2xl outline-none focus:border-brand-gold text-white" />
          <textarea placeholder="Fale um pouco sobre o evento e o que você precisa da LZA..." rows={5} className="w-full bg-black border border-white/10 p-4 rounded-2xl outline-none focus:border-brand-gold text-white"></textarea>
          <button className="w-full bg-brand-gold text-black font-black py-5 rounded-2xl text-xl uppercase italic shadow-xl hover:bg-brand-goldLight transition">
            ENVIAR PROPOSTA AGORA
          </button>
        </form>
      </div>
    </div>
  );
}
