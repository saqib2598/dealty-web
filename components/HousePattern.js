import React from 'react'

const HousePatternSvg = () => (
  <div className="animated-house">
    <style jsx>{`
      @import "styled-jsx-helper";

      @keyframes animatedBackground {
        from { background-position: 0 0; }
        to { background-position: 100% 0; }
      }

      .animated-house{
        z-index:1;
        width: 100%;
        bottom: 0;
        left:0;
        background-image: url(/static/images/house-pattern.svg);
        background-repeat: repeat-x;
        background-size: 600px 268px;
        background-position: bottom center;
        animation: animatedBackground 60s linear infinite;
        height: 268px;
        color:$primary;
      }

    `}</style>
  </div>
)

export default HousePatternSvg


