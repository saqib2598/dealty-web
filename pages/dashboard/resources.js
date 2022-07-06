import React from 'react'

import Layout from '../../components/Layout'
import { ResourcesContainer } from '../../containers/dashboard/ResourcesContainer'
import { CanonicalTag } from '../../components/SEO/CanonicalTag'

const Resources = ({ query }) => (
  <Layout bodyBg='light' headerStyle='teal' footerStyle='white'>
    <CanonicalTag title='Resources | Dealty' link='https://yourdealty.com/dashboard/resources' />
    <ResourcesContainer tab={query.tab}/>
  </Layout>
)

Resources.getInitialProps = ({query}) => {
  return {query}
}

export default Resources
