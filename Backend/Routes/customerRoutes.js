const express = require('express');
const multer = require('multer');
const fs = require('fs');
const AWS = require('aws-sdk');
// const passport = require('passport');

const Router = express.Router();
// const Customer = require('../Models/CustomerModel');
const Customer = require('../Models/CustomerModels/CustomerModel');
const Restaurant = require('../Models/RestaurantModels/RestaurantModel');
const { ID, SECRET, BUCKET_NAME } = require('../Config/keys');

let custId = null;

const options = {
  useFindAndModify: false,
  new: true
};

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'Images');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage }).single('file');

const uploadFile = async (filePath, fileName, res) => {
  // Read content from the file
  const fileContent = fs.readFileSync(filePath);
  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName, // File name you want to save as in S3
    Body: fileContent,
    ContentType: 'image/jpeg'
  };

  // Uploading files to the bucket
  s3.upload(params, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
    fs.unlink(filePath, (err) => {
      if (err) throw err;
      console.log(`${filePath} was deleted`);
    });

    Customer.findByIdAndUpdate(custId, { img: data.Location }, options, (err, results) => {
      console.log(results);
    });
    res.send(data.Location);
  });
};

Router.post('/', (req, res) => {
  custId = req.body.id;
  res.sendStatus(200);
});
Router.post('/updateProfile', (req, res) => {
  Customer.findByIdAndUpdate(custId, req.body, options, (err, results) => {
    res.send(results);
  });
});

Router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log(err);
    } if (err) {
      console.log(err);
    }
    uploadFile(req.file.path, req.file.filename, res);
  });
});

Router.get('/events', (req, res) => {
  Restaurant.find({}, { events: true }, (err, results) => {
    const upcomingEvents = [];
    results.forEach((result) => {
      result.events.forEach((event) => {
        const { name, dscr, location, date, restId, index, provider } = event;
        upcomingEvents.push({ name, dscr, location, date, restId, index, provider });
      });
    });
    Customer.findById(custId, { registeredEvents: true, _id: false }, (err, data) => {
      res.send({ upcomingEvents, registeredEvents: data.registeredEvents });
    });
  });
});
Router.post('/eventRegistration', (req, res) => {
  const { event } = req.body;
  const { index, restId } = event;
  Customer.findByIdAndUpdate(custId, { $push: { registeredEvents: event } }, options, (err, results) => {
    Restaurant.findById(restId, (err, restaurant) => {
      restaurant.events[index].registeredCustomers.push(custId);
      restaurant.markModified('events');
      restaurant.save((err) => console.log(err));
      res.send(results);
    });
  });
});

Router.post('/restaurantSearch', (req, res) => {
  const { name } = req.body;
  Restaurant.find({ name: { $regex: name, $options: 'i' } }, { name: true, location: true, img: true }, (err, results) => {
    // const { _id, name, location, img } = results;
    res.send(results);
  });
});
Router.get('/restaurantInfo/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    res.send(restaurant);
  });
});

Router.post('/submitReview', (req, res) => {
  const { name, comment, rating, custId, restId } = req.body;
  Restaurant.findByIdAndUpdate(restId, { $push: { reviews: { name, comment, rating, custId } } }, options, (err, results) => {
    res.send(results.reviews);
  });
});

Router.post('/submitOrder', (req, res) => {
  const { quantity, type, custName, restaurant, food, customer, restId } = req.body;
  Restaurant.findByIdAndUpdate(restId, { $push: { orders: { quantity, type, customer, food, custId } } }, options, (err, results) => {
    console.log('Updated restuarant');
  });
  Customer.findByIdAndUpdate(custId, { $push: { orders: { quantity, type, restaurant, food, restId } } }, options, (err, results) => {
    console.log('Updated customer');
  });
  res.send('Updated');
});

Router.get('/orders', (req, res) => {
  Customer.findById(custId, { orders: true, _id: false }, (err, data) => {
    res.send(data.orders);
  });
});

module.exports = Router;
