const mongoose = require('mongoose');

const { Schema } = mongoose;

const restaurantOrderSchema = new Schema({
  custId: { type: String, required: true },
  customer: { type: String, required: true },
  food: { type: String, required: true },
  type: { type: String, required: true, default: 'Delivery' },
  status: { type: String, required: true, default: 'TBD' },
  order_time: { type: Date, default: Date.now() },
  quantity: { type: Number, default: 1 }
},
{
  versionKey: false,
  _id: false
});

module.exports = restaurantOrderSchema;
