import React from 'react'
import { Container } from 'reactstrap'
import * as moment from 'moment';

import Layout from '../components/Layout'
import SubheaderPageTitle from '../components/SubheaderPageTitle'
import { CanonicalTag } from '../components/SEO/CanonicalTag';

const PrivacyPolicy = () => (
  <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
    <CanonicalTag title='Privacy Policy' link='https://yourdealty.com/privacy-policy'/>
    <SubheaderPageTitle title="Privacy Policy"/>
    <Container className="policy" fluid>
      <div className="wrapper lg">

        <p className="p1">Last Updated <b> { moment().clone().startOf('month').format('DD-MM-YYYY') } </b></p>

        <p>Dealty is committed to protecting your personal information. Please read our privacy policy to understand the
          information we collect and how we use it and/or disclose any of it.</p>

        <p><strong>Information you provide to Dealty</strong></p>
        <p>When you use Dealty, you may provide personal information, such as name, address, and contact information.
          Some information you provide Dealty may be processed and shared by a third party. For example if you order a
          home inspection or photographer orany other service through the Dealty site.</p>

        <p><strong>Email Communication</strong></p>
        <p>You may receive emails from Dealty. You may request to opt-out of emails.</p>

        <p><strong>Security</strong></p>
        <p>Please be aware that information via the internet sometimes may not be entirely secure, however, Dealty takes
          all precautions and security measures to protect your information and data.</p>

        <p><strong>Third Party Sites</strong></p>
        <p>We may link to the websites of other companies. Your listing information may be shared with third party
          websites. This privacy policy does not extend to third party websites.</p>

        <p><strong>Cookies and tracking technologies</strong></p>
        <p>We use various technologies to collect information automatically when you access and use Dealty, including
          cookies, web beacons and similar technologies.</p>

        <p><strong>Cookies</strong></p>
        <p>A cookie is a text file that&rsquo;s either stored in your computer&rsquo;s memory temporarily and
          automatically deleted when you close your browser (a &ldquo;session&rdquo; cookie) or placed on your hard
          drive (a &ldquo;persistent&rdquo; cookie) by a web page server. A persistent cookie is not deleted when the
          browser is closed.</p>

        <p>A cookie makes your interaction with the website faster and more personal. Cookies let the site remember your
          preferences or recognize you when you return. They also allow the website to monitor how you use the site.
          This information can be used to create a profile for future marketing purposes, improve the site, or detect
          and prevent site misuse.</p>

        <p>Since cookies are text files, they cannot read information stored on your hard drive and are not used to run
          programs or deliver viruses to your computer. Cookies are uniquely assigned to you and your computer and can
          be read only by a Web server in the domain that issued the cookie to you.</p>

        <p>So what do cookies have to do with privacy? Some websites, including Dealty, use thirdparty cookies to track
          traffic coming to their site from advertising they run on other sites. While the information these cookies
          collect is anonymous, you may end up with a cookie on your hard drive from a site you&rsquo;ve never visited
          as a result.</p>

        <p>Like other Web sites that run third-party advertisements, Dealty has no control over and is not responsible
          for the advertisers&rsquo; practices, including their own use of cookies on the Dealty site. Dealty encourages
          you to review the advertisers&rsquo; policies.</p>

        <p>If you are still uncomfortable with cookies, you can accept or decline cookies at any time by modifying your
          browser settings. Most browsers are set to accept cookiesautomatically. You can set your browser to decline
          all cookies automatically or to prompt&nbsp;you for a response each time a cookie is offered. Note that
          declining cookies may&nbsp;hinder a site&rsquo;s performance and may not allow you to fully access a
          site&rsquo;s features and&nbsp;services.</p>

        <p><strong>Web Beacons</strong></p>
        <p>Web beacons, which are also known as clear GIFs, Web bugs or pixel tags, are often used in combination with
          cookies. They are images (often transparent) that are part of Web pages. At Dealty, Web beacons allow us to
          count users who have visited certain pages and to generate statistics about how our site is used. They are not
          used to access personally identifiable information.</p>

        <p>Unlike cookies, you cannot decline Web beacons. However, setting your browser to decline cookies or to prompt
          you for a response will keep Web beacons from tracking your activity.</p>

        <p><strong>Mobile Devices</strong></p>
        <p>You may adjust your privacy and security settings on your mobile devices.</p>

        <p><strong>Location Information</strong></p>
        <p>If you have your location services on when using Dealty, Dealty may use your location to provide you
          information within</p>

        <p><strong>Government and Private Information Requests</strong></p>
        <p>If Dealty is contacted to provide information based on a legal request on any of our users we will always
          make an effort to contact the use to object, unless it is believed to create harm.</p>

        <p><strong>Updates and changes to this Privacy Policy</strong></p>
        <p>Please note there may be future amendments to this policy. For the most current version, please check here
          for updates before relying on any of the provisions in this privacy policy. We will provide notice of
          material changes to the policy, either by posting a notice on our websites or by sending an email
          direct.</p>

        <p><strong>Contacting Dealty</strong></p>
        <p>Please contact us if you have any questions about this Privacy Policy, email contact@yourdealty.com</p>


      </div>
    </Container>
  </Layout>
)

export default PrivacyPolicy
