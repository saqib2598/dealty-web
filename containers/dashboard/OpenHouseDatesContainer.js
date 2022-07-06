import React from 'react'
import { Form } from 'react-final-form'
import moment from 'moment'
import { Row, Col, Input } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { mapFinalFormErrors } from '../../lib/utils'
import { selectUser, retrieveUser } from '../../modules/users'
import { retrieveListing, selectListing } from '../../modules/listings'
import { isSignedIn as hasCredentials } from '../../lib/session'
import { createOpenHouseDates, retrieveOpenHouseDates, selectOpenHouseDates, deleteOpenHouseDate } from '../../modules/openHouseDates'
import OpenHouseDatesForm from '../../components/dashboard/OpenHouseDatesForm'
import NavigationButtons from '../../components/navigationButtons'
import PropTypes from 'prop-types'

const mapErrors = mapFinalFormErrors('Failed to Add Open House Date')
const mapDispatchToProps = {
  retrieveUser,
  createOpenHouseDates,
  selectOpenHouseDates,
  retrieveOpenHouseDates,
  deleteOpenHouseDate,
  retrieveListing,
  selectListing,
  selectUser
}

const mapStateToProps = state =>({
  listing: selectListing(state),
  isSignedIn: hasCredentials(state),
  user: selectUser(state),
  openHouseDates: selectOpenHouseDates(state)
})

class OpenHouseDatesContainer extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      success: '',
      formKey: 0
    }
  }

  async componentDidMount() {
    const { propertyId, retrieveOpenHouseDates, retrieveListing } = this.props
    await retrieveOpenHouseDates(propertyId)
    await retrieveListing(propertyId)
  }

  onSubmit = async ( values ) => {
    const { createOpenHouseDates, propertyId } = this.props
    values['listing_id'] = propertyId
    if (values.OpenDate){
      values.OpenDate = new Date(values.OpenDate)
    }
    if (values.StartTime){
      values.StartTime = new Date(values.StartTime)
    }
    if (values.EndTime){
      values.EndTime = new Date(values.EndTime)
    }
    try {
      await createOpenHouseDates(propertyId, values)
      setTimeout(()=>{
        this.setState(prevState => {return {formKey: prevState.formKey + 1}})
      }, 1500)
      this.setState({ success: 'Open House Date Added Successfully!!!' })
      this.closeAlertLater()
    }
    catch(error){
      return mapErrors(error)
    }
  }

  handleDelete = async (index) => {
    const { propertyId, openHouseDates, deleteOpenHouseDate} = this.props
    const obj = openHouseDates.open_house_dates[index]
    try{
      await deleteOpenHouseDate(propertyId, obj.id)
      .then(() => { this.setState({ success: 'Open House Date Removed Successfully!!!' }) })
      this.closeAlertLater()
    }
    catch(error){
      return mapErrors(error)
    }
  }

  closeAlertLater = () => {
    setTimeout(() => {
      this.setState({
        success: ''
      })
    }, 1500);
  }

  render() {
    const { openHouseDates, listing, user } = this.props
    const { success, formKey } = this.state

    const retrieveRoute = () => {
      if (user.plan && user.plan.perks.filter(perk => perk.key == 'document_upload').length > 0){
        return `/seller/property/${listing.id}/add-documents`
      } else {
        return `/seller/property/${listing.id}/add-floor-plans`
      }
    }
    return (
      <div>
        <Form
          component={OpenHouseDatesForm}
          onSubmit={this.onSubmit}
          success={success}
          key={formKey}
        />

        {
          openHouseDates.open_house_dates && openHouseDates.open_house_dates.map(( open_date, index )=>{
            return(
              <div key= {index}>
                <Row style={{margin: '5px', flexDirection: 'row'}}>
                  <Col className="col-md-4 col-4">
                    <Input
                      id="openDate"
                      name="openDate"
                      type="text"
                      disabled={true}
                      value={moment(open_date.openDate).format('MM/DD/YYYY')}
                    />
                  </Col>
                  <Col className="col-md-3 col-4">
                    <Input
                      id="StartTime"
                      name="StartTime"
                      type="text"
                      disabled={true}
                      value={moment(open_date.startTime).format('h:mm a')}
                    />
                  </Col>
                  <Col className="col-md-3 col-4">
                    <Input
                      id="EndTime"
                      name="EndTime"
                      type="text"
                      disabled={true}
                      value={moment(open_date.endTime).format('h:mm a')}
                    />
                  </Col>
                  <Col className="col-md-1 col-1">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => this.handleDelete(index)}
                      style={{ cursor: 'pointer', height: '1.3em', width: '2em', color: 'red', margin: '5px', marginTop: '15px' }}
                    />
                  </Col>
                </Row>
              </div>
            )
          })
        }
        {listing &&
          <NavigationButtons
            routeNext={retrieveRoute()}
            nextText='Skip'
            showNext={!listing.price}
          />
        }
      </div>
    )
  }
}

OpenHouseDatesContainer.propTypes = {
  listing: PropTypes.object,
  user: PropTypes.object,
  openHouseDates: PropTypes.object,
  propertyId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  retrieveOpenHouseDates: PropTypes.func,
  retrieveListing: PropTypes.func,
  createOpenHouseDates: PropTypes.func,
  selectOpenHouseDates: PropTypes.func,
  deleteOpenHouseDate: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenHouseDatesContainer)
