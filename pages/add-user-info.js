import Head from 'next/head'
import React from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import AddBuyerInfoContainer from '../containers/users/AddBuyerInfoContainer'
import AddSellerInfoContainer from '../containers/users/AddSellerInfoContainer'
import { selectUser } from '../modules/users'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  user: selectUser(state)
})

const AddUserInfo = (user) =>{
  const router = useRouter();
  const user_id = router.query.user_id;

  return (
    <>
      <Head>
        <title>Welcome - Complete Your Profile</title>
      </Head>
      <div className="center">
        <div className="wrapper md">
            <AddSellerInfoContainer userId={user_id}/>
        </div>
      </div>
    </>
  );
}

AddUserInfo.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps, null)(AddUserInfo)
