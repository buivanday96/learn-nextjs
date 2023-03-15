import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head style={{
        margin : 0,
        padding: 0,
      }}>
      {/* <Script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"/>
      <Script src="https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar.js"/> */}
      </Head>
      <body style={{
        margin : 0,
        padding: 0,
      }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
