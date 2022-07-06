import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

export const CanonicalTag = (props) => (
  <Helmet>
    <title>{props.title}</title>
    <link rel='canonical' href={props.link} />
  </Helmet>
);

CanonicalTag.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
