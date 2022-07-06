import React, {useState} from 'react'
import { 
  Button,
  Container
 } from 'reactstrap'
import { Link } from '../../../routes'
import MediaQuery from 'react-responsive'

import SearchContainer from '../../../pages/dashboard/searching/SearchContainer'

const TopSection = (props) => {
  return (
    <section className="top">
      <div className="top-banner-search">
        <h3 className="  text-center">
          Find your dream home at the touch of a button
        </h3>
        <SearchContainer filter={props.filter}/>
      </div>

      <MediaQuery maxWidth={767}>
        {!props.isSignedIn && (
          <Container>
            <hr className="solid-seprator" />
            <div className="text-wrap">
              <Link route="/" prefetch passHref>
                <Button size="lg" color="primary" outline block>
                  Sell Your Home
                </Button>
              </Link>
            </div>
          </Container>
        )}
      </MediaQuery>
    </section>
  );
};

export default TopSection