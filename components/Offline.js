import React from 'react'
import { Offline } from "react-detect-offline";
import OfflineSvg from '../components/images/offline'

const offlineState = () => (
  <Offline>
    <div>
      <OfflineSvg />
      <h1>You are offline</h1>
    </div>
    <style jsx="true">{`
    div {
      position: fixed;
      background: #EEEEEE;
      opacity: 0.9;
      z-index: 101;
      width: 100%;
      height: 100%;
      text-align: center;
      :global(svg) {
        width: 15%;
        height: auto;
        margin-top: 10%;
      }
    }
    `}</style>
  </Offline>
)

export default offlineState;
