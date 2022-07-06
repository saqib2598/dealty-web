import Head from 'next/head'
import React from 'react'
import { Container, Nav, } from 'reactstrap'
import Tab from '../../components/Tab'
import requireAuth from '../../lib/requireAuth'
import { connect } from 'react-redux'
import Layout from '../../components/Layout'
import PropTypes from 'prop-types'
import SubheaderPageTitle from '../../components/SubheaderPageTitle'
import { selectUser } from '../../modules/users'
import AppointmentsComponent from '../../components/dashboard/Appointments/Appointments'

const mapStateToProps = (state) => ({
    user: selectUser(state)
})

const mapDispatchToProps = { selectUser }

class Appointments extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      received: {label: 'Received', name: 'received', active: true},
      sent: {label: 'Sent', name: 'sent', active: false}
    }
  }

  renderComponent = (component) => {
    let updatedState = {...this.state,
      received:  {...this.state.received, active: false},
      sent: {...this.state.sent, active: false}
    }
    updatedState[component].active = true
    this.setState(updatedState)
  }

  render(){
    const { received, sent } = this.state
    const { user } = this.props
    let navElements = []
    for(let elem in this.state) {
      navElements.push(this.state[elem])
    }

    return(
      <Layout
        headerStyle = {user.seller ? 'teal' : 'default'}
        bodyBg = {user.seller ? 'light' : 'grey'}
        footerStyle = "white">
        <SubheaderPageTitle
          title = "Showings"
          color={user.seller ? '#007793' : 'white'}
          headerColor={user.seller ? 'white' : '#007793'}
        />
        <Container fluid className='main-white'>
          {user.seller ?
            <>
            <Nav tabs className='mb-5'>
              {navElements.map((tab) =>
                <Tab
                  label={tab.label}
                  class={tab.active}
                  clicked={() => this.renderComponent(tab.name)}
                />
                )
              }
            </Nav>
            {received.active && <AppointmentsComponent type='received' user={user}/>}
            {sent.active && <AppointmentsComponent type='sent' user={user}/>}
            </>
            :
            <AppointmentsComponent type='sent' user={user}/>
          }
        </Container>
      </Layout>
    )
  }
}

Appointments.propTypes = {
  user: PropTypes.object.isRequired
}

export default requireAuth(connect(mapStateToProps, mapDispatchToProps)(Appointments));
