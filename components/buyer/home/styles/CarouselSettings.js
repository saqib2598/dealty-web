import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const NextArrow = ({ className, style, onClick }) => (
  <FontAwesomeIcon className={className} style={{ ...style, display: 'block', background: '#007893', color: 'white', borderRadius: 25, width: 20, height: 20, padding: 2, paddingLeft: 3 }} onClick={onClick} icon={faAngleRight} />
);

const PrevArrow = ({ className, style, onClick }) => (
  <FontAwesomeIcon className={className} style={{ ...style, display: 'block', background: '#007893', color: 'white', borderRadius: 25, width: 20, height: 20, padding: 2, paddingRight: 3 }} onClick={onClick} icon={faAngleLeft} />
);

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
      }
    },
    {
      breakpoint: 767,
      settings: {
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false,
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
      }
    }
  ]
}

export default settings