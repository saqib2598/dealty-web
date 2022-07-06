import React from 'react'
import { Button } from 'reactstrap'
import { Link } from '../../routes'
import MediaQuery from 'react-responsive'

const DashboardBlock = ({ title, path, icon, completed, subtext, questionCount, answerCount, hideProgressBar, percentage, isSold }) => (
  <div className="wrapper lg">
    <div className="d-sm-flex justify-content-sm-between">
      <h3>
        {completed ? (
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
        {subtext && <small>{subtext}</small>}
      </h3>
      <div>
        <Link route={path}  passHref>
          {completed ? (
            <Button color="success" disabled={isSold} outline block>Review</Button>
          ) : (
            <Button color="info" disabled={isSold} block>Start</Button>
          )}
        </Link>
      </div>
    </div>

    {(!hideProgressBar && !completed && percentage !== '100%') &&
      <div className="d-sm-flex justify-content-sm-between">
        <MediaQuery minWidth={768}>
          <div className="progress-bar">
            <div className="marker" />
            <div className="progress" />
          </div>
          <div className="count ">{answerCount} of {questionCount}</div>
        </MediaQuery>
      </div>
    }

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
        .progress-bar{
          height:4px;
          width: 100%;
          position: relative;
          background: #c6f1f3;
          z-index:1;
          margin: 31px 0 0 0;
        }
        .marker{
          width: 16px;
          height: 16px;
          background: $teal;
          position: absolute;
          left: ${percentage};
          top:-6px;
          border-radius:50%;
          z-index:10;
        }
        .progress{
          width:${percentage};
          height: 4px;
          display:block;
          background: $teal;
          position: absolute;
          left: 0;
          top:0px;
          z-index:10;
        }
      }
    `}</style>
  </div>
)

export default DashboardBlock
