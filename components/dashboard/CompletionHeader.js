import React from 'react'
import MediaQuery from 'react-responsive'
import PropTypes from 'prop-types'

const CompletionHeader = ({ title, icon, questionsLength, currentQuestion, percentage }) => (
  <div className="completion-header">
    <h4>
      <img
        alt="Icon"
        title="Icon"
        className="icon"
        src={`/static/images/${icon}.svg`} />
      {title}</h4>
    <MediaQuery minWidth={768}>
      <div className="progress-bar">
        <div className="marker" />
        <div className="progress" />
      </div>
    </MediaQuery>
    <div className="count">{currentQuestion} of {questionsLength}</div>

    <style jsx>{`
      @import "styled-jsx-helper";

      .completion-header{
        background: #fff;
        width: 100%;
        clear: both;
        padding: 30px;
        margin: 0 0 40px 0;
        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
      }
      .completion-header :global(.icon){
        width:50px;
        height: 50px;
        margin: 0;
        float:right;
      }
      .completion-header :global(h4){
        margin: 0 0 5px 0;
        font-size:20px;
      }
      .count{
        font-size:18px;
        font-weight: bold;
        white-space: nowrap;
      }
      @include media-breakpoint-up(md) {
        .completion-header{
          margin: 0 0 80px 0;
          padding: 0 30px;
          height: 136px;
          display:flex;
          align-items: center;
          justify-content:space-between;
        }
        .completion-header :global(.icon){
          float: none;
          margin: 0 10px 0 0;
        }
        .completion-header :global(h4){
          margin: 0;
          line-height: 50px;
          white-space: nowrap;
        }
        .progress-bar{
          height:4px;
          width: 100%;
          position: relative;
          background: #c6f1f3;
          z-index:1;
          margin: 0 20px;
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
          width: ${percentage};
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

CompletionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  questionsLength: PropTypes.number.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  percentage: PropTypes.string.isRequired
}

export default CompletionHeader
