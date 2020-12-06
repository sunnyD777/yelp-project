const bcrypt = require('bcrypt');
const Customer = require('../Models/CustomerModels/CustomerModel');
const Restaurant = require('../Models/RestaurantModels/RestaurantModel');

const signup = async (args) => {
  const { role, name, email, location } = args;
  const password = bcrypt.hashSync(args.password, 10);
  const user = (role === 'Customer') ? Customer : Restaurant;
  const response = {};
  const data = await new user({ name, email, password, location }).save();
  console.log(data);
  if (!data) {
    response.content = ('Sign up Error');
    response.status = 401;
  } else {
    response.content = (JSON.stringify(data));
    response.status = 200;
  }
  return response;
};

exports.signup = signup;
