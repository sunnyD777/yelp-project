import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProfile, profileChangeHandler, showUpdate, hideUpdate, hideUpload, pictureChangeHandler, uploadPicture } from '../../../../actions/actions';
import ProfileItem from './ProfileItem';
import unknown from '../../../../unknown.jpg';

class Profile extends Component {
  saveUpdates = () => {
    const { name, email, location, dscr, timings } = this.props.user;
    const data = { name, email, location, dscr, timings };
    this.props.updateProfile(data);
    axios.post('/restaurant/updateProfile', data)
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
    axios.post('/restaurant/upload', data, {
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
        { update ? <button className="btn btn-primary update" onClick={this.saveUpdates}>Save Updates</button>
          : <button className="btn btn-primary update" onClick={this.props.showUpdate}>Update Profile</button>}
        {' '}
        <div id="content">
          <div id="user">
            <div className="restInfo">
              <h1>Info</h1>
              <ul className="profile_list">
                <ProfileItem handleChange={this.props.profileChangeHandler} label="Restaurant Name" keyName="name" val={user.name} update={update} />
                <ProfileItem handleChange={this.props.profileChangeHandler} label="Location" keyName="location" val={user.location} update={update} />
                <ProfileItem handleChange={this.props.profileChangeHandler} label="Contact" keyName="contact" val={user.email} update={update} />
                <ProfileItem handleChange={this.props.profileChangeHandler} label="Timings" keyName="timings" val={user.timings} update={update} />
              </ul>
            </div>
            <div id="picture" className="restInfo">
              <button onClick={this.handleClick} id="upload">+</button>
              {upload ? <button onClick={this.handleUpload} id="savePicture" className="ybtn ybtn--small ybtn--green">Save Image</button> : null}
              <input name="profilePicture" onChange={this.props.pictureChangeHandler} type="file" style={{ display: 'none' }} ref={(input) => this.inputElement = input} />
              <img id="profilePicture" src={user.img} />
            </div>
          </div>
          <div id="about">
            <h1>Description</h1>
            {update ? <textarea id="dscr" value={user.dscr} onChange={this.props.profileChangeHandler} rows="10" cols="50" /> : <p>{user.dscr}</p>}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
