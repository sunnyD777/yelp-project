const mongoose = require('mongoose');
const customerOrderSchema = require('./CustomerOrderModel');

const { Schema } = mongoose;
const customerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: String },
  birthday: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  nickname: { type: String },
  phone_num: { type: String },
  img: { type: String, default: 'https://yelp273.s3.amazonaws.com/1603519379164-unknown.jpg' },
  orders: [customerOrderSchema],
  registeredEvents: []
},
{
  versionKey: false
});

const customerModel = mongoose.model('customer', customerSchema);
module.exports = customerModel;
