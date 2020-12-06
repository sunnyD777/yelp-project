import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { updateProfile, profileChangeHandler, showUpdate, hideUpdate, hideUpload, pictureChangeHandler, uploadPicture } from '../../../../actions/actions';
import ProfileItem from './ProfileItem';
import { updateRestaurantMutation } from '../../../../mutations';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.user,
      update: false,
      selectedFile: null,
      upload: false };
  }

  saveUpdates = () => {
    const { name, email, location, dscr, timings } = this.state;
    const data = { name, email, location, dscr, timings };
    this.props.updateProfile(data);
    // axios.post('/restaurant/updateProfile', data)
    //   .then((response) => {
    //     console.log(response);
    //   });
    this.props.updateRestaurantMutation({
      variables: { ...data, id: this.props.id
      }
    }).then((data) => {
      console.log(data);
    });
    this.setState({ update: false });
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  showUpdate = () => {
    this.setState({ update: true });
  }

  handleClick = () => {
    this.inputElement.click();
  }

  pictureChangeHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0], upload: true });
  }

  handleUpload = () => {
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    console.log(data);
    axios.post('/restaurant/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      } })
      .then((res) => { // then print response status
        this.setState({ img: res.data, upload: false });
        this.saveUpdates();
      });
  }

  render() {
    const { update, upload } = this.state;
    return (
      <div id="profile">
        <h1 className="profileTitle">Profile</h1>
        { update ? <button className="btn btn-primary update" onClick={this.saveUpdates}>Save Updates</button>
          : <button className="btn btn-primary update" onClick={this.showUpdate}>Update Profile</button>}
        {' '}
        <div id="content">
          <div id="user">
            <div className="restInfo">
              <h1>Info</h1>
              <ul className="profile_list">
                <ProfileItem handleChange={this.handleChange} label="Restaurant Name" keyName="name" val={this.state.name} update={update} />
                <ProfileItem handleChange={this.handleChange} label="Location" keyName="location" val={this.state.location} update={update} />
                <ProfileItem handleChange={this.handleChange} label="Contact" keyName="email" val={this.state.email} update={update} />
                <ProfileItem handleChange={this.handleChange} label="Timings" keyName="timings" val={this.state.timings} update={update} />
              </ul>
            </div>
            <div id="picture" className="restInfo">
              <button onClick={this.handleClick} id="upload">+</button>
              {upload ? <button onClick={this.handleUpload} id="savePicture" className="ybtn ybtn--small ybtn--green">Save Image</button> : null}
              <input name="profilePicture" onChange={this.pictureChangeHandler} type="file" style={{ display: 'none' }} ref={(input) => this.inputElement = input} />
              <img id="profilePicture" src={this.state.img} />
            </div>
          </div>
          <div id="about">
            <h1>Description</h1>
            {update ? <textarea id="dscr" value={this.state.dscr} onChange={this.profileChangeHandler} rows="10" cols="50" /> : <p>{this.state.dscr}</p>}
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
    updateProfile: (user) => dispatch(updateProfile(user)),
  };
};

export default compose(
  graphql(updateRestaurantMutation, { name: 'updateRestaurantMutation' }),
  connect(mapStateToProps, mapDispatchToProps)
)(Profile);
