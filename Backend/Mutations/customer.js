const Restaurant = require('../Models/RestaurantModels/RestaurantModel');
const Customer = require('../Models/CustomerModels/CustomerModel');

const options = {
  useFindAndModify: false,
  new: true
};

const updateCustomer = async (args) => {
  const { id, ...updateInfo } = args;
  const response = {};
  const customer = await Customer.findByIdAndUpdate(id, updateInfo, options);
  if (!customer) {
    response.content = ('Sign up Error');
    response.status = 401;
  } else {
    response.content = (JSON.stringify(customer));
    response.status = 200;
  }
  return response;
};
const restaurantSearch = async (args) => {
  const { name } = args;
  const response = {};
  const restaurants = await Restaurant.find({ name: { $regex: name, $options: 'i' } }, { name: true, location: true, img: true });
  if (!restaurants) {
    response.content = ('Sign up Error');
    response.status = 401;
  } else {
    response.content = (JSON.stringify(restaurants));
    response.status = 200;
  }
  return response;
};
const restaurantInfo = async (args) => {
  const { id } = args;
  const response = {};
  const restaurant = await Restaurant.findById(id);
  if (!restaurant) {
    response.content = ('Sign up Error');
    response.status = 401;
  } else {
    response.content = (JSON.stringify(restaurant));
    response.status = 200;
  }
  return response;
};

const submitOrder = async (args) => {
  const { quantity, type, restaurant, food, customer, restId, custId } = args;
  const response = {};
  const rest = await Restaurant.findByIdAndUpdate(restId, { $push: { orders: { quantity, type, customer, food, custId } } }, options);
  const cust = await Customer.findByIdAndUpdate(custId, { $push: { orders: { quantity, type, restaurant, food, restId } } }, options);
  if (!rest || !cust) {
    response.content = ('Sign up Error');
    response.status = 401;
  } else {
    response.content = ('Submitted Order!');
    response.status = 200;
  }
  return response;
};

const submitReview = async (args) => {
  console.log(args);
  const { name, comment, rating, custId, restId } = args;
  const response = {};
  const restaurant = await Restaurant.findByIdAndUpdate(restId, { $push: { reviews: { name, comment, rating, custId } } }, options);
  if (!restaurant) {
    response.content = ('Sign up Error');
    response.status = 401;
  } else {
    response.content = (JSON.stringify(restaurant.reviews));
    response.status = 200;
  }
  console.log(response);
  return response;
};

module.exports = {
  updateCustomer,
  restaurantSearch,
  restaurantInfo,
  submitOrder,
  submitReview
};
