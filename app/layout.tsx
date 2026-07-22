import './globals.css'
export const metadata = {
  title: 'Eventos LZA - O Portal da Região',
  description: 'Divulgação e promoção de eventos em Luziânia e região.',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
