import React, { Component } from "react"
 
import { initGA, logPageView } from "./GoogleAnalytics.js"
 
export default class AnalyticsLayout extends Component {
  componentDidMount () {
    if (!window.GA_INITIALIZED) {
      initGA(this.props.ga_key)
      window.GA_INITIALIZED = true
    }
    logPageView()
  }
 
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}