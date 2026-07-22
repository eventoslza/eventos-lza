import './globals.css'

export const metadata = {
  title: 'Eventos LZA - O Foguete da Região',
  description: 'A maior vitrine de eventos de Luziânia e Região',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" style={{ backgroundColor: '#050505', color: '#fff' }}>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#050505' }}>
        {children}
      </body>
    </html>
  )
}
