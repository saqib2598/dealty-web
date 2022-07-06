import React from 'react'
import { getSpecificUser } from '../../modules/users'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import LoanOfficerPageBanner from '../../components/loan-officer/LoanOfficerPageBanner'
import LoanOfficerPageContent from '../../components/loan-officer/LoanOfficerPageContent'
import { createChatRoom } from '../../modules/chatRooms'
import { Router } from '../../routes'
import { isSignedIn as hasCredentials } from '../../lib/session'
import UnSignedInUser from '../../components/UnSignedInUser'
import ModalContainer from '../../components/buyer/home/ModalContainer'
import ModalContact from '../../components/buyer/home/ModalContact'
import ModalContent from '../../components/buyer/home/ModalContent'
import ModalSuccess from '../../components/buyer/home/ModalSuccess'
import { createLeadContact } from '../../modules/leadContact'
import getConfig from 'next/config'

const mapDispatchToProps = { getSpecificUser, createChatRoom, createLeadContact }

const mapStateToProps = (state) => ({
  user: state.users.user,
  isSignedIn: hasCredentials(state)
})

const { publicRuntimeConfig } = getConfig()
class LoanOfficerContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isLoginModal: false,
      contactOpenLead: false,
      successOpen: false,
    }
  }

  async componentDidMount() {
    const { getSpecificUser, userId } = this.props
    const id = userId.details.split('-').pop()
    await getSpecificUser(id, 1)
    this.setState({ isLoading: false })
  }

  toggleChatOpenLead = () => {
    this.setState(prevState => ({
      contactOpenLead: !prevState.contactOpenLead
    }))
  }

  toggleSuccessOpen = () => {
    this.setState(prevState => ({
      successOpen: !prevState.successOpen
    }))
  }

  contactLoanOfficer = () => {
    const { userId, isSignedIn } = this.props
    const loan_officer_id = userId.details.split('-').pop()
    isSignedIn ? this.props.createChatRoom(null, loan_officer_id).finally(() => {
      Router.push('/inbox')
    }) : this.toggleChatOpenLead()
  }

  toggleLenderContact = () => {
    this.setState({ isLoginModal: !this.state.isLoginModal })
  }

  handleModalSubmit = async (e) => {
      e.preventDefault();
      this.toggleChatOpenLead()
      this.toggleSuccessOpen()
      const { userId } = this.props
      const loan_officer_id = userId.details.split('-').pop()
      const { createLeadContact } = this.props
      const params = {
        'firstName': e.target[0].value,
        'lastName': e.target[1].value,
        'phone': e.target[2].value,
        'email': e.target[3].value,
        'message': e.target[4].value,
        'loan_officer_id': loan_officer_id,
      }
      await createLeadContact(params)
    }

  render() {
    const { contactOpenLead, successOpen, siteToken } = this.state
    return (
      <div className="homeloan_page">
        {!this.state.isLoading &&
          <>
            <ModalSuccess isOpen={successOpen} toggle={this.toggleSuccessOpen} user={this.props.user} />
            <ModalContact isOpen={contactOpenLead} toggle={this.toggleChatOpenLead}>
              <ModalContent
                handleModalSubmit={this.handleModalSubmit}
                user={this.props.user}
                siteToken={siteToken}
              />
            </ModalContact>
            <LoanOfficerPageBanner user={this.props.user} />
            <LoanOfficerPageContent
              user={this.props.user}
              contactLoanOfficer={this.contactLoanOfficer}
              toggleLenderContact={this.toggleLenderContact} />
          </>
        }
        <ModalContainer isOpen={this.state.isLoginModal} toggle={this.toggleLenderContact}>
          <UnSignedInUser />
        </ModalContainer>
      </div>
    )
  }
}

LoanOfficerContainer.propTypes = {
  user: PropTypes.object,
  userId: PropTypes.object,
  isSignedIn: PropTypes.func.isRequired,
  getSpecificUser: PropTypes.func.isRequired,
  contactLoanOfficer: PropTypes.func.isRequired,
  createChatRoom: PropTypes.func.isRequired,
  createLeadContact: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanOfficerContainer)
