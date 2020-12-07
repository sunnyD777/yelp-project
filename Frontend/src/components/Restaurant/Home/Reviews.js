import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getReviews } from '../../../actions/actions';
import { getRestaurantReviews } from '../../../queries';

class Reviews extends Component {
  componentDidMount() {
    console.log(this.props);
    // axios.get('/restaurant/reviews')
    //   .then((response) => {
    // this.props.getReviews(response.data);
    //   });
  }

  displayReviews() {
    const { data } = this.props;
    if (data.loading) {
      console.log('LOADING');
      return (<div>Loading reviews...</div>);
    }
    console.log('NOT LOADING');
    return data.restaurant.reviews.map((review) => {
      return (
        <li className="review">
          <div className="customerReview">
            <h1>{review.name}</h1>
            <div className={`i-stars i-stars--large-${review.rating} rating`} />
            <h3 className="reviewDate">{review.date}</h3>
          </div>
          <div className="comment">
            {review.comment}
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div id="reviewsContainer">
        <h1 className="title">Customer Reviews</h1>
        <ul id="reviews">
          {this.displayReviews()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.id,
    reviews: state.user.reviews
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReviews: (reviews) => dispatch(getReviews(reviews)),
  };
};

export default compose(
  graphql(getRestaurantReviews),
  connect(mapStateToProps, mapDispatchToProps)
)(Reviews);
