import React from 'react'
import { Button } from 'reactstrap'
import { Link } from '../../routes'

class CommunityInformationBlock extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { communityInfoAdded, icon, type, route, isSold, title} = this.props
    return(
      <div className="wrapper lg">
        <div className="d-sm-flex justify-content-sm-between">
          <h3>
            {communityInfoAdded ? (
              <img
                alt="Icon"
                title="Icon"
                className="icon"
                src={`/static/images/icon-completed.svg`}/>
            ) : (
              <img
                alt="Icon"
                title="Icon"
                className="icon"
                src={`/static/images/${icon}.svg`} />
            )}
            {title}
          </h3>
          <div>
            <Link route={`${route}`}  passHref>
              {communityInfoAdded ?
                <Button color="success" disabled={isSold} outline>View {type}</Button> 
                : 
                <Button color="info" disabled={isSold}>Update {type}</Button>
              }
            </Link>
          </div>
        </div>

        <style jsx>{`
          @import "styled-jsx-helper";

          .wrapper{
            text-align:center;
          }
          .wrapper :global(h3){
            margin: 0 auto;
            padding: 0 0px 20px 0;
            line-height: 1.4;
            font-size:24px;
          }
          h3 small{
            margin-left: 15px;
            color: $primary;
            font-size: 18px;
          }
          .wrapper :global(.icon){
            width:40px;
            height: 40px;
            margin: 0 auto 10px auto;
            display: block;
            clear: both;
            padding: 0;
          }
          .wrapper :global(.btn){
            min-width: 220px;
            display: block;
            margin: 0 auto 20px auto;
          }
          .wrapper :global(.btn-outline-success){
            border-width: 2px !important;
          }
          .count{
            font-size:18px;
            font-weight: bold;
            white-space: nowrap;
            margin: 20px 0 0 20px;
          }
          @include media-breakpoint-up(sm) {
            .wrapper{
              text-align:left;
            }
            .wrapper :global(h3){
              margin: 0;
              padding: 8px 10px 0 0;
            }
            .wrapper :global(.btn + .btn){
              margin: 20px 0 0 0;
            }
            .wrapper :global(.icon){
              margin: 0 20px 0 0 ;
              clear:none;
              display:inline-block;
            }
          }
          @include media-breakpoint-up(md) {
            .wrapper :global(h3){
               font-size:28px;
            }
            .wrapper :global(.btn){
              margin: 0 0 0 20px;
              display:inline-block;
              min-width: 160px;
            }
            .wrapper :global(.btn + .btn){
              margin: 0 0 0 20px;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default CommunityInformationBlock
