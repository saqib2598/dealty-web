const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withSass = require('@zeit/next-sass')
const webpack = require('webpack')
const { requireEnvVar } = require('./lib/utils')

const { BUNDLE_ANALYZE } = process.env

module.exports = withBundleAnalyzer(withSass({
  /**
   * Provide config variables to the server / client side
   * @see https://nextjs.org/docs/#customizing-babel-config
   */
  publicRuntimeConfig: { // Will be available on both server and client
    apiUrl: requireEnvVar('API_SERVER'),
    primaryDomain: requireEnvVar('PRIMARY_DOMAIN'),
    intercomAppId: requireEnvVar('INTERCOM_APP_ID'),
    fullStory: requireEnvVar('FULLSTORY_ORG'),
    gaKey: requireEnvVar('GA_KEY'),
    stripeKey: requireEnvVar('STRIPE_KEY'),
    pusherAppId: requireEnvVar('PUSHER_APP_ID'),
    pusherAppKey: requireEnvVar('PUSHER_APP_KEY'),
    pusherAppSecret: requireEnvVar('PUSHER_APP_SECRET'),
    pusherAppCluster: requireEnvVar('PUSHER_APP_CLUSTER'),
    recaptchaSite: requireEnvVar('RECAPTCHA_SITE'),
    recaptchaSecret: requireEnvVar('RECAPTCHA_SECRET'),



  },
  /**
   * Analyze the webpack bundle
   * @see https://github.com/zeit/next-plugins/tree/master/packages/next-bundle-analyzer
   */
  analyzeServer: ['server', 'both'].includes(BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(BUNDLE_ANALYZE),

  /**
   * Customize webpack config
   * @see https://nextjs.org/docs/#customizing-webpack-config
   */
  webpack(config) {
    /**
     * Only load specific locales for moment.js
     * @see https://stackoverflow.com/a/25426019/956688
     */
    config.plugins.push(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/))

    return config
  },
}))
