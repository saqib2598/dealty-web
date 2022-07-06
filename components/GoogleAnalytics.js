import ReactGA from "react-ga"
import makeStore from '../store'

export const initGA = (ga_key) => {
  ReactGA.initialize(ga_key)
}
 
export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}