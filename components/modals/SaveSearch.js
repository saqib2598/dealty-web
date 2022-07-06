import React from 'react';
import {ModalBody, Modal, ModalHeader, Button, ModalFooter, Input, Col, Row, Form} from 'reactstrap';
import PropTypes from 'prop-types';

import SelectAdapter from '../SelectAdapter';
import InputAdapter from '../InputAdapter';

const SaveSearch = ({toggleSaveSearch, ShowSaveSearch, handleNameSubmit, handleUpdateChange, handleSaveSearchClick}) => {
  return (
    <Form>
      <Modal size="lg" isOpen={ShowSaveSearch} toggle={toggleSaveSearch} className="save-search-modal">
        <ModalHeader toggle={toggleSaveSearch}></ModalHeader>
        <ModalBody>
          <h3 className="heading-tag">Save Your Search</h3>
          <p>Save a Search and get instant notifications on mobile phone and via email about new listings and status changes
              on homes that match your search criteria.
          </p>
          <Row>
            <p className="col-md-4 saved-search-label"><b>Nickname of the Search</b></p>
            <Col className="col-md-6">
              <Input
                id="save-search-input"
                name="save-search-input"
                placeholder="Name your search .. "
                component={InputAdapter}
                onChange={handleNameSubmit}
              />
            </Col>
          </Row>
          <Row>
            <Col className="col-md-4"><p className="saved-search-label"><b>Frequency</b></p></Col>
            <Col className="col-md-6">
              <Input
                id="searchUpdate"
                name="searchUpdate"
                type="select"
                component={SelectAdapter}
                onChange={handleUpdateChange}
              >
                <option>Select Update Frequency</option>
                <option value="instant">Instant Update</option>
                <option value="daily">Daily Update</option>
                <option value="weekly">Weekly Update</option>
                <option value="monthly">Monthly Update</option>
                <option value="never">Never</option>
              </Input>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button className='save_search_btn' color="primary" type="submit" onClick={()=>handleSaveSearchClick()}>Save Search</Button>
          <Button color="gray-light" onClick={toggleSaveSearch}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Form>
  );
};

SaveSearch.propTypes = {
  toggleSaveSearch: PropTypes.func,
  ShowSaveSearch: PropTypes.bool,
  handleNameSubmit: PropTypes.func,
  handleUpdateChange: PropTypes.func,
  handleSaveSearchClick: PropTypes.func,
};

export default SaveSearch;
