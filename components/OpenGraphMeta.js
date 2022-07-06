import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'

const metaImageUrl = '/static/images/meta.jpg'

const defaultTitle = 'Dealty | Sell Your Home Your Way, Like A Pro'

const defaultDesc = "You don't have to be a licensed realtor to sell your home. With the help of Dealty, you gain instant access to all of the tools, tips, and tricks you need to sell your home."

const OpenGraphMeta = ({baseUrl, title, description, image, path}) => {
  if (!baseUrl) {
    return null
  }
  const url = require('url')

  return (
    <Head>
      <meta property="og:title" content={title || defaultTitle}/>
      <meta property="og:description" content={description || defaultDesc}/>
      <meta property="og:image" content={url.resolve(baseUrl, image || metaImageUrl)}/>
      <meta property="og:url" content={url.resolve(baseUrl, path)}/>
      <meta name="description" content={description || defaultDesc} />
    </Head>
  )
}

OpenGraphMeta.propTypes = {
  baseUrl: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  path: PropTypes.string,
}


export default OpenGraphMeta