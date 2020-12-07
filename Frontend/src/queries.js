import { gql } from 'apollo-boost';

export const getRestaurantReviews = gql`
query ($id: ID) {
    restaurant(id: $id) {
     reviews{
        name,
        custId,
        date,
        comment,
        rating
     }
    }
  }
`;

export const getRestaurantOrders = gql`
query ($id: ID) {
    restaurant(id: $id) {
     orders{
        custId,
        customer,
        food,
        type,
        status,
        order_time,
        quantity, 
        custIndex
     }
    }
  }
`;
export const getCustomerOrders = gql`
query ($id: ID) {
    customer(id: $id) {
     orders{
        restId,
        restaurant,
        food,
        type,
        status,
        order_time,
        quantity,
        restIndex
     }
    }
  }
`;
