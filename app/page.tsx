import { PrismaClient } from '@prisma/client'
import { Rocket, Instagram, MessageCircle, ArrowDown } from 'lucide-react'

const prisma = new PrismaClient()

export default async function Home() {
  const eventos = await prisma.evento.findMany({ where: { ativo: true }, orderBy: { data: 'asc' } })
  
  // BUSCA O EVENTO MARCADO COMO DESTAQUE NO PAINEL
  const destaque = await prisma.evento.findFirst({ where: { destaque: true } })

  // LÓGICA DO TEMPO RESTANTE
  let dias = 0, horas = 0
  if (destaque) {
    const dataEvento = new Date(destaque.data).getTime()
    const agora = new Date().getTime()
    const diferenca = dataEvento - agora
    
    if (diferenca > 0) {
      dias = Math.floor(diferenca / (1000 * 60 * 60 * 24))
      horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24)
    }
  }

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* APRESENTAÇÃO INICIAL COM LOGO MAIOR */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '20px', background: 'radial-gradient(circle, #1a1a1a 0%, #000 100%)' }}>
        
        {/* LOGO AUMENTADA PARA 250PX */}
        <img 
          src="/logo-lza.png" 
          alt="LZA" 
          style={{ height: '250px', width: 'auto', marginBottom: '20px', filter: 'drop-shadow(0 0 20px #FDB813)' }} 
        />
        
        <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#FDB813', fontStyle: 'italic', textTransform: 'uppercase', margin: 0 }}>EVENTOS LZA</h1>
        <p style={{ letterSpacing: '4px', textTransform: 'uppercase', color: '#fff', marginTop: '10px' }}>O Foguete da Região 🚀</p>
        
        {/* QUADRO DE CONTAGEM DINÂMICO */}
        {destaque && (
          <div style={{ marginTop: '30px', border: '2px solid #FDB813', padding: '20px', borderRadius: '25px', background: 'rgba(0,0,0,0.6)', width: '100%', maxWidth: '380px', backdropFilter: 'blur(10px)' }}>
            <p style={{ color: '#FDB813', fontSize: '12px', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase' }}>
              Faltam para: {destaque.nome}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '28px', fontWeight: '900' }}>
              <div style={{textAlign: 'center'}}>{dias} <span style={{display: 'block', fontSize: '10px', color: '#666'}}>DIAS</span></div>
              <div style={{color: '#FDB813'}}>:</div>
              <div style={{textAlign: 'center'}}>{horas} <span style={{display: 'block', fontSize: '10px', color: '#666'}}>HORAS</span></div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '15px', marginTop: '40px' }}>
          <a href="#eventos" style={{ background: '#FDB813', color: '#000', padding: '15px 30px', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' }}>VER CALENDÁRIO</a>
          <a href="https://wa.me/5562994319156" style={{ background: 'transparent', border: '1px solid #fff', color: '#fff', padding: '15px 30px', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' }}>ANUNCIE</a>
        </div>
      </section>

      {/* LISTA DE EVENTOS ABAIXO */}
      <section id="eventos" style={{ padding: '40px 20px' }}>
        <h2 style={{ borderLeft: '5px solid #FDB813', paddingLeft: '15px', fontStyle: 'italic', marginBottom: '30px', textTransform: 'uppercase' }}>Próximos Eventos</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {eventos.map((ev) => (
            <div key={ev.id} style={{ background: '#111', borderRadius: '30px', overflow: 'hidden', border: '1px solid #333' }}>
              <img src={ev.imagemUrl} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ color: '#FDB813', margin: '0' }}>{ev.nome}</h3>
                <p style={{ color: '#aaa', fontSize: '14px', margin: '10px 0' }}>📍 {ev.cidade} | 📅 {new Date(ev.data).toLocaleDateString('pt-BR')}</p>
                <a href={ev.link || '#'} target="_blank" style={{ display: 'block', textAlign: 'center', background: '#FDB813', color: '#000', padding: '12px', borderRadius: '12px', fontWeight: 'bold', textDecoration: 'none' }}>INGRESSOS</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px 20px', textAlign: 'center', borderTop: '1px solid #222' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '20px' }}>
          <a href="https://www.instagram.com/eventoslza.oficial/" target="_blank" style={{ color: '#FDB813' }}><Instagram size={30} /></a>
          <a href="https://wa.me/5562994319156" style={{ color: '#FDB813' }}><MessageCircle size={30} /></a>
        </div>
        <p style={{ fontSize: '10px', color: '#444' }}>© 2024 EVENTOS LZA</p>
      </footer>
    </div>
  )
}
