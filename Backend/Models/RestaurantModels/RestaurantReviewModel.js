const mongoose = require('mongoose');

const { Schema } = mongoose;

const restaurantReviewSchema = new Schema({
  name: { type: String, required: true },
  custId: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
},
{
  versionKey: false,
  _id: false
});

module.exports = restaurantReviewSchema;
