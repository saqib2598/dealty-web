import React from 'react'
import UserImage from '../../UserImage'

const UserPubInfo = ({user, sellerType}) => {
  return(
    <div>
      <UserImage img={user && user.image}/>
      <h5 className="h5 contact__name"> {user.firstName}
        {!(sellerType.toLowerCase()=='homeowner' ) &&
            ' ' + user.lastName
        }
      </h5>
    </div>
  )
}

export default UserPubInfo
