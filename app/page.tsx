import { PrismaClient } from '@prisma/client'
import { Rocket, Instagram, MessageCircle, Calendar, MapPin, Ticket, ShieldCheck, Users, Star } from 'lucide-react'

const prisma = new PrismaClient()

export default async function Home() {
  const eventos = await prisma.evento.findMany({ orderBy: { data: 'asc' } })

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* APRESENTAÇÃO / INTRO */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '20px', background: 'radial-gradient(circle, #1a1a1a 0%, #000 100%)' }}>
        <img src="/logo-lza.png" alt="EVENTOS LZA" style={{ height: '120px', marginBottom: '30px' }} />
        <h1 style={{ fontSize: '40px', fontWeight: '900', color: '#FDB813', fontStyle: 'italic', textTransform: 'uppercase', lineHeight: '1' }}>
          DECOLANDO OS <br/> MAIORES EVENTOS
        </h1>
        <p style={{ color: '#888', margin: '20px 0', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '14px' }}>A Vitrine Oficial de Luziânia e Região</p>
        <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
          <a href="#eventos" style={{ background: '#FDB813', color: '#000', padding: '15px 30px', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none' }}>VER CALENDÁRIO</a>
          <a href="https://wa.me/5562994319156" style={{ background: 'transparent', border: '2px solid #fff', color: '#fff', padding: '15px 30px', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none' }}>ANUNCIE AQUI</a>
        </div>
      </section>

      {/* NÚMEROS DA EMPRESA */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '40px 20px', backgroundColor: '#111' }}>
        <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #222', borderRadius: '20px' }}>
          <h3 style={{ color: '#FDB813', fontSize: '24px', margin: 0 }}>500+</h3>
          <p style={{ fontSize: '10px', color: '#666', textTransform: 'uppercase' }}>Eventos Divulgados</p>
        </div>
        <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #222', borderRadius: '20px' }}>
          <h3 style={{ color: '#FDB813', fontSize: '24px', margin: 0 }}>100%</h3>
          <p style={{ fontSize: '10px', color: '#666', textTransform: 'uppercase' }}>Credibilidade</p>
        </div>
      </section>

      {/* LISTA DINÂMICA DE EVENTOS */}
      <section id="eventos" style={{ padding: '40px 20px' }}>
        <h2 style={{ borderLeft: '5px solid #FDB813', paddingLeft: '15px', fontStyle: 'italic', marginBottom: '30px' }}>PRÓXIMOS EVENTOS</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {eventos.map((ev) => (
            <div key={ev.id} style={{ background: '#111', borderRadius: '25px', overflow: 'hidden', border: '1px solid #333' }}>
              <img src={ev.imagemUrl} style={{ width: '100%', height: '250px', objectFit: 'cover' }} alt={ev.nome} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ color: '#FDB813', fontSize: '22px', margin: '0 0 10px 0' }}>{ev.nome}</h3>
                <p style={{ fontSize: '14px', color: '#aaa', margin: '5px 0' }}>📍 {ev.cidade}</p>
                <p style={{ fontSize: '14px', color: '#aaa', margin: '5px 0' }}>📅 {new Date(ev.data).toLocaleDateString('pt-BR')}</p>
                <a href={ev.link || '#'} style={{ display: 'block', textAlign: 'center', background: '#FDB813', color: '#000', padding: '12px', borderRadius: '10px', fontWeight: 'bold', textDecoration: 'none', marginTop: '15px' }}>GARANTIR INGRESSO</a>
              </div>
            </div>
          ))}
          {eventos.length === 0 && <p style={{ textAlign: 'center', color: '#444' }}>Nenhum evento cadastrado no momento.</p>}
        </div>
      </section>

      {/* RODAPÉ COM INSTAGRAM REAL */}
      <footer style={{ padding: '60px 20px', textAlign: 'center', borderTop: '1px solid #222' }}>
        <img src="/logo-lza.png" style={{ height: '40px', opacity: 0.5, marginBottom: '20px' }} />
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '30px' }}>
          <a href="https://www.instagram.com/eventos_lza_regiao.ofc" target="_blank" style={{ color: '#FDB813' }}><Instagram size={30} /></a>
          <a href="https://wa.me/5562994319156" style={{ color: '#FDB813' }}><MessageCircle size={30} /></a>
        </div>
        <p style={{ fontSize: '10px', color: '#444' }}>© 2024 EVENTOS LZA - TODOS OS DIREITOS RESERVADOS</p>
      </footer>
    </div>
  )
}
