const express = require('express');
const bcrypt = require('bcrypt');
// const passport = require('passport');

const Router = express.Router();
const Customer = require('../Models/CustomerModels/CustomerModel');
const Restaurant = require('../Models/RestaurantModels/RestaurantModel');

Router.post('/signup', (req, res) => {
  console.log(req.body);
  const { role, name, email, location } = req.body;
  const password = bcrypt.hashSync(req.body.password, 10);
  const user = (role === 'Customer') ? Customer : Restaurant;
  new user({ name, email, password, location })
    .save((err, results) => {
      if (err) console.log(err);
      else res.send(results);
    });
});

Router.post('/login', (req, res) => {
  const { role, email, password } = req.body;
  const db = (role === 'Customer') ? Customer : Restaurant;
  db.findOne({ email }, (err, results) => {
    if (!results || !bcrypt.compareSync(password, results.password)) {
      console.log('Wrong Login Credentials!');
      res.send(false);
    } else {
      res.send(results);
    }
  });
  //   const sql = `SELECT * FROM ${role.toLowerCase()}s WHERE email='${email}';`;

//   db.query(sql, (err, results) => {
//     console.log(results);
//     if (err) console.log(`Error: ${err}`);
//     else if (results.length === 0 || !bcrypt.compareSync(password, results[0].password)) {
//       console.log('Wrong login credentials...');
//       res.send(false);
//     } else {
//       res.send(results[0]);
//     }
//   });
});

module.exports = Router;
