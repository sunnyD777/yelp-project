import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import { logout, search } from '../actions/actions';
import logo from '../yelp.png';

// #d32323 = yelp navbar color

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      location: '',
      name: '',
      mode: ''
    };
  }

  searchRestaurant = (e) => {
    e.preventDefault();
    const { search, location, name, mode } = this.state;
    const data = { name };
    console.log(`SEARCH:${this.state.search}`);
    if (search !== '') data.search = search;
    axios.post('/customer/restaurantSearch', { name })
      .then((response) => {
        console.log(response.data);
        this.props.search(response.data, { search, location, mode, name });
        this.props.history.push('/customer/restaurantSearch');
      });
  };

  searchChangeHandler = (e) => {
    this.setState({
      search: e.target.value
    });
  }

  locationChangeHandler = (e) => {
    this.setState({
      location: e.target.value
    });
  }

 nameChangeHandler = (e) => {
   this.setState({
     name: e.target.value
   });
 }

  modeChangeHandler = (e) => {
    this.setState({
      mode: e.target.value
    });
  }

  render() {
    const restaurantPaths = (this.props.isAuth) ? (
      <ul className="nav navbar-nav">
        <li><Link to={`/${this.props.role}`}>Home</Link></li>
        <li><Link to={`/${this.props.role}/orders`}>Orders</Link></li>
        <li><Link to={`/${this.props.role}/events`}>Events</Link></li>
      </ul>
    ) : null;

    const restaurantSearchBar = (this.props.role === 'customer')
      ? (
        <form id="searchBar" onSubmit={this.searchRestaurant}>
          <h2>Restaurant Search</h2>
          <input type="text" placeholder="Search Name..." value={this.state.name} onChange={this.nameChangeHandler} />
          <input type="text" placeholder="Search Food..." value={this.state.search} onChange={this.searchChangeHandler} />
          <input type="text" placeholder="Search Location..." value={this.state.location} onChange={this.locationChangeHandler} />
          <select id="deliveryMode" value={this.state.mode} onChange={this.modeChangeHandler}>
            <option>Yelp Delivery</option>
            <option>Curbside Pickup</option>
            <option>Dine In</option>
          </select>
          <button className="ybtn ybtn--primary ybtn--small" type="submit">Search</button>
        </form>
      ) : null;

    return (
      <div>
        {this.props.isAuth ? <Redirect to={`/${this.props.role}`} /> : null}
        <nav className="navbar navbar-inverse" style={{ backgroundColor: ' #d32323' }}>
          {restaurantPaths}
          <img id="logo" src={logo} />
          <ul className="nav navbar-nav navbar-right">
            {this.props.isAuth ? (
              <li>
                <Link to="/" onClick={this.props.logout}>
                  <span className="glyphicon glyphicon-user" />
                  Logout
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>
        {restaurantSearchBar}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuth,
    role: state.role
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    search: (query, values) => dispatch(search(query, values))
  };
};
export default connect(mapStateToProps, mapDisptachToProps)(Navbar);
