module.exports = {
  plugins: [
    /**
     * @see https://github.com/TrySound/postcss-easy-import
     * @see https://github.com/postcss/autoprefixer
     */
    require('postcss-easy-import')({ prefix: '_' }), // local files, node modules or web_modules with glob support
    require('autoprefixer')({ /* ...options */ }) // so imports are auto-prefixed too
  ]
}
