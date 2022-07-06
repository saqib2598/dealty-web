import React from 'react'
import {
  FormGroup,
  Button
} from 'reactstrap'
import { Link } from '../routes'

const UnSignedInUser = () => {
  return(
    <>
      <p>
        Uh oh! It looks like you don't have an account with Dealty. To contact, please make a free profile today.
      </p>
      <FormGroup>
        <Link route={localStorage.setItem('redirectUrl', window.location.pathname) || "/sign-up"}>
          <Button
            size="lg"
            color="primary"
            block
          >Sign Up Free!</Button>
        </Link>
      </FormGroup>
      <FormGroup>
        <Link route="/login" passHref>
          <Button
            size="lg"
            color="secondary"
            block
          >Already Have an Account? Log In</Button>
        </Link>
      </FormGroup>
    </>
  )
}
export default UnSignedInUser
