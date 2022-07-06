import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
const isProd = process.env.NODE_ENV === 'production'


export default class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {

    return (
      <Html lang="en">
        <Head>
        {isProd && (
            <script dangerouslySetInnerHTML={{__html:`window.addEventListener('load', function() {
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WQHKGKL')});`}} />
          )}
          <meta charSet="utf-8" />
          <meta name="google-site-verification" content="oLy84AjutivJ-ZkVrE5ehzQrWNkR-ymP3EUYqdhn1U4" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:800|Nunito:400,700" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
          <link rel="manifest" href="/static/favicons/manifest.json" />
          <link rel="shortcut icon" href="/static/favicons/favicon.ico"/>
          <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#09c3cc" />
          <meta name="msapplication-TileColor" content="#09c3cc" />
          <meta name="msapplication-config" content="/static/favicons/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />
          {!isProd && <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD-qPdJxtBvP2uYgx_eEkO1jpucaM9aHJQ&libraries=geometry,drawing,places" />}
          {isProd && <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDmkkFZ45A6N3cNys8b4FtRolpGaMOQcTk&libraries=geometry,drawing,places" />}
          <script src="https://js.stripe.com/v3/"></script>
          <meta name="google-site-verification" content="yap8OBnGegh6YpUegh_aRyurHwVS3q1xu6H1Doczl9A" />
        </Head>
        <body>
          {isProd && (
            <noscript dangerouslySetInnerHTML={{__html:
                `<iframe src=“https://www.googletagmanager.com/ns.html?id=GTM-WQHKGKL”
                height=“0" width=“0” style=“display:none;visibility:hidden”></iframe>`}} />
          )}
          <Main />
          <NextScript/>
        </body>
      </Html>
    )
  }
}
