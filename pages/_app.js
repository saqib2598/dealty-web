import React from 'react'
import {Provider} from 'react-redux'
import App from 'next/app'
import withRedux from 'next-redux-wrapper'
import makeStore from '../store'
import '../styles/styles.scss'
import '../styles/default.css'
import FullStory from 'react-fullstory';
import AnalyticsLayout from '../components/AnalyticsLayout'
import IntercomContainer from '../containers/IntercomContainer'
import getConfig from "next/config";
import OfflineState from '../components/Offline'
import AddUserInfo from './add-user-info'

export default withRedux(makeStore)(class MyApp extends App {
  static async getInitialProps ({Component, ctx}) {
    return {
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
      }
    }
  }

  render () {
    const { publicRuntimeConfig } = getConfig();
    const {Component, pageProps, store} = this.props
    const usr = store.getState().users.me
    const ComponentToRender = AddUserInfo
    return (
      <AnalyticsLayout ga_key={publicRuntimeConfig.gaKey}>
        <OfflineState />
        <Provider store={store}>
          <IntercomContainer />
        </Provider>
        <Provider store={store}>
          {usr.role === 'guest' ?
            <ComponentToRender {...pageProps} /> : <Component {...pageProps} />
          }
        </Provider>
        <FullStory org={publicRuntimeConfig.fullStory} />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Corporation",
                name: "Dealty",
                alternateName: "Dealty Real Estate",
                url: "https://yourdealty.com",
                logo: "https://yourdealty.com",
                sameAs: [
                  "https://www.facebook.com/dealty/",
                  "https://twitter.com/YourDealty",
                  "https://www.instagram.com/YourDealty/",
                  "https://www.linkedin.com/company/dealty/",
                  "https://www.youtube.com/channel/UCN-nXwTkIfsyarCb-Mkxshg",
                  "https://www.pinterest.com/yourDealty",
                  "https://yourdealty.com/",
                ],
              }),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org/",
                "@type": "WebSite",
                name: "Dealty",
                url: "https://yourdealty.com",
                potentialAction: {
                  "@type": "SearchAction",
                  target:
                    "https://yourdealty.com/buy/homes/listings?place{search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              }),
            }}
          />
          <script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5253379169396983'
           crossorigin='anonymous'></script>
      </AnalyticsLayout>
    )
  }
})
