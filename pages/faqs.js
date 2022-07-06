import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'

import Layout from '../components/Layout'
import SubheaderPageTitle from '../components/SubheaderPageTitle'
import { retrieveFaqs } from '../modules/faqs'
import FaqForm from '../components/faqs/faq'
import { CanonicalTag } from '../components/SEO/CanonicalTag'

const mapDispatchToProps = { retrieveFaqs }

const mapStateToProps = (state) => ({
  faqs_categories: state.faqs.faqs_categories
});

class Faqs extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeCategory: ''
    }
  }

  renderComponent(component) {
    this.setState({
      activeCategory: component
    })
  }

  async componentDidMount() {
    const { retrieveFaqs } = this.props
    const faqs_categories = await retrieveFaqs()
    faqs_categories.length > 0 && this.setState({ activeCategory: faqs_categories[0].category.name })
  }

  filter_faqs() {
    const { activeCategory } = this.state
    const { faqs_categories } = this.props
    let data = {
      rows: []
    }
    let faq_category = faqs_categories.filter((faq_category) => {
      return (
        faq_category.category.name == activeCategory
      )
    })
    faq_category.map((category) => {
      category.data.map((faq) => {
        data.rows.push({title: faq.question, content: faq.answer})
      })
    })
    return data
  }

  render() {
    const { activeCategory } = this.state
    const { faqs_categories } = this.props
    const faq_data = activeCategory != '' && this.filter_faqs()

    return (
      <Layout headerStyle="teal" bodyBg="light" footerStyle="white">
        <CanonicalTag title='Dealty | FAQs' link='https://yourdealty.com/faq' />
        <SubheaderPageTitle title="FAQs" />
        <Container className="faq" fluid>
          <Row>
            <Col xs="12" sm="3" lg="3">
              {faqs_categories.length > 0 &&
                <div className="wrapper custom-wrapper">
                  <div className="account-bar">
                    <h4 className="setting">Categories</h4>
                    <hr className="dashed" />
                    {
                      faqs_categories.map((faq_category, index) => {
                        return (
                          <div key={index}>
                            <strong><section id="profile" onClick={(e) => this.renderComponent(faq_category.category.name)} className={activeCategory == faq_category.category.name ? 'active' : null}>{faq_category.category.name}</section></strong>
                            <hr />
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              }
            </Col>
            {faq_data &&
              <FaqForm
                data={faq_data}
                message={faq_data.rows.length <=0 && 'No Questions in this Category'}
              />
            }
          </Row>
        </Container>
      </Layout>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Faqs);
