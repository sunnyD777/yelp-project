import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { DistanceMatrixService } from '@react-google-maps/api';

import Map from '../Map';

const distance = require('google-distance-matrix');

class RestaurantSearch extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      searchResults: this.props.searchResults,
      coordinates: null,
      loaded: false };
    this.API_KEY = 'AIzaSyBNFSkiignbl3I5kZ-DFznJZBr6z0CGah0';
    distance.key(this.API_KEY);
  }

  componentDidMount() {
    const { searchResults } = this.state;
    const { location } = this.props.searchValues;

    /* global google */
    console.log(google);
    const callback = (response, status) => {
      if (status === 'OK') {
        const { elements } = response.rows[0];
        console.log(elements);
        elements.forEach((item, i) => {
          searchResults[i].distance = item.distance;
          searchResults[i].duration = item.duration;
        });
        this.setState({ loaded: true });
      }
    };
    const geocoder = new google.maps.Geocoder();

    // const promises = searchResults.map((result, i) => {
    //   return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${result.location}&key=${this.API_KEY}`)
    //     .then((response) => {
    //       if (response.data.status === 'OK') { searchResults[i].coordinates = response.data.results[0].geometry.location; }
    //     });
    // });
    // Promise.all(promises).then(() => {
    //   this.setState({ loaded: true });
    // });

    searchResults.forEach((result, i) => {
      geocoder.geocode({ address: result.location }, (results, status) => {
        console.log(results);
        console.log(results[0].geometry.location);
        if (status === 'OK') { searchResults[i].coordinates = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() }; }
        if (i === searchResults.length - 1) {
          const service = new google.maps.DistanceMatrixService();
          service.getDistanceMatrix(
            {
              origins: [location],
              destinations: searchResults.map((item) => item.location),
              travelMode: 'DRIVING'
            }, callback
          );
        }
      });
    });

    // const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    // console.log(encodeURI(distanceAPI));
    // fetch(proxyurl + encodeURI(distanceAPI))
    //   .then((results) => {
    //     console.log(results);
    //     const { elements } = results.row;
    //     elements.forEach((item, i) => {
    //       searchResults[i].distance = item.distance;
    //       searchResults[i].duration = item.duration;
    //     });
    //     this.setState({ searchResults, loaded: true, });
    //   });
  }

  getRestaurantProfile = (e) => {
    this.props.history.push(`restaurantInfo/${e.target.getAttribute('rest-id')}`);
  }

  render() {
    const { searchResults, loaded } = this.state;
    const { location, search, name } = this.props.searchValues;
    if (location && loaded) {
      searchResults.sort((a, b) => {
        return a.distance.value - b.distance.value;
      });
    }
    console.log(searchResults);
    const searchView = this.state.loaded ? (
      <div id="results">
        {this.state.searchResults.map((result) => {
          return (
            <div className={`result ${location ? 'location' : ''}`}>
              <div className="searchImage">
                <img className="restSearchImage" src={result.img} />
              </div>
              <div className="restInfo">
                <h1 className="restName" rest-id={result._id} onClick={this.getRestaurantProfile}>{result.name}</h1>
                <h3>{`Location: ${result.location}`}</h3>
                <h4 style={{ marginTop: '5vh' }}>{result.distance ? `Distance: ${result.distance.text}` : null }</h4>
                <h4>{result.duration ? `Duration: ${result.duration.text}` : null}</h4>
              </div>
              <Map
                lat={result.coordinates.lat}
                lng={result.coordinates.lng}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${this.API_KEY}`}
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div className="resultMap" style={{ height: '25vh' }} />}
                mapElement={<div style={{ height: '100%' }} />}
              />
            </div>
          );
        })}
      </div>
    ) : null;
    return (
      <div id="restSearchContainer">
        <h1>
          Search Results for
          {' '}
          {`"${search || name}" ${location ? `/ ${location}` : ''}`}
          {' '}
        </h1>
        {searchView}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults,
    searchValues: state.searchValues
  };
};

export default connect(mapStateToProps)(RestaurantSearch);
