import React from 'react';
import { FormFeedback, FormGroup, Label } from 'reactstrap'
import PropTypes from 'prop-types'
import PlacesAutocomplete from 'react-places-autocomplete'
import MediaQuery from 'react-responsive'
class AddressAdapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }
  componentDidMount () {
    const { id, keyword } = this.props
    if( id == 'place' ){
      this.setState({ address: keyword })
    }
  }
  componentDidUpdate(prevProps) {
    const { id, keyword } = this.props
    if ((keyword !== prevProps.keyword) && id == 'place') {
      this.setState({ address: keyword })
    }
  }
  handleChange = address => {
    this.setState({ address });
  };
  handleSelect = ( address ) => {
    this.setState({ address: address})
    this.props.handleSelect(address)
  }
  renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions }) =>
  {
    let style = {}
    if( this.props.id == 'address' ){
      style = { width: '35%' }
    } else {
      style = { width: '90%' }
    }
    return(
      <div className="autocomplete-root">
        <input {...getInputProps({
            placeholder: this.props.placeholder,
            autoComplete: 'off',
            id: this.props.id,
            name: this.props.input.name,
            onKeyDown: e => {
              this.props.inputOnKeyPress && this.props.inputOnKeyPress(e);
            },
            className: "form-control",
          }
        )} />
        <MediaQuery minWidth={768}>
          <div className= "autocomplete-dropdown-container" style= {(suggestions.length > 0) ? Object.assign({border: "1px solid rgb(85, 85, 85)", position: "absolute", background: 'white', zIndex: '1'}, style) : {display: 'none'}}>
            {suggestions.map(suggestion => {
                const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer', color: '#5e6a76', margin: '15px', fontFamily: 'inherit', fontSize: '1rem', display: 'block' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer', color: '#5e6a76', margin: '15px', fontFamily: 'inherit', fontSize: '1rem', display: 'block' };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    { suggestion.description }
                  </div>
                );
            })}
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={767}>
          <div className= "autocomplete-dropdown-container" style= {(suggestions.length > 0) ? {border: "1px solid rgb(85, 85, 85)", position: "absolute", background: 'white', width: '100%', zIndex: '1'} : {display: 'none'}}>
            {suggestions.map(suggestion => {
                const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer', color: '#5e6a76', margin: '15px', fontFamily: 'inherit', fontSize: '1rem', display: 'block' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer', color: '#5e6a76', margin: '15px', fontFamily: 'inherit', fontSize: '1rem', display: 'block' };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    { suggestion.description }
                  </div>
                );
            })}
          </div>
        </MediaQuery>
      </div>
    )
  }
  render() {
    const {
      input,
      meta,
      classes,
      options,
      label,
      addProperty,
    } = this.props;
    const hasError = Boolean(meta.touched && (meta.error || meta.submitError))
    const searchOptions = {
      componentRestrictions: {country: "us"}
    };
    return (
      <FormGroup className="address-adapter">
        <Label>{label}</Label>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          searchOptions={searchOptions}
        >
          {this.renderFunc}
        </PlacesAutocomplete>
        {hasError &&
          <FormFeedback>{meta.error || meta.submitError}</FormFeedback>
        }
      </FormGroup>
    );
  }
}
AddressAdapter.propTypes = {
  input: PropTypes.object.isRequired,
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
}
export default AddressAdapter