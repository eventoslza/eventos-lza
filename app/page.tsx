import { PrismaClient } from '@prisma/client'
import { Rocket, Instagram, MessageCircle, Calendar, MapPin, Ticket, ShieldCheck, Users, Star, ArrowDown, Share2 } from 'lucide-react'

const prisma = new PrismaClient()

export default async function Home() {
  // Busca os eventos do banco de dados
  const eventos = await prisma.evento.findMany({ 
    where: { ativo: true },
    orderBy: { data: 'asc' } 
  })

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', overflowX: 'hidden' }}>
      
      {/* 1. APRESENTAÇÃO DE IMPACTO (INTRO) */}
      <section style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center', 
        padding: '20px', 
        background: 'radial-gradient(circle, #1a1a1a 0%, #000 100%)', 
        borderBottom: '3px solid #FDB813' 
      }}>
        {/* LOGO CENTRALIZADA */}
        <div style={{ marginBottom: '20px' }}>
          <img 
            src="/logo-lza.png" 
            alt="EVENTOS LZA" 
            style={{ height: '180px', width: 'auto', filter: 'drop-shadow(0 0 20px rgba(253,184,19,0.4))' }} 
          />
        </div>

        <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#FDB813', fontStyle: 'italic', textTransform: 'uppercase', lineHeight: '1', margin: '10px 0' }}>
          EVENTOS LZA
        </h1>
        <h2 style={{ fontSize: '18px', color: '#fff', fontWeight: '300', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '30px' }}>
          O Foguete da Região 🚀
        </h2>
        <p style={{ color: '#888', maxWidth: '500px', lineHeight: '1.6', marginBottom: '40px', fontSize: '15px' }}>
          A maior plataforma de divulgação e impulsionamento de eventos em Luziânia e região. Conectamos você às melhores experiências.
        </p>

        <div style={{ display: 'flex', gap: '15px' }}>
          <a href="#eventos" style={{ background: '#FDB813', color: '#000', padding: '15px 35px', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase' }}>Ver Eventos</a>
          <a href="https://wa.me/5562994319156" style={{ background: 'transparent', border: '2px solid #fff', color: '#fff', padding: '15px 35px', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase' }}>Anuncie Agora</a>
        </div>

        <div style={{ marginTop: '50px' }}>
          <ArrowDown color="#FDB813" size={30} style={{ animation: 'bounce 2s infinite' }} />
        </div>
      </section>

      {/* 2. NÚMEROS DA EMPRESA */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '60px 20px', backgroundColor: '#0a0a0a' }}>
        <div style={{ textAlign: 'center', padding: '30px', border: '1px solid #222', borderRadius: '25px', background: '#111' }}>
          <h3 style={{ color: '#FDB813', fontSize: '32px', margin: 0, fontWeight: '900' }}>500+</h3>
          <p style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', fontWeight: 'bold' }}>Eventos Divulgados</p>
        </div>
        <div style={{ textAlign: 'center', padding: '30px', border: '1px solid #222', borderRadius: '25px', background: '#111' }}>
          <h3 style={{ color: '#FDB813', fontSize: '32px', margin: 0, fontWeight: '900' }}>100%</h3>
          <p style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', fontWeight: 'bold' }}>Credibilidade</p>
        </div>
      </section>

      {/* 3. LISTA DE EVENTOS (DINÂMICA) */}
      <section id="eventos" style={{ padding: '60px 20px' }}>
        <h2 style={{ borderLeft: '6px solid #FDB813', paddingLeft: '15px', fontStyle: 'italic', marginBottom: '40px', fontSize: '24px', textTransform: 'uppercase' }}>Próximos Eventos em Destaque</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
          {eventos.map((ev) => (
            <div key={ev.id} style={{ background: '#111', borderRadius: '35px', overflow: 'hidden', border: '1px solid #333', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
              <img src={ev.imagemUrl} style={{ width: '100%', height: '320px', objectFit: 'cover' }} alt={ev.nome} />
              <div style={{ padding: '25px' }}>
                <h3 style={{ color: '#FDB813', fontSize: '26px', margin: '0 0 15px 0', fontWeight: '900' }}>{ev.nome}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#aaa', fontSize: '14px', marginBottom: '25px' }}>
                  <span>📍 {ev.cidade}</span>
                  <span>📅 {new Date(ev.data).toLocaleDateString('pt-BR')}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a href={ev.link || '#'} target="_blank" style={{ flex: 1, textAlign: 'center', background: '#FDB813', color: '#000', padding: '15px', borderRadius: '15px', fontWeight: 'bold', textDecoration: 'none', fontSize: '16px' }}>GARANTIR INGRESSO</a>
                  <button style={{ padding: '15px', background: '#222', border: '1px solid #444', borderRadius: '15px' }}>
                    <Share2 size={20} color="#FDB813" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {eventos.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', border: '1px dashed #333', borderRadius: '20px', color: '#444' }}>
              Nenhum evento cadastrado no momento. <br/> Acesse /admin para adicionar.
            </div>
          )}
        </div>
      </section>

      {/* 4. RODAPÉ COM INSTAGRAM OFICIAL (@eventoslza.oficial) */}
      <footer style={{ padding: '80px 20px', textAlign: 'center', borderTop: '1px solid #222', background: '#000' }}>
        <img src="/logo-lza.png" style={{ height: '60px', opacity: 0.7, marginBottom: '30px' }} />
        <p style={{ color: '#888', marginBottom: '30px' }}>Acompanhe o portal nas redes sociais:</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '40px' }}>
          {/* LINK DIRETO INSTAGRAM */}
          <a href="https://www.instagram.com/eventoslza.oficial/" target="_blank" style={{ color: '#FDB813', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <Instagram size={45} />
            <span style={{ fontSize: '12px' }}>Instagram</span>
          </a>
          {/* LINK DIRETO WHATSAPP */}
          <a href="https://wa.me/5562994319156" target="_blank" style={{ color: '#FDB813', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <MessageCircle size={45} />
            <span style={{ fontSize: '12px' }}>WhatsApp</span>
          </a>
        </div>
        
        <p style={{ fontSize: '11px', color: '#444', letterSpacing: '1px' }}>
          © 2024 EVENTOS LZA - LUZIÂNIA E REGIÃO <br/> TODOS OS DIREITOS RESERVADOS
        </p>
      </footer>

      {/* WHATSAPP FLUTUANTE (FIXO) */}
      <a href="https://wa.me/5562994319156" style={{ position: 'fixed', bottom: '30px', right: '25px', background: '#25D366', width: '65px', height: '65px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 25px rgba(0,0,0,0.6)', zIndex: 1000 }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" style={{ width: '35px' }} />
      </a>
    </div>
  )
}
