import { Router } from '../routes'
import { hoistStatics, lifecycle } from 'recompose'
import { USER_HOME_PATH } from '../modules/users'
import { isSignedIn } from './session'

const componentDidMount = function () {
  if (isSignedIn()) {
    Router.replaceRoute(USER_HOME_PATH)
  }
}

export default hoistStatics(
  lifecycle({ componentDidMount })
)
