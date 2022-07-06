import React from 'react'
import { ModalBody, Modal, ModalHeader, Table } from 'reactstrap'

const Licences = ({ ShowSellerDetails, toggleSellerDetails, sellerDetails }) => {

  return(
    <Modal size="lg" isOpen={ShowSellerDetails} >
      <ModalHeader toggle={toggleSellerDetails}></ModalHeader>
      <ModalBody>
        <Table>
          <thead>
            <tr className="licence_table">
              <th>State</th>
              <th>License Number</th>
            </tr>
          </thead>
          {
            sellerDetails && sellerDetails.map((sellerDetail, index)=>
              <tbody key={index}>
                <tr className="licence_table">
                  <td>{sellerDetail.state}</td>
                  <td>{sellerDetail.agentLicenseNumber}</td>
                </tr>
              </tbody>
            )
          }
        </Table>
      </ModalBody>
      <style jsx>{`
        @import "styled-jsx-helper";
        :global(.modal-content){
          padding: 25px;
        }
        .modal-heading{
          font-size: 27px;
          text-align: center;
          color: $title-light-color;
          padding-top: 5px;
          padding-bottom:10px;
        }
        tr:nth-child(even)
        {
          background-color: #f2f2f2;
        }
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
        .licence_table{
          text-align: center;
        }
      `}</style>
    </Modal>
  )
}

export default Licences
