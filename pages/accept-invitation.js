import Head from 'next/head'
import React from 'react'
import { Alert } from 'reactstrap'
import HousePatternSvg from '../components/HousePattern'
import AcceptInvitationContainer from '../containers/users/AcceptInvitationContainer'
import forwardAuth from '../lib/forwardAuth'
import PropTypes from 'prop-types'
import MediaQuery from 'react-responsive'

AcceptInvitationPage.getInitialProps = ({ query }) => ({
  token: query.token
})

AcceptInvitationPage.propTypes = {
  token: PropTypes.string.isRequired
}

function AcceptInvitationPage({ token }) {
  return (
    <div className="accept-invitation">
      <Head>
        <title>Accept Invitation</title>
      </Head>
      <main role="main" className={`main-teal`}>
        <div className="center">
          <div className="wrapper sm">
          <h2 className="text-center mx-auto mb-4">Set Your Account</h2>
          <p className="text-center mx-auto mb-4">Accept your invitation by setting up your account.</p>
          {token && <AcceptInvitationContainer invitationToken={token} />}
          {!token && (
            <Alert color="danger" className="text-center">
              <strong>Missing invitation token.</strong>
              <p className="mb-0">
                Please click the link from your invite email to finish your account.
              </p>
            </Alert>
          )}
          </div>
        </div>
      </main>

      <MediaQuery maxWidth={1024} minWidth={768}>
        <HousePatternSvg style={{height: '600px'}} />
      </MediaQuery>
      <style jsx>{`
        .accept-invitation {
          background: #007793;
        }

        @media only screen
        and (min-device-width : 1023px)
        and (max-device-width : 1024px) {
          // For Ipad pro only
          .accept-invitation {
            height: 1366px;
          }
        }

        @media only screen
        and (min-device-width : 767px)
        and (max-device-width : 768px) {
          // For Ipad only
          .accept-invitation {
            height: 1024px;
          }
        }
      `}</style>
    </div>
  )
}

export default forwardAuth(AcceptInvitationPage)
