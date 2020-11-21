import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getEvents, toggleRegistered, filterEvents, setEventIndex } from '../../../actions/actions';

class CustomerEvents extends Component {
  componentDidMount() {
    axios.get('/customer/events')
      .then((response) => {
        console.log(response.data);
        const { upcomingEvents, registeredEvents } = response.data;
        this.props.getEvents(upcomingEvents, registeredEvents);
        this.originalUpcoming = upcomingEvents;
        this.originalRegistered = registeredEvents;
      });
  }

  getRestaurantProfile = (e) => {
    this.props.history.push(`restaurantInfo/${e.target.id}`);
  }

  getEventInfo = (e) => {
    this.props.setEventIndex(e.target.getAttribute('index'));
    this.props.history.push('eventRegistration');
  }

  filterList = (e) => {
    const eventFilter = e.target.value.toLowerCase();
    const { registered } = this.props;
    const events = registered ? this.originalRegistered : this.originalUpcoming;
    const filtered = events.filter((event) => event.name.toLowerCase().includes(eventFilter));
    const eventType = registered ? 'registeredEvents' : 'upcomingEvents';
    this.props.filterEvents(eventType, filtered, eventFilter);
  }

  render() {
    const { registered, upcomingEvents, registeredEvents } = this.props;
    const events = registered ? registeredEvents : upcomingEvents;
    const title = registered ? 'Registered' : 'Upcoming';
    return (
      <div id="eventsContainer">
        <div id="eventsTitle">
          <h1>{`${title} Events`}</h1>
          <input id="searchEvent" placeholder="Search Event..." value={this.props.eventFilter} onChange={this.filterList} />
          <button className="ybtn ybtn--primary" onClick={this.props.toggleRegistered}>{`Go To ${registered ? 'Upcoming' : 'Registered'} Events`}</button>
        </div>
        {events.map((event, i) => {
          return (
            <div rest_id={event.restId} event_id={event.id} index={i} onClick={this.getEventInfo} className="event">
              <div rest_id={event.restId} event_id={event.id} index={i} className="eventName">
                <h1 rest_id={event.restId} event_id={event.id} index={i}>{event.name}</h1>
                <h2 rest_id={event.restId} event_id={event.id} index={i}>{event.provider}</h2>
                <h4 rest_id={event.restId} event_id={event.id} index={i}>{event.date}</h4>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.id,
    upcomingEvents: state.upcomingEvents,
    registeredEvents: state.user.registeredEvents,
    registered: state.registered,
    eventFilter: state.eventFilter
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    getEvents: (upcomingEvents, registeredEvents) => dispatch(getEvents(upcomingEvents, registeredEvents)),
    toggleRegistered: () => dispatch(toggleRegistered()),
    filterEvents: (eventType, events) => dispatch(filterEvents(eventType, events)),
    setEventIndex: (eventIndex) => dispatch(setEventIndex(eventIndex)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(CustomerEvents);
