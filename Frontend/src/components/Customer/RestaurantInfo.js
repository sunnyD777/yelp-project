import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import RestaurantOrder from './RestuarantOrder';
import { RestaurantInfoMutation, submitOrderMutation, submitReviewMutation } from '../../mutations';

class RestaurantInfo extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { restaurant: {},
      reviews: [],
      avgRating: 0,
      menu: [],
      orders: [],
      writeReview: false,
      orderMenu: false,
      comment: '',
      rating: null
    };
  }

  componentDidMount() {
    // axios.get(`/customer/restaurantInfo/${this.props.match.params.id}`)
    //   .then((response) => {
    //     console.log(response.data);
    //     const { reviews } = response.data;
    //     let totalRating = 0;
    //     const numReviews = reviews.length;
    //     reviews.forEach((review) => {
    //       totalRating += review.rating;
    //     });
    //     if (numReviews > 0) { this.setState({ avgRating: (totalRating / numReviews) }); }
    //     this.setState({ restaurant: response.data, reviews: response.data.reviews, menu: response.data.menu });
    //   });
    console.log(this.props.match.params.id);
    this.props.RestaurantInfoMutation({
      variables: { id: this.props.match.params.id
      }
    }).then((data) => {
      console.log(data);
      const { status, content } = data.data.restaurantInfo;
      const restaurant = JSON.parse(content);
      const { reviews } = restaurant;
      let totalRating = 0;
      const numReviews = reviews.length;
      reviews.forEach((review) => {
        totalRating += review.rating;
      });
      if (numReviews > 0) { this.setState({ avgRating: (totalRating / numReviews) }); }
      this.setState({ restaurant, reviews: restaurant.reviews, menu: restaurant.menu });
    });
    // axios.post('/restaurant/reviews', { id: this.props.match.params.id })
    //   .then((response) => {
    //     console.log(response.data);
    //     let totalRating = 0;
    //     const numReviews = response.data.length;
    //     response.data.forEach((review) => {
    //       totalRating += review.rating;
    //     });
    //     if (numReviews > 0) { this.setState({ reviews: response.data, avgRating: (totalRating / numReviews) }); }
    //   });
    // axios.post('/restaurant/menu', { id: this.props.match.params.id })
    //   .then((response) => {
    //     console.log(response.data);
    //     this.setState({ menu: response.data });
    //   });
  }

  goToOrderPage = () => {
    const orderMenu = !this.state.orderMenu;
    this.setState({ orderMenu, writeReview: false });
  }

  addToOrders = (e) => {
    console.log(e.target.checked);
    const { menu, orders } = this.state;
    const newOrder = menu[e.target.value];
    if (e.target.checked) { orders.push(newOrder); } else {
      orders.splice(orders.indexOf(newOrder), 1);
    }
    this.setState({ orders });
  }

  writeReview = () => {
    const writeReview = !this.state.writeReview;
    this.setState({ writeReview, orderMenu: false });
  }

  submitReview = (e) => {
    e.preventDefault();
    const { comment, rating } = this.state;
    // axios.post('/customer/submitReview',
    //   { comment, rating, custId: this.props.id, restId: this.props.match.params.id, name: this.props.name })
    //   .then((results) => {
    //     console.log(results);
    //     this.setState({ reviews: results.data, writeReview: false });
    //   });
    this.props.submitReviewMutation({
      variables: { comment, rating, custId: this.props.id, restId: this.props.match.params.id, name: this.props.name
      }
    }).then((data) => {
      console.log(data);
      const { status, content } = data.data.submitReview;
      const reviews = JSON.parse(content);
      this.setState({ reviews, writeReview: false });
    });
  }

  submitOrder = (e) => {
    e.preventDefault();
    const { menu } = this.state;
    const index = e.target.getAttribute('index');
    const { food_name } = menu[index];
    const { type } = menu[index];
    const { quantity } = menu[index];
    const { name } = this.state.restaurant;
    // axios.post('/customer/submitOrder',
    //   { quantity, type, restaurant: this.state.restaurant.name, customer: this.props.name, food: food_name, custId: this.props.id, restId: this.props.match.params.id })
    //   .then((results) => {
    //     console.log(results);
    //     menu[index].submitted = true;
    //     this.setState({ menu });
    //   });
    this.props.submitOrderMutation({
      variables: { quantity, type, restaurant: name, customer: this.props.name, food: food_name, custId: this.props.id, restId: this.props.match.params.id
      }
    }).then((data) => {
      console.log(data);
      menu[index].submitted = true;
      this.setState({ menu });
    });
  }

   commentChangeHandler = (e) => {
     this.setState({
       comment: e.target.value
     });
   }

  ratingChangeHandler = (e) => {
    this.setState({
      rating: e.target.value
    });
  }

  quantityChangeHandler = (e) => {
    const index = e.target.getAttribute('index');
    const { menu } = this.state;
    menu[index].quantity = e.target.value;
    this.setState({ menu });
  }

  typeChangeHandler = (e) => {
    const index = e.target.getAttribute('index');
    const { menu } = this.state;
    menu[index].type = e.target.value;
    this.setState({ menu });
  }

  render() {
    const restaurantView = this.state.orderMenu ? <RestaurantOrder quantityChangeHandler={this.quantityChangeHandler} typeChangeHandler={this.typeChangeHandler} submitOrder={this.submitOrder} menu={this.state.menu} />
      : (
        <ul id="restReviews">
          {this.state.writeReview ? (
            <li className="review">
              <div style={{ paddingTop: '10vh' }} className="customerReview">
                <h1>Rating</h1>
                <select value={this.state.rating} onChange={this.ratingChangeHandler} id="ratingSelect">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
                <br />
              </div>
              <form onSubmit={this.submitReview} className="comment">
                <textarea value={this.state.comment} onChange={this.commentChangeHandler} id="custComment" placeholder="Write comment here..." rows="10" cols="40" />
                <button type="submit" id="submitReview" className="ybtn ybtn--green">Submit Review</button>
              </form>
            </li>
          ) : null}
          {this.state.reviews.map((review) => {
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
      );
    return (
      <div id="restaurantContainer">
        <div id="restInfo">
          <img id="restPicture" src={this.state.restaurant.img} />
          <h1 id="restTitle">{this.state.restaurant.name}</h1>
          <div className={`i-stars i-stars--large-${this.state.avgRating} rating`} />
          <span id="numReviews">{`(${this.state.reviews.length} Reviews)`}</span>
        </div>
        <div id="restOptions">
          <button onClick={this.writeReview} style={{ marginRight: '0.5vw' }} className={`ybtn ybtn--${this.state.writeReview ? 'blue' : 'primary'}`}>{this.state.writeReview ? 'Cancel Review' : 'Write Review'}</button>
          <button onClick={this.goToOrderPage} className={`ybtn ybtn--${this.state.orderMenu ? 'blue' : 'primary'}`}>
            {this.state.orderMenu ? 'Cancel Order' : 'Order From Here'}
          </button>
        </div>
        {restaurantView}
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.id,
    name: state.user.name
  };
};

export default compose(
  graphql(RestaurantInfoMutation, { name: 'RestaurantInfoMutation' }),
  graphql(submitOrderMutation, { name: 'submitOrderMutation' }),
  graphql(submitReviewMutation, { name: 'submitReviewMutation' }),
  connect(mapStateToProps)
)(RestaurantInfo);
