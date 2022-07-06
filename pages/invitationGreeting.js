import React from 'react'
import NotificationPage from '../components/NotificationPage'
import { Link } from '../routes'

const InvitationGreeting = () => {
  const message = <>You have already accepted your invitation.<br />
    Please Login now! 
    <Link href='/login'> Log in</Link><br />
    </>
  
  return(
    <NotificationPage
      wish="Thank You!"
      message={message}
     />
  )
}

export default InvitationGreeting