import React from 'react'
import { Form } from 'react-final-form'
import { withRouter } from 'next/router'
import { Container } from 'reactstrap'
import { Router } from '../../../routes'
import SearchForm from '../../../components/buyer/home/SearchForm'

class SearchContainer extends React.Component {

  constructor(props){
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onSubmit = (values) => {
    const form = document.getElementsByTagName('form')[0]
    const data = new FormData(form)
    const search = data.get('search')
    return search ? Router.push(`/buy/homes/${search}`) : ''    
  }

  handleKeyPress = event => {
    if (event.key == 'Enter') {
      event.target.value && Router.push(`/buy/homes/listings?place=${event.target.value}`)
    }
  };

  render() {
    return (
      <Container>
        <div className="top-banner-search">
          <h3 className="search__title text-center">Find your dream home at the touch of a button</h3>
          <Form
            component={SearchForm}
            onSubmit={this.onSubmit}
            onKeyPress={this.handleKeyPress}
          />
        </div>
      </Container>
    )
  }
}

export default withRouter(SearchContainer)
