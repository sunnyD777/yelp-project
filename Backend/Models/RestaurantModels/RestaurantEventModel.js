const mongoose = require('mongoose');

const { Schema } = mongoose;

const restaurantEventSchema = new Schema({
  name: { type: String, required: true },
  dscr: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  provider: { type: String, required: true },
  restId: { type: String, required: true },
  index: { type: Number, required: true },
  registeredCustomers: []
},
{
  versionKey: false,
  _id: false
});

module.exports = restaurantEventSchema;
