import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initCustomer, updateProfile, profileChangeHandler, showUpdate, hideUpdate, hideUpload, pictureChangeHandler, uploadPicture } from '../../../actions/actions';
import ProfileItem from './ProfileItem';
import unknown from '../../../unknown.jpg';

class Profile extends Component {
  componentDidMount() {
    axios.post('/customer', { id: this.props.id })
      .then((response) => {
        this.props.initCustomer();
        console.log(response);
      });
  }

  saveUpdates = () => {
    const { name, email, phone_num, about, birthday, city, state, country, nickname } = this.props.user;
    const data = { name, email, phone_num, about, birthday, city, state, country, nickname };
    this.props.updateProfile(data);
    axios.post('/customer/updateProfile', data)
      .then((response) => {
        console.log(response);
      });

    this.props.hideUpdate();
  }

  handleClick = () => {
    this.inputElement.click();
  }

  handleUpload = () => {
    const data = new FormData();
    data.append('file', this.props.file);
    console.log(data);
    axios.post('/customer/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      } })
      .then((res) => { // then print response status
        console.log(res.data);
        this.props.hideUpload();
        this.props.uploadPicture(res.data);
      });
  }

  render() {
    const { user, update, upload } = this.props;
    return (
      <div id="profile">
        <h1 className="profileTitle">Profile</h1>
        { update ? <button className="btn btn-primary custUpdate" onClick={this.saveUpdates}>Save Updates</button>
          : <button className="btn btn-primary custUpdate" onClick={this.props.showUpdate}>Update Profile</button>}
        {' '}
        <div id="custContent">
          <div id="custUser">
            <div className="custInfo">
              <h1>Basic Details</h1>
              <ul className="profile_list">
                <ProfileItem handleChange={this.props.profileChangeHandler} label="Name" keyName="name" val={user.name} update={update} />
                <ProfileItem handleChange={this.props.profileChangeHandler} label="Date of Birth" keyName="birthday" val={user.birthday} update={update} />
                <ProfileItem handleChange={this.props.profileChangeHandler} label="City" keyName="city" val={user.city} update={update} />
                <ProfileItem handleChange={this.props.profileChangeHandler} label="State" keyName="state" val={user.state} update={update} />
                <ProfileItem handleChange={this.props.profileChangeHandler} label="Country" keyName="country" val={user.country} update={update} />
                <ProfileItem handleChange={this.props.profileChangeHandler} label="Nickname" keyName="nickname" val={user.nickname} update={update} />
              </ul>
            </div>
            <div id="custPersonal" className="custInfo">
              <h1>Contact Info</h1>
              <ul id="contactInfo" className="profile_list">
                <ProfileItem handleChange={this.props.profileChangeHandler} label="Email" keyName="email" val={user.email} update={update} />
                <ProfileItem handleChange={this.props.profileChangeHandler} label="Phone Number" keyName="phone_num" val={user.phone_num} update={update} />
              </ul>
              <div id="about">
                <h1>About</h1>
                {update ? <textarea id="about" value={user.about} onChange={this.props.profileChangeHandler} rows="10" cols="50" /> : <p>{user.about}</p>}
              </div>
            </div>
            <div id="picture">
              <button onClick={this.handleClick} id="upload">+</button>
              {upload ? <button onClick={this.handleUpload} id="saveCustPicture" className="ybtn ybtn--small ybtn--green">Save Image</button> : null}
              <input name="profilePicture" onChange={this.props.pictureChangeHandler} type="file" style={{ display: 'none' }} ref={(input) => this.inputElement = input} />
              <img id="custProfilePicture" src={user.img} />
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
    update: state.update,
    file: state.file,
    upload: state.upload
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (user) => dispatch(updateProfile(user)),
    profileChangeHandler: (e) => dispatch(profileChangeHandler(e)),
    pictureChangeHandler: (e) => dispatch(pictureChangeHandler(e)),
    uploadPicture: (img) => dispatch(uploadPicture(img)),
    showUpdate: () => dispatch(showUpdate()),
    hideUpdate: () => dispatch(hideUpdate()),
    hideUpload: () => dispatch(hideUpload()),
    initCustomer: () => dispatch(initCustomer())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
