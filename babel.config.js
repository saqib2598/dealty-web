module.exports = {
  plugins: ['lodash'],
  presets: [
    [
      'next/babel',
      {
        'styled-jsx': {
          'plugins': [
            ['styled-jsx-plugin-sass', {
              'sassOptions': {
                'includePaths': ['./styles']
              }
            }]
          ]
        }
      }
    ]
  ]
}
