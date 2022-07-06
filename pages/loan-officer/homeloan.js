import React from 'react'
import LoanOffcierContainer from '../../containers/loan-officer/LoanOfficerContainer'
import Layout from '../../components/Layout'
import PropTypes from 'prop-types'

class HomeLoanOffcier extends React.PureComponent {
  render() {
    return (
      <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
        <LoanOffcierContainer userId={this.props.query} />
      </Layout>
    )
  }

  static getInitialProps({ query }) {
    return { query }
  }
}

HomeLoanOffcier.propTypes = {
  query: PropTypes.array.isRequired,
}

export default HomeLoanOffcier
