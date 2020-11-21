import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { toggleAddEvent, initNewEvent, newEventChangeHandler, addNewEvent } from '../../../actions/actions';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'view',
      events: [],
      name: '',
      dscr: '',
      location: '',
      date: '',
      addEvent: false,
      customers: [],
      showCustomers: false
    };
  }

  componentDidMount() {
    this.props.initNewEvent();
  }

  getCustomerProfile = (e) => {
    console.log(e.target.id);
    this.props.history.push(`customerInfo/${e.target.id}`);
  }

  changeTitle = (e) => {
    console.log(e.target.id);
    this.setState({ status: e.target.id });
  }

  nameChangeHandler = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  descriptionChangeHandler = (e) => {
    this.setState({
      dscr: e.target.value
    });
  }

  locationChangeHandler = (e) => {
    this.setState({
      location: e.target.value
    });
  }

  dateChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({
      date: e.target.value
    });
  }

  submitEvent = (e) => {
    e.preventDefault();
    console.log(this.state);
    // const { name, dscr, location, date } = this.state;
    const { newEvent, events, name } = this.props;
    newEvent.index = events.length;
    newEvent.provider = name;
    axios.post('/restaurant/addEvent', newEvent)
      .then((response) => {
        this.props.addNewEvent(newEvent);
        this.props.toggleAddEvent();
        console.log(response);
      });
  }

  addEventClickHandler = () => {
    const addEvent = !this.state.addEvent;
    this.setState({ addEvent, name: '', dscr: '', location: '', date: '' });
  }

  getCustomerProfile = (e) => {
    this.props.history.push(`customerInfo/${e.target.getAttribute('cust-id')}`);
  }

  showRegisteredCustomers = (e) => {
    console.log(e.target);
    axios.post('/restaurant/events/registeredCustomers', { index: e.target.getAttribute('index') })
      .then((response) => {
        console.log(response.data);
        this.setState({ customers: response.data, showCustomers: true });
      });
  }

  render() {
    const { newEvent, addEvent } = this.props;
    console.log(addEvent);
    const eventPage = !this.state.showCustomers ? (
      <div id="eventsContainer">
        <div id="eventsTitle">
          <h1>Events</h1>
          <button className="ybtn ybtn--small ybtn--primary" onClick={this.props.toggleAddEvent}>{addEvent ? 'Cancel Event' : 'Add Event'}</button>
        </div>
        {this.props.events.map((event) => {
          return (
            <div index={event.index} onClick={this.showRegisteredCustomers} className="event">
              <div index={event.index} className="eventName">
                <h1 index={event.index}>{event.name}</h1>
                <h4 index={event.index}>{event.date}</h4>
              </div>
            </div>
          );
        })}
        {addEvent ? (
          <div id="addEvent">
            <h2 id="addEventTitle">Add Event</h2>
            <form onSubmit={this.submitEvent}>
              <input keyname="name" onChange={this.props.newEventChangeHandler} value={!newEvent ? '' : newEvent.name} placeholder="Event Name..." />
              <input keyname="dscr" onChange={this.props.newEventChangeHandler} value={!newEvent ? '' : newEvent.dscr} placeholder="Description..." />
              <input keyname="location" onChange={this.props.newEventChangeHandler} value={!newEvent ? '' : newEvent.location} placeholder="Location..." />
              <br />
              <input keyname="date" onChange={this.props.newEventChangeHandler} type="date" />
              <br />
              <button type="submit">Create Event</button>
            </form>
          </div>
        ) : null }
      </div>
    ) : (
      <table id="registeredCustomers">
        <h1 id="registeredTitle">Registered Customers</h1>
        <tr>
          <th style={{ textAlign: 'center' }}>Customer</th>
          <th>Profile Picture</th>
        </tr>
        {this.state.customers.map((customer) => {
          return (
            <tr>
              <td style={{ textAlign: 'center' }} className="customerName" cust-id={customer._id} onClick={this.getCustomerProfile}>
                {customer.name}
              </td>
              <td>
                <img style={{ width: '6vw' }} src={customer.img} />
              </td>
            </tr>
          );
        })}
      </table>
    // <ul>
    //   {this.state.customers.map((customer) => {
    //     return <li className="customerName" onClick={this.getCustomerProfile} cust-id={customer.id}>{customer.name}</li>;
    //   })}
    // </ul>
    );
    console.log(eventPage);
    return (
      eventPage
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.id,
    events: state.user.events,
    name: state.user.name,
    newEvent: state.newEvent,
    addEvent: state.addEvent
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAddEvent: () => dispatch(toggleAddEvent()),
    initNewEvent: () => dispatch(initNewEvent()),
    newEventChangeHandler: (e) => dispatch(newEventChangeHandler(e)),
    addNewEvent: (newEvent) => dispatch(addNewEvent(newEvent))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
