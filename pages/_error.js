import React from 'react'
import { Link } from '../routes'
import { Container, Button, Row } from 'reactstrap'

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render404() {
    return (
      <div className="error-wrapper text-center d-flex flex-row justify-content-center align-content-center align-items-center h-100">
        <Container className="text-center">
          <Row className="flex-column">
            <div>
              <h1 className="mt-5 mb-3 mx-auto d-block">Page Not Found</h1>
            </div>
            <h4 className="mb-4 mx-auto  d-block">We can't seem to find the page you're looking for or this page does not exist.</h4>
            <div className="d-block w-100">
              <Link route="dashboard/index" passHref>
                <Button
                  size="lg"
                  color="primary">
                  Back to Home
                </Button>
              </Link>
            </div>
          </Row>
        </Container>
      </div>
    )
  }

  render500() {
    return (
      <div className="error-wrapper text-center d-flex flex-row justify-content-center align-content-center align-items-center h-100">
        <Container className="text-center">
          <Row className="flex-column">
            <h1 className="mb-3 mx-auto  d-block">Internal Server Error</h1>
            <h4 className="mb-4 mx-auto  d-block">Something went wrong. Please contact the support.</h4>
          </Row>
        </Container>
      </div>
    )
  }

  renderDefault() {
    return (
      <div className="error-wrapper text-center d-flex flex-row justify-content-center align-content-center align-items-center h-100">
        <Container className="text-center">
          <Row className="flex-column">
            <h1 className="mb-3 mx-auto  d-block">Error</h1>
            <h4 className="mb-4 mx-auto  d-block">
              {this.props.statusCode
                ? `An error ${this.props.statusCode} occurred on server`
                : 'An error occurred on client'}
            </h4>
          </Row>
        </Container>
      </div>
    )
  }

  render() {
    if(this.props.statusCode == 404) return this.render404()
    else if(this.props.statusCode >= 500 && this.props.statusCode <= 599) return this.render500()
    else return this.renderDefault()
  }
}
