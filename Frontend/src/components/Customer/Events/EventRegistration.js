import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { registerEvent } from '../../../actions/actions';

class EventRegistration extends Component {
registerForEvent = () => {
  const { upcomingEvents, eventIndex } = this.props;
  const event = upcomingEvents[eventIndex];
  console.log(event);
  axios.post('/customer/eventRegistration', { event })
    .then((response) => {
      console.log(response);
      // this.props.registerEvent(event);
      this.props.history.goBack();
    });
};

getRestaurantProfile = (e) => {
  this.props.history.push(`restaurantInfo/${e.target.getAttribute('rest-id')}`);
}

render() {
  const { registered, upcomingEvents, registeredEvents, eventIndex } = this.props;
  const event = registered ? registeredEvents[eventIndex] : upcomingEvents[eventIndex];
  return (
    <div id="registrationContainer">
      <h1 id="registrationTitle">Event Details</h1>
      <div id="eventDetails">
        <ul>
          <li className="eventItem">
            <label>Name:</label>
            {event.name}
          </li>
          <li className="eventItem">
            <label>Provided by:</label>
            <span className="restName" rest-id={event.restId} onClick={this.getRestaurantProfile}>{event.provider}</span>
          </li>
          <li className="eventItem">
            <label>When:</label>
            {event.date}
          </li>
          <li className="eventItem">
            <label>Where:</label>
            {event.location}
          </li>
          <li id="eventDescription">
            <label>Description:</label>
            {event.dscr}
          </li>
        </ul>
      </div>
      {registered ? null : <button id="register" className="ybtn ybtn--primary" onClick={this.registerForEvent}>Register For Event</button>}
    </div>
  );
}
}

const mapStateToProps = (state) => {
  return {
    eventIndex: state.eventIndex,
    upcomingEvents: state.upcomingEvents,
    registeredEvents: state.user.registeredEvents,
    id: state.id
  };
};
const mapDisptachToProps = (dispatch) => {
  return {
    registerEvent: (event) => dispatch(registerEvent(event))
  };
};
export default connect(mapStateToProps, mapDisptachToProps)(EventRegistration);
