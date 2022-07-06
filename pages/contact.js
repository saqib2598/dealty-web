import React from 'react'
import { Container } from 'reactstrap'

import Layout from '../components/Layout'
import SubheaderPageTitle from '../components/SubheaderPageTitle'
import ContactContainer from '../containers/ContactContainer'
import { CanonicalTag } from '../components/SEO/CanonicalTag'

const Contact = () => (
  <Layout headerStyle='teal' bodyBg='light' footerStyle='white'>
    <CanonicalTag title='Contact Us | Dealty'  link='https://yourdealty.com/contact'/>
    <SubheaderPageTitle title='Contact Us' />
    <Container fluid>
      <div className='wrapper md'>
        <ContactContainer />
      </div>
    </Container>
  </Layout>
)

export default Contact
