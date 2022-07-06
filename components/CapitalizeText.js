import React from 'react';

class CapitalizeText extends React.Component {
  
  render() {
    const { text } = this.props
    if ( !text ) {
      return null
    }
    return (
      capitalize(text)
    )
  }
}

function capitalize(string)
{
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export default CapitalizeText;
