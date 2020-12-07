import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getRestaurantOrders } from '../../../queries';
import { changeOrderStatusMutation } from '../../../mutations';

class RestaurantOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      filter: 'New'
    };
  }

  componentDidMount() {
    // axios.get('/restaurant/orders')
    //   .then((response) => {
    //     this.setState({ orders: response.data });
    //   });
  }

  getCustomerProfile = (e) => {
    this.props.history.push(`customerInfo/${e.target.getAttribute('cust-id')}`);
  }

  statusChangeHandler = (e) => {
    const index = parseInt(e.target.getAttribute('index'));
    const custId = e.target.getAttribute('custId');
    const status = e.target.value;
    const { orders } = this.props.data.restaurant;
    orders[index].status = status;
    console.log(status);
    // axios.post('/restaurant/changeOrderStatus', { index, status, custId })
    //   .then((response) => {
    //     console.log(response.data);
    //   });
    // this.setState({ orders });
    this.props.changeOrderStatusMutation({
      variables: { restId: this.props.id, index, status, custId
      }
    }).then((data) => {
      console.log(data);
      this.setState({ orders: data });
    });
  }

  filterChangeHandler = (e) => {
    const filter = e.target.value;
    console.log(filter);
    const { orders } = this.state;
    if (filter === 'New') {
      orders.sort((a, b) => {
        if (a.order_time < b.order_time) {
          return -1;
        }
        if (a.order_time > b.order_time) {
          return 1;
        }
        return 0;
      });
    } else if (filter === 'Delivered') {
      orders.sort((a, b) => {
        const boolA = a.status === 'Delivered' || a.status === 'Picked Up';
        const boolB = b.status === 'Delivered' || b.status === 'Picked Up';
        if (boolA && boolB) return 0;
        if (boolA) return -1;
        if (boolB) return 1;
        return 0;
      });
    }

    this.setState({ filter, orders });
  }

  displayOrders = () => {
    const { data } = this.props;
    console.log(this.props);
    if (data.loading) {
      console.log('LOADING');
      return (<div>Loading orders...</div>);
    }
    console.log('NOT LOADING');
    return data.restaurant.orders.map((order, i) => {
      return (
        <tr>
          <td className="customerName" cust-id={order.custId} onClick={this.getCustomerProfile}>
            {order.customer}
          </td>
          <td>
            {order.food}
          </td>
          <td>
            {order.type}
          </td>
          <td>
            <select className="status" index={i} custId={order.custId} onChange={this.statusChangeHandler} value={order.status}>
              <option> TBD </option>
              <option>Preparing</option>
              <option>{order.type === 'Delivery' ? 'On The Way' : 'Pick Up Ready'}</option>
              <option>{order.type === 'Delivery' ? 'Delivered' : 'Picked Up'}</option>
            </select>
          </td>
          <td>
            {order.order_time}
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="orders">
        <h1 className="ordersTitle">Customer Orders</h1>
        <div className="ordersFilter">
          <label>Filter: </label>
          <select value={this.state.filter} onChange={this.filterChangeHandler}>
            <option>New</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
        <table className="ordersTable">
          <tr>
            <th>Customer</th>
            <th>Food</th>
            <th>Type</th>
            <th>Status</th>
            <th>Order Time</th>
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
  graphql(getRestaurantOrders, {
    options: (props) => ({ variables: { id: props.id } })
  }),
  graphql(changeOrderStatusMutation, { name: 'changeOrderStatusMutation' }),
)(RestaurantOrders);
