import '@/styles/globals.scss'
import '@egjs/react-flicking/dist/flicking.css'

import { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { Focus } from '@/components/Focus'
import { Footer } from '@/components/Footer'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>Gallery</title>
      <meta name='description' content={`Taeyeong Kim's Gallery`} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='theme-color' content='#DDDDDD' />
      <meta name='author' content='Taeyeong Kim' />
      <meta name='keywords' content='gallery, photo, image, picture' />
      <meta name='robots' content='index, follow' />
      <meta name='googlebot' content='index, follow' />
      <meta property='og:title' content='Gallery' />
      <meta property='og:description' content={`Taeyeong Kim's Gallery`} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://tyeongkim.me/' />
      <meta property='og:site_name' content='Gallery' />
    </Head>
    <RecoilRoot>
      <Focus />
      <Component {...pageProps} />
      <Footer />
    </RecoilRoot>
  </>
}
