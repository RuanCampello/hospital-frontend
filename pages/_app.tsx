import '@/styles/globals.css'
import { Manrope } from 'next/font/google'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

const manrope = Manrope({ weight: ['400'], subsets: ['latin']})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <main className={manrope.className}>
        <Component {...pageProps} />
      </main>
    </RecoilRoot>
  )
}
