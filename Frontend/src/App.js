import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import RestaurantHome from './components/Restaurant/Home/RestaurantHome';
import RestaurantOrders from './components/Restaurant/Orders/RestaurantOrders';
import RestaurantEvents from './components/Restaurant/Events/RestaurantEvents';
import CustomerInfo from './components/Restaurant/CustomerInfo';
import RestaurantInfo from './components/Customer/RestaurantInfo';
import CustomerProfile from './components/Customer/Home/CustomerProfile';
import CustomerOrders from './components/Customer/Orders/CustomerOrders';
import CustomerEvents from './components/Customer/Events/CustomerEvents';
import RestaurantSearch from './components/Customer/RestaurantSearch';
import EventRegistration from './components/Customer/Events/EventRegistration';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});
function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div className="App">
          <Route path="/" component={Navbar} />
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/restaurant" component={RestaurantHome} />
          <Route path="/restaurant/orders" component={RestaurantOrders} />
          <Route path="/restaurant/events" component={RestaurantEvents} />
          <Route path="/restaurant/customerInfo/:id" component={CustomerInfo} />
          <Route path="/customer/restaurantInfo/:id" component={RestaurantInfo} />
          <Route exact path="/customer" component={CustomerProfile} />
          <Route path="/customer/orders" component={CustomerOrders} />
          <Route path="/customer/events" component={CustomerEvents} />
          <Route path="/customer/eventRegistration" component={EventRegistration} />
          <Route path="/customer/restaurantSearch" component={RestaurantSearch} />
        </div>
      </ApolloProvider>
    </BrowserRouter>

  );
}

export default App;
