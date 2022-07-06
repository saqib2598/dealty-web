import React from 'react'
import { Link } from '../routes'
import { Button } from 'reactstrap'
import CurrencyFormat from 'react-currency-format'

const ListingButton = ({ listing }) => {
  return(
    <Link route={`/seller/property/${listing.id}/set-price`} passHref>
      <Button
        color="primary"
        size="lg" block>
        {listing.price > 0 ?
          <CurrencyFormat value={listing.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          :
          'Set A Price & List My Home'
        }
      </Button>
    </Link>
  )
}

export default ListingButton;
