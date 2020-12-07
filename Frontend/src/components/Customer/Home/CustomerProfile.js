import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { updateProfile } from '../../../actions/actions';
import ProfileItem from './ProfileItem';
import { updateCustomerMutation } from '../../../mutations';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.user,
      update: false,
      selectedFile: null,
      upload: false };
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  showUpdate = () => {
    this.setState({ update: true });
  }

  saveUpdates = () => {
    const { name, email, phone_num, about, birthday, city, state, country, nickname, img } = this.state;
    const data = { name, email, phone_num, about, birthday, city, state, country, nickname, img };
    this.props.updateProfile(data);
    // axios.post(`${BACK_SERVER_URL}/customer/updateProfile`, data)
    //   .then((response) => {
    //     console.log(response);
    //   });
    this.props.updateCustomerMutation({
      variables: { ...data, id: this.props.id
      }
    }).then((data) => {
      console.log(data);
    });
    this.setState({ update: false });
  }

  handleClick = () => {
    this.inputElement.click();
  }

  pictureChangeHandler = (e) => {
    console.log(e.target.files[0]);
    this.setState({ selectedFile: e.target.files[0], upload: true });
  }

  handleUpload = () => {
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    console.log(data);
    console.log(this.props.id);
    axios.post('/customer/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      } })
      .then((res) => { // then print response status
        console.log(res.data);
        this.setState({ img: res.data, upload: false });
        this.saveUpdates();
      });
  }

  render() {
    const { update, upload } = this.state;
    return (
      <div id="profile">
        <h1 className="profileTitle">Profile</h1>
        { update ? <button className="btn btn-primary custUpdate" onClick={this.saveUpdates}>Save Updates</button>
          : <button className="btn btn-primary custUpdate" onClick={this.showUpdate}>Update Profile</button>}
        {' '}
        <div id="custContent">
          <div id="custUser">
            <div className="custInfo">
              <h1>Basic Details</h1>
              <ul className="profile_list">
                <ProfileItem handleChange={this.handleChange} label="Name" keyName="name" val={this.state.name} update={update} />
                <ProfileItem handleChange={this.handleChange} label="Date of Birth" keyName="birthday" val={this.state.birthday} update={update} />
                <ProfileItem handleChange={this.handleChange} label="City" keyName="city" val={this.state.city} update={update} />
                <ProfileItem handleChange={this.handleChange} label="State" keyName="state" val={this.state.state} update={update} />
                <ProfileItem handleChange={this.handleChange} label="Country" keyName="country" val={this.state.country} update={update} />
                <ProfileItem handleChange={this.handleChange} label="Nickname" keyName="nickname" val={this.state.nickname} update={update} />
              </ul>
            </div>
            <div id="custPersonal" className="custInfo">
              <h1>Contact Info</h1>
              <ul id="contactInfo" className="profile_list">
                <ProfileItem handleChange={this.handleChange} label="Email" keyName="email" val={this.state.email} update={update} />
                <ProfileItem handleChange={this.handleChange} label="Phone Number" keyName="phone_num" val={this.state.phone_num} update={update} />
              </ul>
              <div id="about">
                <h1>About</h1>
                {update ? <textarea id="about" value={this.state.about} onChange={this.handleChange} rows="10" cols="50" /> : <p>{this.state.about}</p>}
              </div>
            </div>
            <div id="picture">
              <button onClick={this.handleClick} id="upload">+</button>
              {upload ? <button onClick={this.handleUpload} id="saveCustPicture" className="ybtn ybtn--small ybtn--green">Save Image</button> : null}
              <input name="profilePicture" onChange={this.pictureChangeHandler} type="file" style={{ display: 'none' }} ref={(input) => this.inputElement = input} />
              <img id="custProfilePicture" src={this.state.img} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    id: state.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (user) => dispatch(updateProfile(user))
  };
};

export default compose(
  graphql(updateCustomerMutation, { name: 'updateCustomerMutation' }),
  connect(mapStateToProps, mapDispatchToProps)
)(Profile);
