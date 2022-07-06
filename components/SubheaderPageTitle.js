import React from 'react'

const SubheaderPageTitle = ({ title, subTitle, color="#007793", headerColor="white" }) => (
  <div className="page-title">
    <h1>{title}</h1>
    <h2>{subTitle}</h2>
    <style jsx>{`
      @import "styled-jsx-helper";
      .page-title{
        background: ${color};
        width: 100%;
        clear: both;
        text-align: center;
        padding: 10px 15px 15px 15px;
      }
      h1{
        color: ${headerColor};
        margin: 0 auto;
        font-size:36px;
      }
      h2{
        color: #ffff;
        margin: 0 auto;
        font-size:25px;
      }
      @include media-breakpoint-up(md) {
        h1{
          font-size:50px;
        }
      }
    `}</style>
  </div>
)

export default SubheaderPageTitle
