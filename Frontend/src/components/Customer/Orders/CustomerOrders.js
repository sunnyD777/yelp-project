import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getCustomerOrders } from '../../../queries';

class CustomerOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allOrders: [],
      orders: [],
      filter: ''
    };
  }

  // componentDidMount() {
  //   axios.get('/customer/orders')
  //     .then((response) => {
  //       console.log(response.data);
  //       this.setState({ orders: response.data, allOrders: response.data });
  //     });
  // }

  getRestaurantProfile = (e) => {
    this.props.history.push(`restaurantInfo/${e.target.getAttribute('rest-id')}`);
  }

  filterChangeHandler = (e) => {
    const filter = e.target.value;
    const { allOrders } = this.state;
    if (filter === 'All Orders') {
      this.setState({ filter, orders: allOrders });
      return;
    }
    const filteredOrders = allOrders.filter((order) => {
      return order.status === filter;
    });
    // orders.sort((a, b) => {
    //   console.log(a.status, b.status);
    //   const boolA = a.status === filter;
    //   const boolB = b.status === filter;
    //   if (boolA && boolB) return 0;
    //   if (boolA) return -1;
    //   if (boolB) return 1;
    //   return 0;
    // });
    console.log(filteredOrders);
    this.setState({ filter, orders: filteredOrders });
  }

  cancelOrder = (e) => {
    const index = e.target.getAttribute('index');
    const { orders } = this.state;
    orders.splice(index, 1);
    this.setState({ orders });
  }

  displayOrders = () => {
    const { data } = this.props;
    console.log(this.props);
    if (data.loading) {
      console.log('LOADING');
      return (<div>Loading orders...</div>);
    }
    console.log('NOT LOADING');
    return data.customer.orders.map((order, i) => {
      return (
        <tr>
          <td className="restName" rest-id={order.restId} onClick={this.getRestaurantProfile}>
            {order.restaurant}
          </td>
          <td>
            {order.food}
          </td>
          <td>
            {order.type}
          </td>
          <td>
            {order.status}
          </td>
          <td>
            {order.order_time}
          </td>
          <td>
            <button index={i} onClick={this.cancelOrder} className="ybtn ybtn--primary ybtn--small">Cancel</button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="orders">
        <h1 className="ordersTitle">My Orders</h1>
        <div className="ordersFilter">
          <label>Filter: </label>
          <select value={this.state.filter} onChange={this.filterChangeHandler}>
            <option>All Orders</option>
            <option>Order Received</option>
            <option>Preparing</option>
            <option>On The Way</option>
            <option>Pick Up Ready</option>
            <option>Delivered</option>
            <option>Picked Up</option>
          </select>
        </div>
        <table className="ordersTable">
          <tr>
            <th>Restaurant</th>
            <th>Food</th>
            <th>Type</th>
            <th>Status</th>
            <th>Order Time</th>
            <th>Cancel Order</th>
          </tr>
          {this.displayOrders()}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.id
  };
};

export default compose(
  connect(mapStateToProps),
  graphql(getCustomerOrders, {
    options: (props) => ({ variables: { id: props.id } })
  })
)(CustomerOrders);
