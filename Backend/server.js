const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

const { dbURI } = require('./Config/keys');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500
};
mongoose.connect(dbURI, options)
  .then(() => console.log('Database succesfully connected!'))
  .catch((err) => console.log(err));

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/', require('./Routes/loginRoutes'));
app.use('/restaurant', require('./Routes/restaurantRoutes'));
app.use('/customer', require('./Routes/customerRoutes'));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT, console.log(`Server is running on localhost:${PORT}...`));
module.exports = app;
