import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Profile from './Profile/Profile';
import Menu from './Menu/Menu';
import Reviews from './Reviews';
import Orders from '../Orders/RestaurantOrders';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Profile'
    };
  }

  componentDidMount() {
    axios.post('/restaurant', { id: this.props.id })
      .then((response) => {
        console.log(response);
      });
  }

  changeTitle = (e) => {
    console.log(e.target.innerHTML);
    this.setState({ title: e.target.id });
  }

  selectRestaurantComponent = () => {
    switch (this.state.title) {
      case 'Profile':
        return <Profile />;
      case 'Menu':
        return <Menu id={this.props.id} />;
      case 'Reviews':
        return <Reviews id={this.props.id} />;
      default:
        return null;
    }
  }

  render() {
    if (!this.props.isAuth) {
      this.props.history.push('/');
    }
    return (
      <div id="homeContainer">
        <ul id="restaurantHomeMenu">
          <li id="Profile" className="restaurantState" onClick={this.changeTitle}>Profile</li>
          <li id="Menu" className="restaurantState" onClick={this.changeTitle}>Menu</li>
          <li id="Reviews" className="restaurantState" onClick={this.changeTitle}> Reviews</li>
        </ul>
        {this.selectRestaurantComponent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuth,
    id: state.id
  };
};

export default connect(mapStateToProps)(Home);
