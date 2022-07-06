import React from 'react'
import { Form } from 'react-final-form'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import ContactForm from '../../../components/buyer/home/ContactForm'
import { mapFinalFormErrors } from '../../../lib/utils'
import { sendContactMessage } from '../../../modules/users'
import { Router } from '../../../routes'

const mapErrors = mapFinalFormErrors('Failed to send message')

const mapDispatchToProps = { sendContactMessage }

class ContactContainer extends React.Component {

  onSubmit = async (values) => {
    const { sendContactMessage } = this.props

    try {
      await sendContactMessage(values)
      Router.pushRoute('/buy')
    } catch (error) {
      return mapErrors(error)
    }
  }

  render() {
    return (
      <div className="contact_container">
        <div className="contact-inner">
          <Form
            component={ContactForm}
            onSubmit={this.onSubmit}
            heading="Contact Dealty"
          />
        </div>
        <style jsx>{`
        @import "styled-jsx-helper";
          .contact_container {
            text-align: center;
            :global(.icon){
              text-align: center;
            }
            .contact-inner{
              display: inline-block;
              width: 100%;
              max-width: 780px;
              border-radius: $border-radius;
              background-color: $white;
              text-align: left;
              padding: 40px;
            }
          }
        `}</style>
      </div>
    )
  }
}

ContactContainer = connect(null, mapDispatchToProps)(ContactContainer)

export default withRouter(ContactContainer)
