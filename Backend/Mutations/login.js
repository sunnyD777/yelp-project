const bcrypt = require('bcrypt');
const Customer = require('../Models/CustomerModels/CustomerModel');
const Restaurant = require('../Models/RestaurantModels/RestaurantModel');

const login = async (args) => {
  const { role, email, password } = args;
  const db = (role === 'Customer') ? Customer : Restaurant;
  const response = {};
  const user = await db.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    response.content = ('Wrong Login Credentials!');
    response.status = 401;
  } else {
    response.content = (JSON.stringify(user));
    response.status = 200;
  }
  return response;
};

exports.login = login;
