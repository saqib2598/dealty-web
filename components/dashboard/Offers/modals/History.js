import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Loading from '../../../Loading'
import { Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap'

const history = props => {
  const { history, showHistoryModal, closeModal, heading, loading } = props;
  let persons = {}
  history.persons && history.persons.map( p => persons[p.id] = p.fullName)

  return (
    <div>
      <Modal size="lg" isOpen={showHistoryModal}>
        {loading ?
          <>
            <ModalHeader toggle={closeModal}></ModalHeader>
            <Loading />
          </>
          :
          <>
            <ModalHeader toggle={closeModal}></ModalHeader>
            <ModalBody style={{textAlign: 'center', maxHeight: '500px', overflowY: 'auto'}}>
              <Row>
                <Col style={{textAlign: 'center'}}>
                  <h4>{heading}</h4>
                  {history.versions && history.versions.map(version =>
                    <div key={version.id}>
                      {'createdAt' in version.objectChanges &&
                        <p>
                          {persons[version.whodunnit]} has sent a {version.objectChanges.offerType[1]} offer
                          &nbsp;of price {version.objectChanges.price[1]}
                          &nbsp;with closing date {moment(version.objectChanges.suggestedClosingDate[1]).format('l')}
                          &nbsp;at {moment(version.objectChanges.updatedAt[1]).format('lll')}
                        </p>
                      }
                      {(('price' in version.objectChanges ||
                        'offerType' in version.objectChanges ||
                        'suggestedClosingDate' in version.objectChanges) &&
                        !('createdAt' in version.objectChanges)) &&
                        <p>
                          {persons[version.whodunnit]} has countered offer by changing
                          {version.objectChanges.price && ` price to ${version.objectChanges.price[1]},`}
                          {version.objectChanges.offerType && ` offer type to ${version.objectChanges.offerType[1]},`}
                          {version.objectChanges.suggestedClosingDate && ` closing date to ${moment(version.objectChanges.suggestedClosingDate[1]).format('l')},`}
                          {` at ${moment(version.objectChanges.updatedAt[1]).format('lll')}`}
                        </p>
                      }
                      {version.objectChanges.state && ['accepted','rejected'].includes(version.objectChanges.state[1]) &&
                        <p>{persons[version.whodunnit]} has {version.objectChanges.state[1]} the offer at {moment(version.objectChanges.updatedAt[1]).format('l')}</p>
                      }
                    </div>)
                  }
                </Col>
              </Row>
            </ModalBody>
          </>
        }
      </Modal>
      <style jsx>{`
      @import "styled-jsx-helper";
      :global(.modal-header){
        border-bottom: none !important;
        margin-top: -58px;
        margin-bottom: -20px;
        margin-right: -54px;
      }
      :global(.close){
        border-radius: 50%;
      }
      .icon{
        text-align: center;
        padding-top: 35px;
      }
      :global(.modal-header .close){
        padding: 0;
        margin: 0px;
        opacity: 1;
        color: $white;
        background: $contact-homeowner-model-close;
        width: 40px;
        height: 40px;
        outline: none;
      }
      :global(.modal-header .close:hover,
        .modal-header .close:focus){
        opacity: 1 !important;
        color: $white !important;
      }
      :global(.modal-header .close span){
          text-shadow: none;
      }
    `}</style>
    </div>
  );
}

history.propTypes = {
  history: PropTypes.object.isRequired,
  showHistoryModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  heading: PropTypes.string,
  loading: PropTypes.bool.isRequired
}

export default history;
