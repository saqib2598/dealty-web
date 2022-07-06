import React from 'react'
import { Button } from 'reactstrap'
import ListingButton from './ListingButton'


class HeaderActions extends React.Component {

  render() {
    const { listing, handleOnClick } = this.props

    return (
      <div>
        <ListingButton listing={listing} />
        <br/>
        <Button
          color="primary"
          size="lg" block
          onClick={handleOnClick}
        >
          Change Status
        </Button>
      </div>
    );
  }
}

export default HeaderActions;
