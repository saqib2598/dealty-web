import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import BottomCTA from '../../../components/buyer/home/BottomCTA'
import TopSection from '../../../components/buyer/home/TopSection'
import FeaturedHomes from '../../../components/buyer/home/FeaturedHomes'
import NewlyListedHomes from '../../../components/buyer/home/NewlyListedHomes'
import Layout from '../../../components/Layout'
import Loading from '../../../components/Loading'
import OpenGraphMeta from '../../../components/OpenGraphMeta'
import { isSignedIn as hasCredentials } from '../../../lib/session'
import { getBaseUrl } from '../../../lib/utils'
import { selectIsSignedIn, selectUser } from '../../../modules/users'
import { retrieveHomes, selectFeaturedHomes, selectNewHomes } from '../../../modules/homes'
import UpdateAccountModal from '../../../components/modals/UpdateAccount'
import { CanonicalTag } from '../../../components/SEO/CanonicalTag'

const mapDispatchToProps = { retrieveHomes }

const mapStateToProps = (state) => ({
  selectIsSignedIn,
  isSignedIn: hasCredentials(state),
  featuredHomes: selectFeaturedHomes(state),
  newHomes: selectNewHomes(state),
  user: selectUser(state)
})

class Index extends React.PureComponent {
  state = {
    loading: true,
    updateAccountModalVisible: true
  }

  toggleUpdateAccountModal = () => {
    this.setState((prevState) => {
      return { updateAccountModalVisible: !prevState.updateAccountModalVisible }
    })
  }

  async componentDidMount() {
    const { retrieveHomes } = this.props
    try {
      await retrieveHomes()
      this.setState({ loading: false })
    } catch (error) {
      this.setState({ loading: false })
    }
  }

  render() {
    const { baseUrl, path, isSignedIn, featuredHomes, newHomes, user, filter } = this.props
    const { loading, updateAccountModalVisible } = this.state

    return (
    
      <div className="home">
        { user && user.email && user.email.startsWith("dealty") &&
          <UpdateAccountModal
            isOpen={updateAccountModalVisible}
            toggleUpdateAccountModal={this.toggleUpdateAccountModal}
          />
        }
        <CanonicalTag title='Dealty | Buy Your Home' link='https://yourdealty.com/buy/' />
        <OpenGraphMeta
          baseUrl={baseUrl}
          path={path}
        />
        {loading ? (
          <Loading />
        ) : (
            <Layout isBuyer={true}>
              <TopSection
                isSignedIn={isSignedIn}
                filter={filter}
              />
              <FeaturedHomes homes={featuredHomes.slice(0, 4)} />
              <NewlyListedHomes homes={newHomes} />
              <BottomCTA isSignedIn={isSignedIn} />
            </Layout>
          )
        }
      </div>
    )
  }
}

Index.getInitialProps = ({ req, query }) => {
  if (!req) {
    return {}
  }

  return {
    baseUrl: getBaseUrl(req),
    path: req.path,
    filter: query.filter,
  }
}

Index.propTypes = {
  retrieveHomes: PropTypes.func.isRequired,
  baseUrl: PropTypes.string,
  path: PropTypes.string,
  featuredHomes: PropTypes.array,
  isSignedIn: PropTypes.bool.isRequired,
  newHomes: PropTypes.array,
  user: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
