export default function Home() {
  return (
    <div style={{backgroundColor: '#050505', color: '#FDB813', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', textAlign: 'center'}}>
      
      <nav style={{width: '100%', borderBottom: '1px solid #FDB813', paddingBottom: '10px', marginBottom: '30px'}}>
        <img src="/logo-lza.png" alt="EVENTOS LZA" style={{height: '50px'}} />
      </nav>

      <h1 style={{fontSize: '32px', fontStyle: 'italic', fontWeight: '900', textTransform: 'uppercase'}}>
        Conectando você aos <br/> <span style={{color: '#fff'}}>Maiores Eventos</span>
      </h1>
      
      <p style={{color: '#888', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '12px', margin: '20px 0'}}>
        A maior vitrine de entretenimento de Luziânia e Região
      </p>

      <div style={{border: '2px solid #FDB813', borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '350px', background: '#111'}}>
        <h2 style={{fontSize: '14px', color: '#fff'}}>PRÓXIMO EVENTO: EXPOAGRO</h2>
        <div style={{display: 'flex', justifyContent: 'space-around', fontSize: '20px', fontWeight: 'bold', marginTop: '10px'}}>
          <div>15 <small style={{display:'block', fontSize:'10px'}}>DIAS</small></div>
          <div>08 <small style={{display:'block', fontSize:'10px'}}>HORAS</small></div>
          <div>42 <small style={{display:'block', fontSize:'10px'}}>MIN</small></div>
        </div>
      </div>

      <button style={{marginTop: '30px', backgroundColor: '#FDB813', color: '#000', border: 'none', padding: '15px 30px', borderRadius: '30px', fontWeight: 'bold', textTransform: 'uppercase', width: '100%', maxWidth: '300px'}}>
        Ver Eventos
      </button>

      <footer style={{marginTop: 'auto', padding: '20px', color: '#444', fontSize: '10px'}}>
        © 2024 EVENTOS LZA
      </footer>
    </div>
  )
}
