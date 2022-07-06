import React from 'react'
import { NavItem, NavLink } from 'reactstrap'
import PropTypes from 'prop-types'

const tab = props => (
  <>
    <NavItem>
      <NavLink
        className={props.class ? 'active' : null}
        onClick={props.clicked} >
        {props.label}
      </NavLink>
    </NavItem>
    <style jsx='true'>{`
      :global(.nav-item) {
        cursor: pointer;
      }
    `}</style>
  </>
)

tab.propTypes = {
  class: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired
}

export default tab;
