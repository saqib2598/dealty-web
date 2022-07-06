import React, { useState } from 'react'
import moment from 'moment'
import { Button, Alert } from 'reactstrap'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import { connect } from 'react-redux'
import { capitalize } from 'lodash'
import { updateOffer, retrieveHistory } from '../../../modules/offers'
import { mapFinalFormErrors } from '../../../lib/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory } from '@fortawesome/free-solid-svg-icons'
import OfferForm from '../../../components/buyer/home/SendOnlineOfferForm'
import HistoryModal from './modals/History'
import { selectUser } from '../../../modules/users'

const mapErrors = mapFinalFormErrors('Failed to create account')

const mapStateToProps = state => ({
  history: state.offers.history,
  user: selectUser(state)
})
const mapDispatchToProps = { updateOffer, retrieveHistory, selectUser }

const offer = ({offer, ...props}) => {
  const [offerModal, setOfferModal] = useState(false)
  const [message, setMessage] = useState('')
  const [historyModal, setHistoryModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const toggleOffer = () => {
    setOfferModal(!offerModal)
  }

  const submit = async (values) => {
    values['id'] = offer.id
    values['state'] = 'countered'
    const { updateOffer } = props
    try {
      await updateOffer(offer.id, values)
      setMessage(`The offer has been countered successfully.`)
      closeAlertLater()
      toggleOffer()
    } catch(error) {
      return mapErrors(error);
    }
  }

  const handleAcceptance = async (state) => {
    const { updateOffer } = props
    try {
      await updateOffer(offer.id, {state: state})
      setMessage(`The offer has been ${state} successfully.`)
      closeAlertLater()
    } catch(error) {
      return mapErrors(error)
    }
  }

  const isDisabled = (state, button) => {
    if(!offer.doneBy) {
      return true
    } else if(['accepted', 'rejected', 'canceled'].includes(state)) {
      return true
    } else if (button === 'counter') {
      return false
    } else if(offer.doneBy.id == props.user.id) {
      return button !== 'cancel'
    } else if (button === 'cancel') {
      return true
    } else {
      return false
    }
  }

  const closeAlertLater = () => {
    setTimeout(()=>{
      setMessage('')
    }, 3000)
  }

  const showHistory = async () => {
    setHistoryModal(true)
    setLoading(true)
    const { retrieveHistory } = props
    await retrieveHistory(offer.id)
    setLoading(false)
  }

  const closeHistoryModal = () => {
    setHistoryModal(false)
  }

  return(
    <div className='card'>
      {message && <Alert>{message}</Alert>}
      <HistoryModal
        showHistoryModal={historyModal}
        closeModal={closeHistoryModal}
        history={props.history}
        heading='Offer History'
        loading={loading} />
      <h5>{offer.listing.address} {offer.listing.addres2}</h5>
      <h5>{offer.listing.city} {offer.listing.state}, {offer.listing.zip}</h5>
      <div>
        <FontAwesomeIcon
          icon={faHistory}
          onClick={showHistory}
          style={{ cursor: 'pointer', height: '2em', width: '2em', color: 'lightgray', margin: '5px' }}
        />
      </div>
      <div>
        <div className='white-div'>
          <div>listing price</div><div>${offer.listing.price}</div>
        </div>
        <div className='grey-div'>
          <div>offer type</div><div>{offer.offerType}</div>
        </div>
        <div className='white-div'>
          <div>offered price</div><div>${offer.price}</div>
        </div>
        <div className='grey-div'>
          <div>closing date</div><div>{moment(offer.suggestedClosingDate).format('l')}</div>
        </div>
        {
          offer.state == 'expired' && offer.doneBy == null && <div className='text-muted mt-2'>Offer Expired</div>
        }
        {
          offer.state == 'canceled' && offer.doneBy == null && <div className='text-muted mt-2'> Canceled by: Owner</div>
        }
        {offer.doneBy &&
          <>
            {offer.state === 'initialized' ?
              <div className='text-muted mt-2'>Sent by: {offer.doneBy.name}</div>
              :
              <div className='text-muted mt-2'>{capitalize(offer.state)} by: {offer.doneBy.name}</div>
            }
          </>
        }
        <Button className='counter' onClick={toggleOffer} disabled={isDisabled(offer.state, 'counter')}>Counter Offer</Button>
        <div className='accept-reject'>
          <Button onClick={()=>{handleAcceptance('accepted')}} disabled={isDisabled(offer.state)}>
            Accept
          </Button>
          <Button onClick={()=>{handleAcceptance('rejected')}} className='btn-danger' disabled={isDisabled(offer.state)}>
            Reject
          </Button>
        </div>
        <Button className='counter btn-danger' onClick={()=>{handleAcceptance('canceled')}} disabled={isDisabled(offer.state, 'cancel')}>Cancel</Button>
        <Form
          component={OfferForm}
          onSubmit={submit}
          openSendOnlineOffer={offerModal}
          toggleSendOnlineOffer={toggleOffer}
          isSignedIn={true}
          initialValues={{price: offer.price, offerType: offer.offerType, SuggestedClosingDate: offer.suggestedClosingDate}}
          heading='Counter Offer'
          note = "Be advised the owner of this property has not yet officially claimed their listing on the Dealty website, but your message will be forwarded to the contact information that is on the property records"
        />
      </div>
      <style>{`
        .white-div, .grey-div {
          display: flex;
          justify-content: space-around;
        }
        .grey-div {
          background: lightgrey;
        }
        .accept-reject {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
        }
        .accept-reject .btn {
          width: 49%;
        }
        .counter {
          width: 100%;
          margin-top: 10px;
        }
      `}</style>
    </div>
  )
}

offer.propTypes = {
  offer: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  updateOffer: PropTypes.func.isRequired,
  retrieveHistory: PropTypes.func.isRequired,
  history: PropTypes.object,
  user: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(offer);
