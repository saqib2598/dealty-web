import React from 'react';
import { Form, Row, Col, Button } from 'reactstrap';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';

import { fields } from '../../../static/data/home_constants';

export const filterForm = (props) => {

  return (
    <div className='filter-form-directory'>
      <Form onSubmit={props.handleSubmit}>
        <Row>
          {fields.map((field) => (
            <Col md='3' key={field.name}>
              <b>{field.label}</b>
              <div className='search-row'>
                <Field
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  options={field.options}
                  component={field.adapter}
                />
              </div>
            </Col>
          ))}
        </Row>
        <div className='center-button'>
          <Button type='submit'>Search</Button>
        </div>
      </Form>
    </div>
  );
};

filterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
