const express = require('express');
const multer = require('multer');
// const passport = require('passport');
const upload = require('../config/s3');

const Router = express.Router();
// const Customer = require('../Models/CustomerModel');
const Restaurant = require('../Models/RestaurantModels/RestaurantModel');
const Customer = require('../Models/CustomerModels/CustomerModel');

let restId = null;
const options = {
  useFindAndModify: false,
  new: true
};

Router.post('/', (req, res) => {
  restId = req.body.id;
  res.sendStatus(200);
});
Router.post('/updateProfile', (req, res) => {
  console.log(req.body);
  Restaurant.findByIdAndUpdate(restId, req.body, options, (err, results) => {
    res.send(results);
  });
});
Router.post('/upload', (req, res) => {
  console.log('upload');
  upload(req, res, (err) => {
    console.log('top');
    if (err instanceof multer.MulterError) {
      console.log(err);
    } if (err) {
      console.log(err);
    }
    console.log('bottom');
    uploadFile(req.file.path, req.file.filename, res, true);
  });
});
Router.post('/menu/upload', upload.single('file'), (req, res) => {
  res.send(req.file.location);
});

Router.post('/addToMenu', (req, res) => {
  Restaurant.findByIdAndUpdate(restId, { $push: { menu: req.body } }, options, (err, results) => {
    res.send(results);
  });
});

Router.post('/updateMenu', (req, res) => {
  Restaurant.findByIdAndUpdate(restId, { menu: req.body.menu }, options, (err, results) => {
    console.log(results);
    res.send(results);
  });
});

Router.get('/reviews', (req, res) => {
  Restaurant.findById(restId, { reviews: true, _id: false }, (err, results) => {
    res.send(results.reviews);
  });
});

Router.post('/addEvent', (req, res) => {
  const newEvent = req.body;
  newEvent.restId = restId;
  Restaurant.findByIdAndUpdate(restId, { $push: { events: newEvent } }, options, (err, results) => {
    res.send(results);
  });
});

Router.post('/events/registeredCustomers', (req, res) => {
  Restaurant.findById(restId, { events: true, _id: false }, (err, results) => {
    const customerIds = results.events[req.body.index].registeredCustomers;
    Customer.find({
      _id: { $in: customerIds }
    }, (err, customers) => {
      res.send(customers);
    });
  });
});

Router.get('/customerInfo/:id', (req, res) => {
  Customer.findById(req.params.id, (err, customer) => {
    res.send(customer);
  });
});

Router.get('/orders', (req, res) => {
  Restaurant.findById(restId, { orders: true, _id: false }, (err, data) => {
    res.send(data.orders);
  });
});

Router.post('/changeOrderStatus', (req, res) => {
  Restaurant.findById(restId, (err, restaurant) => {
    const { status, index, custId } = req.body;
    restaurant.orders[index].status = status;
    restaurant.markModified('orders');
    restaurant.save((err) => console.log(err));
    Customer.findById(custId, (err, customer) => {
      const { status, index } = req.body;
      customer.orders[index].status = status;
      customer.markModified('orders');
      customer.save((err) => console.log(err));
      res.send('Order status updated');
    });
  });
});

module.exports = Router;
