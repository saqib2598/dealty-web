import React from 'react'
import { Form } from 'react-final-form'
import { Row, Col, Input } from 'reactstrap'
import { connect } from 'react-redux'
import ChangeAgentProfileForm from '../../components/users/ChangeAgentProfileForm'
import { mapFinalFormErrors } from '../../lib/utils'
import { createSellerDetail, deleteSellerDetail, retrieveSellerDetails, getSellerDetail } from '../../modules/sellerDetails'
import { required } from '../../lib/validators'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const mapDispatchToProps = { createSellerDetail, deleteSellerDetail, retrieveSellerDetails }
const mapStateToProps = (state) => ({
  sellerDetails: getSellerDetail(state)
});
const mapErrors = mapFinalFormErrors('Failed to change Profile')

class ChangeAgentProfileContainer extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      alert: null,
      visible: false,
      formKey: 0
    }
  }

  async componentDidMount() {
    const { retrieveSellerDetails } = this.props
    await retrieveSellerDetails()
  }

  closeAlertLater = (val) => {
    this.setState({ visible: true }, ()=>{
      setTimeout(() =>{
        this.setState({ visible: false })
      }, 3000)
    });
  }

  onSubmit = async ( values ) => {
    const { createSellerDetail } = this.props
    try{
      await createSellerDetail(values)
      setTimeout(()=>{
        this.setState(prevState => {return {formKey: prevState.formKey + 1}})
      }, 3000)
      this.closeAlertLater('success')
    }
    catch (error) {
      return mapErrors(error)
    }
  }

  handleDelete = async(index) => {
    const { sellerDetails, deleteSellerDetail } = this.props
    const obj = sellerDetails.seller_details[index]
    try{
      await deleteSellerDetail(obj.id)
    } catch (error) {
      return mapErrors(error)
    }
  }

  render() {
    const { alert, visible, formKey } = this.state
    const { user, sellerDetails } = this.props

    return (
      <div>
        <Form
          component={ChangeAgentProfileForm}
          onSubmit={this.onSubmit}
          validate={this.validate}
          alert={alert}
          visible={visible}
          user={user}
          key={formKey}
        />
        {
          sellerDetails.seller_details && sellerDetails.seller_details.map(( profile, index )=>{
            return(
              <div key= {index}>
                <Row style={{margin: '5px'}}>
                  <Col className="col-md-5 col-4">
                    <Input
                      id="state"
                      name="state"
                      type="text"
                      disabled={true}
                      value={profile.state}
                    />
                  </Col>
                  <Col className="col-md-5 col-5 license_num">
                    <Input
                      id="licenseNum"
                      name="licenseNum"
                      type="text"
                      validate={required}
                      disabled={true}
                      value={profile.agentLicenseNumber}
                    />
                  </Col>
                    <Col className="col-md-1 col-1">
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={()=>this.handleDelete(index)}
                        style={{ cursor: 'pointer', height: '1.3em', width: '2em', color: 'red', margin: '5px', marginTop: '15px' }}
                      />
                    </Col>
                </Row>
              </div>
            )
          })
        }
        <style jsx>{`
        @media only screen and (max-width: 767px) {
          .license_num{
            padding: 0px;
          }
        }
        `}</style>
      </div>
    )
  }
}

ChangeAgentProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ChangeAgentProfileContainer)
export default ChangeAgentProfileContainer
