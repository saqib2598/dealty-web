const express = require('express')
const next = require('next')
const routes = require('./routes')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = next({ dev })
const handler = routes.getRequestHandler(app)

/**
 * Middleware to force HTTPS on Heroku
 * @see https://help.heroku.com/J2R1S4T8/can-heroku-force-an-application-to-use-ssl-tls
 */
const forceHTTPS = (req, res, next) => {
  if (
    req.headers.hasOwnProperty('x-forwarded-proto') &&
    req.headers['x-forwarded-proto'] !== 'https'
  ) {
    res.redirect('https://' + req.hostname + req.originalUrl)
  }
  else {
    next()
  }
}

app.prepare()
  .then(() => {
    const server = express()

    if (!dev) {
      server.use(forceHTTPS)
    }

    server.use(handler)

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
