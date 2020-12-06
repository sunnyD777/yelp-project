const Restaurant = require('../Models/RestaurantModels/RestaurantModel');

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

module.exports = {
  updateRestaurant
};
