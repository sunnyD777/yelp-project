import React, { Component } from 'react';
import axios from 'axios';

export default class CustomerInfo extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { customer: {} };
  }

  componentDidMount() {
    axios.get(`/restaurant/customerInfo/${this.props.match.params.id}`)
      .then((response) => {
        console.log(response.data);
        this.setState({ customer: response.data });
      });
  }

  render() {
    const { customer } = this.state;
    return (
      <div id="profile">
        <h1 className="profileTitle">{`${customer.name}'s Profile`}</h1>
        <div id="custContent">
          <div id="custUser">
            <div className="custInfo">
              <h1>Basic Details</h1>
              <ul className="profile_list">
                <label>Name </label>
                <li>
                  {customer.name !== 'undefined' ? customer.name : null }
                </li>
                <label>Date of Birth</label>
                <li>
                  {customer.birthday !== 'undefined' ? customer.birthday : null }
                </li>
                <label>City</label>
                <li>
                  {customer.city !== 'undefined' ? customer.city : null }
                </li>
                <label>State</label>
                <li>
                  {customer.state !== 'undefined' ? customer.state : null }
                </li>
                <label>Country</label>
                <li>
                  {customer.country !== 'undefined' ? customer.country : null }
                </li>
                <label>Nickname</label>
                <li>
                  {customer.nickname !== 'undefined' ? customer.nickname : null }
                </li>
              </ul>
            </div>
            <div className="custInfo">
              <h1>Contact Info</h1>
              <ul className="profile_list">
                <label>Email</label>
                <li>
                  {customer.email !== 'undefined' ? customer.email : null }
                </li>
                <label>Phone Number</label>
                <li>
                  {customer.phone_num !== 'undefined' ? customer.phone_num : null }
                </li>
              </ul>
            </div>
            <div id="picture">

              <img id="custProfilePicture" src={customer.img} />
            </div>
          </div>
          <div id="about">
            <h1>About</h1>
            <p>
              {' '}
              {customer.about !== 'undefined' ? customer.about : null }
            </p>
          </div>
        </div>
      </div>
    );
  }
}
