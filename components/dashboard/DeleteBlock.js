import React from 'react'
import { Button } from 'reactstrap'

const DeleteBlock = ({ title, icon, handleOnClick, isSold }) => (
  <div className="wrapper lg">
    <div className="d-sm-flex justify-content-sm-between">
      <h3>
        <img
          alt="Icon"
          title="Icon"
          className="icon"
          src={`/static/images/${icon}.svg`} />
        {title}
      </h3>
        <div>
          <Button color="danger" block onClick={handleOnClick} disabled={isSold}>Delete</Button>
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
        max-width: 160px;
        min-width:160px;
        margin: 0 auto;
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
        .wrapper :global(.btn){
          margin: 0;
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
      }
    `}</style>
  </div>
)

export default DeleteBlock