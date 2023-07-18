import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/react';


export default function App({ Component, pageProps }) {
  return ( 
  <ThemeProvider attribute='class'>
  {/* <ThemeProvider attribute='class' suppressHydrationWarning> */}

  <Component {...pageProps} />
  <Analytics />
  </ThemeProvider>
  )
}
