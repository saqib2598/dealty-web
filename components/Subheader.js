import React from 'react'
import { Link } from '../routes'
import Step1 from './images/step1'
import Step2 from './images/step2'
import Step3 from './images/step3'
import Step4 from './images/step4'
import Step5 from './images/step5'

const Subheader = ({title, step}) => (
  <div className={step === '4' ?  ('subheader step4') : ('subheader')}>
    <h1>{title}</h1>

    {step === '1' && <Step1 /> }
    {step === '2' && <Step2 /> }
    {step === '3' && <Step3 /> }
    {step === '4' && <Step4 /> }
    {step === '5' && <Step5 /> }
    <style jsx>{`
      .subheader{
        width: 100%;
        text-align: center;
        background: #24292d;
        color: #fff;
        position: relative;
        z-index: 1;
        padding: 0px 20px 40px 20px;
        margin: 0 0 120px 0;
      }
      .subheader:after{
        background: #24292d;
        bottom: 0;
        content: '';
        display: block;
        height: 50%;
        left: 0;
        position: absolute;
        right: 0;
        transform: skewY(-11deg);
        transform-origin: 100%;
        z-index: -1;
        padding-top: 140px;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
      }
      .subheader.step4{
         margin: 0;
         padding: 0px 20px 60px 20px;
       }
      .subheader.step4:after{
        transform: skewY(0) !important;
        height: 82px;
        padding: 0;
        bottom:-82px;
      }
      h1{
        margin: 0 0 10px 0;
        font-size:26px;
        text-transform: uppercase;
      }
      .subheader :global(svg){
        max-width:100%;
      }
      @media (min-width: 480px){
        .subheader{
          padding: 35px 0 40px 0;
          margin: 0 0 90px 0;
        }
        .subheader:after{
          transform: skewY(-2deg);
        }
        .subheader.step4{
         margin: 0;
         padding: 0px 20px 90px 20px;
       }
        .subheader.step4:after{
          transform: skewY(0) !important;
        }
      }
    `}</style>
  </div>
)

export default Subheader
