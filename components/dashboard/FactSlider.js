import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Carousel, CarouselControl, CarouselItem } from 'reactstrap'
import { retrieveListingFacts, selectListingFacts } from '../../modules/listings'

const FlagIcon = () => (
  <img
    alt="Flag Icon"
    title="Flag Icon"
    src="/static/images/flag-icon.svg"
    className="flag-icon"
  />
)

const mapDispatchToProps = { retrieveListingFacts }

const mapStateToProps = (state) => ({
  facts: selectListingFacts(state)
})

class FactSlider extends Component {
  componentDidMount() {
    const { retrieveListingFacts, listing } = this.props
    retrieveListingFacts(listing)
  }

  constructor(props) {
    super(props)
    this.state = { activeIndex: 0 }
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.goToIndex = this.goToIndex.bind(this)
    this.onExiting = this.onExiting.bind(this)
    this.onExited = this.onExited.bind(this)
  }

  onExiting() {
    this.animating = true
  }

  onExited() {
    this.animating = false
  }

  next() {
    if (this.animating) return
    const { facts } = this.props
    const nextIndex = this.state.activeIndex === facts.length - 1 ? 0 : this.state.activeIndex + 1
    this.setState({ activeIndex: nextIndex })
  }

  previous() {
    if (this.animating) return
    const { facts } = this.props
    const nextIndex = this.state.activeIndex === 0 ? facts.length - 1 : this.state.activeIndex - 1
    this.setState({ activeIndex: nextIndex })
  }

  goToIndex(newIndex) {
    if (this.animating) return
    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state
    const { facts, listing } = this.props

    let slides
    if (listing.status === 'pending' || listing.price == null)  {
      slides = facts.map((fact) => {
        return (
          <CarouselItem
            onExiting={this.onExiting}
            onExited={this.onExited}
            key={fact.id}
          >
            <p>{fact.content}</p>
          </CarouselItem>
        )
      })
    }

    return (
      <section className="facts text-center">
          <FlagIcon />
          {listing.status !== 'pending' && listing.price > 0 ?
            <p>Your listing has been viewed <span className="text-primary">{listing.views}</span> times</p>
            :
            <Carousel
              activeIndex={activeIndex}
              next={this.next}
              previous={this.previous}
            >

              {slides}
              <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
              <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
          }

        <style jsx>{`
          @import "styled-jsx-helper";
          .facts{
            width: 100%;
            margin: 0 auto 60px auto;
            padding: 30px 15px;
            position: relative;
            background: #fff;
            box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
            border-radius: 0px;
            max-width: 100%;
            top:0;
            z-index:10;
          }
          .facts:before{
            content: '';
            width: 128px;
            height: 128px;
            margin-left: -64px;
            background: #fff;
            border-radius: 50%;
            position: absolute;
            top: -50px;
            left: 50%;
            z-index: 0;
          }
          .facts :global(.flag-icon){
            width: 40px;
            height: 40px;
            display: block;
            position: absolute;
            margin-left: -20px;
            top: -25px;
            left: 50%;
            z-index: 2;
          }
          .facts :global(p){
            margin: 0;
            z-index: 100;
            position: relative;
          }
          @include media-breakpoint-up(md) {
            .facts{
              padding: 60px;
              max-width:980px;
              margin: 0 auto;
              top:-85px;
              margin-bottom: -45px;

            }
          }
          @include media-breakpoint-up(lg) {
            .facts{
              border-radius: 10px;
            }
          }
        `}</style>
      </section>
    )
  }
}

FactSlider = connect(mapStateToProps, mapDispatchToProps)(FactSlider)

export default FactSlider
