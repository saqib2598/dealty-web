import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import ChangeProfileContainer from '../../containers/users/ChangeProfileContainer'
import ChangePasswordContainer from '../../containers/users/ChangePasswordContainer'
import ChangeAgentProfileContainer from '../../containers/users/ChangeAgentProfileContainer'
import SocialMediaContainer from '../../containers/users/SocialMediaContainer'
import LogoutContainer from '../../containers/users/LogoutContainer'
import StripeProviderComponent from '../../components/StripeProviderComponent'
import TrialLeft from '../../components/TrialLeft'

class Setting extends React.Component {
  constructor(props){
      super(props)
      this.state = {
        showLinks: false,
        showAccount: false,
        showProfile: true,
        showCard: false,
        showAgentProfile: false
      }
      this.renderComponent = this.renderComponent.bind(this)
    }

    renderComponent ( component ) {
      let linksState = {profile: false, account: false, links: false, card: false, agentProfile: false}
      linksState[component] = true
      this.setState({
        showProfile: linksState.profile,
        showAccount: linksState.account,
        showLinks: linksState.links,
        showCard: linksState.card,
        showAgentProfile: linksState.agentProfile
      })
    }

  render() {
    const { user } = this.props
    const { showLinks, showAccount, showProfile, showCard, showAgentProfile } = this.state

    return (
      <Container fluid>
        <TrialLeft user={user} />
        <Row className="d-flex align-items-stretch pt-4">
          <Col xs="12" sm="3" lg="3" className="d-flex align-items-stretch mt-4">
            <div className="wrapper custom-wrapper">
              <div className="account-bar">
                <h4 className="setting">Settings</h4>
                <hr className="dashed" />
                <section id="account" onClick={(e) => this.renderComponent('profile')} className={showProfile ? 'active' : null}>Profile</section>
                <hr />
                { user.plan && user.plan.perks.filter(perk => (perk.key == 'web_link' || perk.key == 'social_media')).length > 0 &&
                  <div>
                    <section id="profile" onClick={(e) => this.renderComponent('links')} className={showLinks ? 'active' : null}>Social Links</section>
                    <hr />
                  </div>
                }
                <section id="account" onClick={(e) => this.renderComponent('account')} className={showAccount ? 'active' : null}>Change Password</section>
                <hr />
                { user.seller && user.stripeCustomer &&
                  <div>
                    <section id="card" onClick={(e) => this.renderComponent('card')} className={showCard ? 'active' : null}>Card</section>
                    <hr />
                  </div>
                }
                { user.seller && user.seller.sellerType === 'agent' &&
                  <div>
                    <section id="account" onClick={(e) => this.renderComponent('agentProfile')} className={showAgentProfile ? 'active' : null}>Licenses</section>
                    <hr />
                  </div>
                }
                <LogoutContainer />
              </div>
            </div>
          </Col>
          <Col xs="12" sm="9" lg="9" className="d-flex align-items-stretch mt-4">
            <div className="wrapper">
              { showLinks &&
                <SocialMediaContainer />
              }

              { showAccount &&
                <ChangePasswordContainer/>
              }

              { showProfile &&
                <ChangeProfileContainer />
              }

              { showCard &&
                <StripeProviderComponent user={user} plan={null} />
              }

              { showAgentProfile &&
                <ChangeAgentProfileContainer user={user} />
              }
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Setting
