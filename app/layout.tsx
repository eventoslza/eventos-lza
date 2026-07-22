import './globals.css'
export const metadata = {
  title: 'Eventos LZA - O Portal da Região',
  description: 'Divulgação e promoção de eventos em Luziânia e região.',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ backgroundColor: '#050505', color: 'white', margin: 0 }}>{children}</body>
    </html>
  )
}
