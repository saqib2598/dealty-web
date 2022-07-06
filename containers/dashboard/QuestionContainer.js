import CompletionHeader from "../../components/dashboard/CompletionHeader";
import QuestionForm from "../../components/dashboard/QuestionForm";
import { selectListing, retrieveListing } from "../../modules/listings";
import { Router } from "../../routes";
import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { updatePropertyDetail } from "../../modules/propertyDetail";
import { get, find } from "lodash";
import EstimatedPriceBar from "../../components/EstimatedPriceBar";
import {
  NoEstimatedPrice,
  AddressSection,
} from "../../components/EstPriceContainerComps";
import { Form } from "react-final-form";
import PropTypes from "prop-types";

const mapDispatchToProps = {
  updatePropertyDetail,
  retrieveListing,
};

const mapStateToProps = (state) => ({
  listing: selectListing(state),
});

let QuestionContainer = class QuestionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      currentPropertyDetail: null,
      questionsLength: props.questions.length,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.prevQuestion = this.prevQuestion.bind(this);
  }

  async componentDidMount() {
    const { questions, retrieveListing, propertyId, category } = this.props;
    const { currentQuestion, questionsLength } = this.state;
    try {
      const listing = await retrieveListing(propertyId);
      if (!listing.visibility) {
        Router.replace("/dashboard");
      }
      const question = questions[currentQuestion];
      const propertyDetail = find(listing.propertyDetail);
      const length =
        propertyDetail && propertyDetail.buildingType === "land" ? 4 : questionsLength;
      if (length == 2 && category != "confirm-home-info")
        return Router.pushRoute(`/seller/property/${listing.id}`).then(() =>
          window.scrollTo(0, 0)
        );
      this.setState({
        questionsLength: length,
        question: question,
      });
    } catch (error) {
      console.log(error);
    }
  }

  nextQuestion = (nextQuestionCount) => {
    const { questions, listing } = this.props;
    let { currentQuestion, questionsLength } = this.state;
    if (
      questions[currentQuestion].key == "buildingType"
    ) {
      if (listing.propertyDetail.buildingType === "land")
        this.setState({ questionsLength: 4 });
    }
    if (currentQuestion < questionsLength - 1) {
      currentQuestion = currentQuestion + nextQuestionCount;
    }
    const question = questions[currentQuestion];
    this.setState({
      currentQuestion: currentQuestion,
      question: question
    });
  };

  prevQuestion = () => {
    const { questions, listing } = this.props;
    let { currentQuestion } = this.state;
    let prevQuestionCount = 1;
    if (
      questions[currentQuestion].key === "pooltype" &&
      find(listing.propertyDetail, { key: questions[currentQuestion - 2].key })
        .value === "false"
    ) {
      prevQuestionCount = 2;
    } else if (
      questions[currentQuestion].key === "backyardCondition" &&
      find(listing.propertyDetail, { key: questions[currentQuestion - 3].key })
        .value === "true" &&
      !find(listing.propertyDetail, {
        key: questions[currentQuestion - 2].key,
      }).value.includes("stalls")
    ) {
      prevQuestionCount = 2;
    } else if (
      questions[currentQuestion].key === "backyardCondition" &&
      find(listing.propertyDetail, { key: questions[currentQuestion - 3].key })
        .value === "false"
    ) {
      prevQuestionCount = 3;
    }

    if (
      questions[currentQuestion].key == "livingsize" &&
      find(listing.propertyDetail, { key: questions[currentQuestion - 3].key })
        .value !== "land"
    ) {
      prevQuestionCount = 3;
    }

    if (currentQuestion <= 0) {
      currentQuestion = 0;
    } else {
      currentQuestion = currentQuestion - prevQuestionCount;
    }
    const question = questions[currentQuestion];


    this.setState({
      currentQuestion: currentQuestion,
      question: question
    });
  };

  onSubmit = (values) => {
    const {
      questions,
      updatePropertyDetail,
      category,
      listing,
    } = this.props;

    const { currentQuestion, questionsLength } = this.state;
    const question = questions[currentQuestion];
    const avmData = listing.avmData;

    // submitValue will be null if user confirms AVM data is correct
    // in this case grab value from AVM data and use that for submitValue
    let submitValue = get(values, question.key);
    let nextQuestionCount;

    if (!submitValue) {
      submitValue = get(avmData, question.path);
    }

    const questionKey = question.key;
    const params = {
      listingId: listing.id,
      [questionKey]: submitValue,
      category: category
    };
    const currentPropertyDetail = find(listing.propertyDetail);
    const action = updatePropertyDetail(currentPropertyDetail, params);

    if (values.homeownerAssociation) {
      nextQuestionCount = values.homeownerAssociation === "false" ? 2 : 1;
    } else if (values.horsePrivileges) {
      nextQuestionCount = values.horsePrivileges === "false" ? 3 : 1;
    } else {
      nextQuestionCount = 1;
    }
    if (values.horseFeatures) {
      nextQuestionCount = values.horseFeatures.includes("stalls") ? 1 : 2;
    }

    if (values.buildingType) {
      nextQuestionCount = values.buildingType !== "land" ? 3 : 1;
    }
    return action.then(() => {
      this.nextQuestion(nextQuestionCount);
      if (currentQuestion + 1 === questionsLength) {
        Router.pushRoute(`/seller/property/${listing.id}`).then(() =>
          window.scrollTo(0, 0)
        );
      }
    });
  };

  createYearDropdown = () => {
    let YEARS = [];
    let min = new Date().getFullYear() - 100;
    let max = new Date().getFullYear() + 1;
    for (var i = min; i <= max; i++) {
      YEARS.push({ label: i, value: i });
    }
    return YEARS;
  };

  render() {
    const { title, icon, questions, listing } = this.props;
    const { currentQuestion, currentPropertyDetail, questionsLength } = this.state;
    const avmData = listing && listing.avmData;
    const YEARS =
      questions[currentQuestion].question_type == "select"
        ? this.createYearDropdown()
        : [];

    const initialValues = {};
    if (currentPropertyDetail) {
      initialValues[currentPropertyDetail.key] = currentPropertyDetail.value;
    } else if (avmData) {
      initialValues[questions[currentQuestion].key] = get(
        listing.avmData,
        questions[currentQuestion].path
      );
    }
    if (listing === null || listing.status === "sold") return null;

    return (
      <div>
        <div className="price-bar-container text-center">
          <AddressSection listing={listing} />
          {listing.valuationFlag === false ? (
            <div className="pb-2 mt-2">
              <NoEstimatedPrice />
            </div>
          ) : (
            <EstimatedPriceBar listing={listing} />
          )}
        </div>
        <CompletionHeader
          title={title}
          icon={icon}
          questionsLength={questionsLength}
          percentage={
            Math.floor(((currentQuestion + 1) / questionsLength) * 100) + "%"
          }
          currentQuestion={currentQuestion + 1}
        />
        <Container fluid>
          <div className="wrapper">
            <Form
              component={QuestionForm}
              question={questions[currentQuestion]}
              PropertyDetail={currentPropertyDetail}
              avmData={listing.avmData}
              initialValues={initialValues}
              onSubmit={this.onSubmit}
              YEARS={YEARS}
              {...this.props}
            />

            {currentQuestion !== 0 && (
              <div>
                <hr className="dashed" />
                <Row>
                  <Col xs="6" className="text-left">
                    <a className="prev-question" onClick={this.prevQuestion}>
                      « Back
                    </a>
                  </Col>
                </Row>
              </div>
            )}

            {currentQuestion === 0 && (
              <div>
                <hr className="dashed" />
                <Row>
                  <Col xs="6" className="text-left">
                    <a
                      className="prev-question"
                      onClick={() => {
                        Router.back();
                      }}
                    >
                      « Back
                    </a>
                  </Col>
                </Row>
              </div>
            )}
          </div>
        </Container>
        <style jsx>{`
          @import "styled-jsx-helper";
          .prev-question,
          .next-question {
            cursor: pointer;
            color: $brand-grey !important;
            font-size: 18px;
            font-weight: bold;
          }

          .price-bar-container {
            background-color: #007793;
            color: #fff;
            width: 100%;
          }
          .price-bar-container :global(h4) {
            margin: 0 0 0 0;
            font-size: 20px;
          }
          .price-bar-container :global(h1) {
            margin: 0 0 40px 0;
            font-size: 50px;
            line-height: 1.1;
          }

          @include media-breakpoint-up(md) {
            .price-bar-container :global(h4) {
              font-size: 24px;
            }
          }
        `}</style>
      </div>
    );
  }
};

QuestionContainer.propTypes = {
  questions: PropTypes.array.isRequired,
  retrieveListing: PropTypes.func.isRequired,
  propertyId: PropTypes.string.isRequired,
  updatePropertyDetail: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  listing: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

QuestionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionContainer);
export default QuestionContainer;
