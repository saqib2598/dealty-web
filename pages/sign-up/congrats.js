import React from 'react'
import NotificationPage from '../../components/NotificationPage'

const congrats = () => {
  const message = <>An email confirmation has been sent to you.<br />
                  Confirm your email before continuing.<br /></>
  return(
    <NotificationPage
      wish="Congratulations!"
      message={message}
      regards="Thank you" />
  )
}
export default congrats
