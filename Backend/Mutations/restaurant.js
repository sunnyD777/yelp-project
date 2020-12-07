const Restaurant = require('../Models/RestaurantModels/RestaurantModel');
const Customer = require('../Models/CustomerModels/CustomerModel');

const options = {
  useFindAndModify: false,
  new: true
};

const updateRestaurant = async (args) => {
  const { id, ...updateInfo } = args;
  const response = {};
  const restaurant = await Restaurant.findByIdAndUpdate(id, updateInfo, options);
  if (!restaurant) {
    response.content = ('Sign up Error');
    response.status = 401;
  } else {
    response.content = (JSON.stringify(restaurant));
    response.status = 200;
  }
  return response;
};

const updateRestaurantMenu = async (args) => {
  const { id, menu } = args;
  const response = {};
  const restaurant = await Restaurant.findByIdAndUpdate(id, { menu: JSON.parse(menu) }, options);
  if (!restaurant) {
    response.content = ('Sign up Error');
    response.status = 401;
  } else {
    response.content = (JSON.stringify(restaurant));
    response.status = 200;
  }
  return response;
};
const addMenuItem = async (args) => {
  const { id, newItem } = args;
  const response = {};
  const restaurant = await Restaurant.findByIdAndUpdate(id, { $push: { menu: JSON.parse(newItem) } }, options);
  if (!restaurant) {
    response.content = ('Sign up Error');
    response.status = 401;
  } else {
    response.content = (JSON.stringify(restaurant));
    response.status = 200;
  }
  return response;
};

const changeOrderStatus = async (args) => {
  const { status, index, custId, restId } = args;
  const response = {};
  const restaurant = await Restaurant.findById(restId, (err, restaurant) => {
    const { custIndex } = restaurant.orders[index];
    restaurant.orders[index].status = status;
    restaurant.markModified('orders');
    restaurant.save((err) => console.log(err));
    Customer.findById(custId, (err, customer) => {
      customer.orders[custIndex].status = status;
      customer.markModified('orders');
      customer.save((err) => console.log(err));
    });
  });
  if (!restaurant) {
    response.content = ('Sign up Error');
    response.status = 401;
  } else {
    response.content = (JSON.stringify(restaurant));
    response.status = 200;
  }
  return response;
};

module.exports = {
  updateRestaurant,
  updateRestaurantMenu,
  addMenuItem,
  changeOrderStatus
};
