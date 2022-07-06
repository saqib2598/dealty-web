import React from 'react'
import PropTypes from 'prop-types'

const userImage = ({img, printFlag}) => {
  const image = () => {
    let image='../../../static/images/user_account_pic.png'
    if (img) {
      image = img
    }
    return image;
  }
  return(
    <div style={{marginLeft: printFlag ? '350px' : ''}}>
        <div className="img-thumb"/>
        <style jsx>{`
          .img-thumb
          {
            background-image: url(${image().replace(/'/g, "\\'")});
          }
      `}</style>
    </div>
  )
}

userImage.propTypes = {
  img: PropTypes.string,
  printFlag: PropTypes.bool
}

export default userImage
