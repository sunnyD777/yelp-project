const mongoose = require('mongoose');
const restaurantEventSchema = require('./RestaurantEventModel');
const restaurantReviewSchema = require('./RestaurantReviewModel');
const restaurantOrderSchema = require('./RestaurantOrderModel');

const { Schema } = mongoose;
const restaurantSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  timings: { type: String },
  dscr: { type: String },
  img: { type: String, default: 'https://yelp273.s3.amazonaws.com/1603519379164-unknown.jpg' },
  orders: [restaurantOrderSchema],
  menu: [],
  events: [restaurantEventSchema],
  reviews: [restaurantReviewSchema]
},
{
  versionKey: false
});

const restaurantModel = mongoose.model('restaurant', restaurantSchema);
module.exports = restaurantModel;
