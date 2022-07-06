import React from 'react'
import Head from 'next/head'
import Tab from '../../components/Tab'
import { Container, Nav } from 'reactstrap'
import Layout from '../../components/Layout'
import requireAuth from '../../lib/requireAuth'
import { selectUser } from '../../modules/users'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import OffersComponent from '../../components/dashboard/Offers/Offers'
import SubheaderPageTitle from '../../components/SubheaderPageTitle'

const mapStateToProps = (state) => ({
  user: selectUser(state)
})

const mapDispatchToProps = { selectUser }

class Offers extends React.Component {
  state = {
    received: {label: 'Received', name: 'received', active: true},
    sent: {label: 'Sent', name: 'sent', active: false}
  }

  renderComponent = name => {
    let updatedState = { ...this.state,
      received: {...this.state.received, active: false},
      sent: {...this.state.sent, active: false}
    }
    updatedState[name].active = true

    this.setState(updatedState)
  }

  render(){
    const { sent, received } = this.state
    const { user } = this.props
    let navElements = []
    for(let elem in this.state) {
      navElements.push(this.state[elem])
    }
    return(
      <Layout
        headerStyle={user.seller ? 'teal' : 'default'}
        bodyBg={user.seller ? 'light' : 'grey'}
        footerStyle="white">
        <Head>
          <title>Offers | Dealty Homes</title>
        </Head>
        <SubheaderPageTitle
          title="Offers"
          color={user.seller ? '#007793' : 'white'}
          headerColor={user.seller ? 'white' : '#007793'}
        />
        <Container fluid className='main-white'>
          {user.seller ?
            <>
              <Nav tabs className='mb-5'>
                {navElements.map((tab) =>
                  <Tab
                    key={tab.name}
                    label={tab.label}
                    class={tab.active}
                    clicked={() => {this.renderComponent(tab.name)}} />
                  )
                }
              </Nav>
              {sent.active && <OffersComponent type='sent' />}
              {received.active && <OffersComponent type='received' />}
            </>
            :
            <OffersComponent type='sent' />
          }
        </Container>
      </Layout>
    )
  }
}

Offers.propTypes = {
  user: PropTypes.object.isRequired
}

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(Offers));
