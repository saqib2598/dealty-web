import React from 'react'
import { Container } from 'reactstrap'

import Layout from '../components/Layout'
import SubheaderPageTitle from '../components/SubheaderPageTitle'
import { CanonicalTag } from '../components/SEO/CanonicalTag'


const Terms = () => (
  <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
    <CanonicalTag title='Dealty | Terms' link='https://yourdealty.com/terms'/>
    <SubheaderPageTitle title="Terms of Service"/>
    <Container className="policy" fluid>
      <div className="wrapper lg">
      <h4>Terms and Conditions</h4>
        <ul>
          <li>Dealty Real Estate Services, LLC holds a real estate brokerage license in Arizona.</li>
          <li>This website is for informational purposes only, this site is not intended to provide legal or professional advice.</li>
          <li>Dealty is not responsible for any content that may appear.</li>
          <li>Content is posted by sellers or listers and Dealty has no information or knowledge of the accuracy.</li>
          <li>It is the user’s responsibility to confirm accuracy of all content.</li>
          <li>User agrees to not make any claim against Dealty for any loss or damage.</li>
        </ul>
        <h4>Social Media Terms of Use</h4>
        Dealty has the right to advertise or promote content that is posted on the Dealty website on any of the Dealty social media pages.
           Dealty reserves the right to remove any content found to be inappropriate, offensive or misleading. A user may be banned from accessing our pages at Dealty’s discretion.
      </div>
    </Container>
  </Layout>
)

export default Terms
