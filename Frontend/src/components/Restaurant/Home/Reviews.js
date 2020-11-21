import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getReviews } from '../../../actions/actions';

class Reviews extends Component {
  componentDidMount() {
    axios.get('/restaurant/reviews')
      .then((response) => {
        this.props.getReviews(response.data);
      });
  }

  render() {
    return (
      <div id="reviewsContainer">
        <h1 className="title">Customer Reviews</h1>
        <ul id="reviews">
          {this.props.reviews.map((review) => {
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
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reviews: state.user.reviews
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReviews: (reviews) => dispatch(getReviews(reviews)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
