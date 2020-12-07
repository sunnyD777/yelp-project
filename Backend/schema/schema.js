const graphql = require('graphql');
const Customer = require('../Models/CustomerModels/CustomerModel');
const Restaurant = require('../Models/RestaurantModels/RestaurantModel');
const { login } = require('../Mutations/login');
const { signup } = require('../Mutations/signup');
const { updateRestaurant, updateRestaurantMenu, addMenuItem, changeOrderStatus } = require('../Mutations/restaurant');
const { updateCustomer, restaurantSearch, restaurantInfo, submitOrder, submitReview } = require('../Mutations/customer');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// dummy data

const StatusType = new GraphQLObjectType({
  name: 'Status',
  fields: () => ({
    status: { type: GraphQLString },
    content: { type: GraphQLString },
  })
});
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    about: { type: GraphQLString },
    birthday: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    nickname: { type: GraphQLString },
    phone_num: { type: GraphQLString },
    img: { type: GraphQLString },
    orders: { type: new GraphQLList(CustomerOrderType) },
    registeredEvents: { type: new GraphQLList(CustomerEventType) },
  })
});

const CustomerOrderType = new GraphQLObjectType({
  name: 'Customer_Order',
  fields: () => ({
    restId: { type: GraphQLString },
    restaurant: { type: GraphQLString },
    food: { type: GraphQLString },
    type: { type: GraphQLString },
    status: { type: GraphQLString },
    order_time: { type: GraphQLString },
    quantity: { type: GraphQLInt },
    restIndex: { type: GraphQLInt },
  })
});

const CustomerEventType = new GraphQLObjectType({
  name: 'Customer_Event',
  fields: () => ({
    name: { type: GraphQLString },
    dscr: { type: GraphQLString },
    location: { type: GraphQLString },
    date: { type: GraphQLString },
    restId: { type: GraphQLString },
    index: { type: GraphQLInt },
    provider: { type: GraphQLString }
  })
});

const RestaurantType = new GraphQLObjectType({
  name: 'Restaurant',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    dscr: { type: GraphQLString },
    location: { type: GraphQLString },
    timings: { type: GraphQLString },
    img: { type: GraphQLString },
    orders: { type: new GraphQLList(RestaurantOrderType) },
    events: { type: new GraphQLList(RestaurantEventType) },
    reviews: { type: new GraphQLList(RestaurantReviewType) },
    menus: { type: new GraphQLList(RestaurantMenuType) }
  })
});

const RestaurantOrderType = new GraphQLObjectType({
  name: 'Restaurant_Order',
  fields: () => ({
    custId: { type: GraphQLString },
    customer: { type: GraphQLString },
    food: { type: GraphQLString },
    type: { type: GraphQLString },
    status: { type: GraphQLString },
    order_time: { type: GraphQLString },
    quantity: { type: GraphQLInt },
    custIndex: { type: GraphQLInt },
  })
});

const RestaurantEventType = new GraphQLObjectType({
  name: 'Restaurant_Event',
  fields: () => ({
    name: { type: GraphQLString },
    dscr: { type: GraphQLString },
    location: { type: GraphQLString },
    date: { type: GraphQLString },
    restId: { type: GraphQLString },
    index: { type: GraphQLInt },
    provider: { type: GraphQLString }
  })
});

const RestaurantReviewType = new GraphQLObjectType({
  name: 'Restaurant_Review',
  fields: () => ({
    name: { type: GraphQLString },
    custId: { type: GraphQLString },
    date: { type: GraphQLString },
    comment: { type: GraphQLString },
    rating: { type: GraphQLInt },
  })
});

const RestaurantMenuType = new GraphQLObjectType({
  name: 'Restaurant_Menu',
  fields: () => ({
    food_name: { type: GraphQLString },
    category: { type: GraphQLString },
    dscr: { type: GraphQLString },
    ingredients: { type: GraphQLString },
    price: { type: GraphQLString },
    img: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root Query',
  fields: {
    customers: {
      type: new GraphQLList(CustomerType),
      async resolve(parent, args) {
        const customers = await Customer.find();
        return customers;
      }
    },
    restaurants: {
      type: new GraphQLList(RestaurantType),
      async resolve(parent, args) {
        const restaurants = await Restaurant.find();
        return restaurants;
      }
    },
    customer: {
      type: CustomerType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const customer = await Customer.findById(args.id);
        return customer;
      }
    },
    restaurant: {
      type: RestaurantType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const restaurant = await Restaurant.findById(args.id);
        return restaurant;
      }
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString },
      },
      resolve(parent, args) {
        return login(args);
      }
    },
    signup: {
      type: StatusType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        location: { type: GraphQLString },
        role: { type: GraphQLString },
      },
      resolve(parent, args) {
        return signup(args);
      }
    },
    updateRestaurant: {
      type: StatusType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        location: { type: GraphQLString },
        dscr: { type: GraphQLString },
        timings: { type: GraphQLString },
      },
      resolve(parent, args) {
        return updateRestaurant(args);
      }
    },
    updateRestaurantMenu: {
      type: StatusType,
      args: {
        id: { type: GraphQLID },
        menu: { type: GraphQLString }
      },
      resolve(parent, args) {
        return updateRestaurantMenu(args);
      }
    },
    addMenuItem: {
      type: StatusType,
      args: {
        id: { type: GraphQLID },
        newItem: { type: GraphQLString }
      },
      resolve(parent, args) {
        return addMenuItem(args);
      }
    },
    changeOrderStatus: {
      type: StatusType,
      args: {
        restId: { type: GraphQLID },
        custId: { type: GraphQLID },
        status: { type: GraphQLString },
        index: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return changeOrderStatus(args);
      }
    },
    updateCustomer: {
      type: StatusType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone_num: { type: GraphQLString },
        about: { type: GraphQLString },
        birthday: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        nickname: { type: GraphQLString },
        img: { type: GraphQLString },
      },
      resolve(parent, args) {
        return updateCustomer(args);
      }
    },
    restaurantSearch: {
      type: StatusType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone_num: { type: GraphQLString },
        about: { type: GraphQLString },
        birthday: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        nickname: { type: GraphQLString },
        img: { type: GraphQLString },
      },
      resolve(parent, args) {
        return restaurantSearch(args);
      }
    },
    restaurantInfo: {
      type: StatusType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return restaurantInfo(args);
      }
    },
    submitOrder: {
      type: StatusType,
      args: {
        custId: { type: GraphQLID },
        restId: { type: GraphQLID },
        quantity: { type: GraphQLInt },
        type: { type: GraphQLString },
        restaurant: { type: GraphQLString },
        customer: { type: GraphQLString },
        food: { type: GraphQLString },
      },
      resolve(parent, args) {
        return submitOrder(args);
      }
    },
    submitReview: {
      type: StatusType,
      args: {
        custId: { type: GraphQLID },
        restId: { type: GraphQLID },
        rating: { type: GraphQLInt },
        comment: { type: GraphQLString },
        name: { type: GraphQLString },
      },
      resolve(parent, args) {
        return submitReview(args);
      }
    },
  }
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

module.exports = schema;
