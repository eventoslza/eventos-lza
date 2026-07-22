import { Rocket, Users, MapPin, Calendar, Ticket, Instagram, MessageCircle, Star, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh' }}>
      
      {/* NAVBAR */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', borderBottom: '2px solid #FDB813', background: '#000', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ color: '#FDB813', fontWeight: 'bold', fontSize: '20px' }}>EVENTOS LZA</div>
        <button style={{ background: '#FDB813', color: '#000', border: 'none', padding: '8px 15px', borderRadius: '5px', fontWeight: 'bold' }}>ANUNCIE</button>
      </nav>

      {/* HERO SECTION */}
      <section style={{ padding: '60px 20px', textAlign: 'center', background: 'linear-gradient(to bottom, #000, #111)' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#FDB813', textTransform: 'uppercase', marginBottom: '10px', fontStyle: 'italic' }}>
          CONECTANDO VOCÊ AOS <br/> <span style={{ color: '#fff' }}>MAIORES EVENTOS</span>
        </h1>
        <p style={{ color: '#888', marginBottom: '30px', fontSize: '12px', letterSpacing: '2px' }}>A MAIOR VITRINE DE ENTRETENIMENTO DA REGIÃO</p>
        
        {/* CONTADOR MASTER */}
        <div style={{ border: '2px solid #FDB813', padding: '20px', borderRadius: '20px', display: 'inline-block', width: '100%', maxWidth: '350px', background: '#000' }}>
          <p style={{ color: '#FDB813', fontWeight: 'bold', fontSize: '12px', marginBottom: '15px' }}>PRÓXIMO GRANDE EVENTO: EXPOAGRO</p>
          <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '24px', fontWeight: 'bold' }}>
            <div>15 <small style={{ display: 'block', fontSize: '10px', color: '#666' }}>DIAS</small></div>
            <div style={{ color: '#FDB813' }}>:</div>
            <div>08 <small style={{ display: 'block', fontSize: '10px', color: '#666' }}>HRS</small></div>
            <div style={{ color: '#FDB813' }}>:</div>
            <div>42 <small style={{ display: 'block', fontSize: '10px', color: '#666' }}>MIN</small></div>
          </div>
        </div>
      </section>

      {/* NÚMEROS DA EMPRESA */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '40px 20px' }}>
        <div style={{ background: '#111', padding: '20px', borderRadius: '15px', textAlign: 'center', border: '1px solid #222' }}>
          <h2 style={{ fontSize: '28px', margin: 0 }}>500+</h2>
          <p style={{ fontSize: '10px', color: '#888' }}>EVENTOS</p>
        </div>
        <div style={{ background: '#111', padding: '20px', borderRadius: '15px', textAlign: 'center', border: '1px solid #222' }}>
          <h2 style={{ fontSize: '28px', margin: 0 }}>15+</h2>
          <p style={{ fontSize: '10px', color: '#888' }}>CIDADES</p>
        </div>
        <div style={{ background: '#111', padding: '20px', borderRadius: '15px', textAlign: 'center', border: '1px solid #222' }}>
          <h2 style={{ fontSize: '28px', margin: 0 }}>120+</h2>
          <p style={{ fontSize: '10px', color: '#888' }}>PARCEIROS</p>
        </div>
        <div style={{ background: '#111', padding: '20px', borderRadius: '15px', textAlign: 'center', border: '1px solid #222' }}>
          <h2 style={{ fontSize: '28px', margin: 0 }}>100%</h2>
          <p style={{ fontSize: '10px', color: '#888' }}>CONFIANÇA</p>
        </div>
      </section>

      {/* EVENTOS EM DESTAQUE */}
      <section style={{ padding: '20px' }}>
        <h3 style={{ borderLeft: '4px solid #FDB813', paddingLeft: '10px', marginBottom: '20px' }}>DESTAQUES</h3>
        <div style={{ background: '#111', borderRadius: '20px', overflow: 'hidden', border: '1px solid #333' }}>
          <div style={{ height: '200px', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <p style={{ color: '#444' }}>IMAGEM DO EVENTO</p>
          </div>
          <div style={{ padding: '20px' }}>
            <h4 style={{ margin: 0, fontSize: '20px' }}>RODEIO SHOW 2024</h4>
            <p style={{ color: '#888', fontSize: '13px', margin: '10px 0' }}>Luziânia - Parque de Exposições</p>
            <button style={{ width: '100%', background: '#FDB813', color: '#000', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 'bold' }}>VER DETALHES</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px 20px', textAlign: 'center', borderTop: '1px solid #222', marginTop: '40px' }}>
        <p style={{ color: '#FDB813', fontWeight: 'bold' }}>EVENTOS LZA</p>
        <p style={{ fontSize: '12px', color: '#555', margin: '10px 0' }}>@eventoslza.oficial</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
           <Instagram color="#FDB813" />
           <MessageCircle color="#FDB813" />
        </div>
      </footer>

      {/* WHATSAPP FLUTUANTE */}
      <a href="https://wa.me/5562994319156" style={{ position: 'fixed', bottom: '20px', right: '20px', background: '#25D366', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" style={{ width: '35px' }} />
      </a>
    </div>
  );
}
