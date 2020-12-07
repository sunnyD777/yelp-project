import { gql } from 'apollo-boost';

export const loginMutation = gql`
    mutation ($email: String, $password: String, $role: String){
        login(email: $email, password: $password, role: $role){
            status,
            content
        }
    }
`;
export const signupMutation = gql`
    mutation ($name: String, $email: String, $password: String,$location: String, $role: String){
        signup(name: $name,email: $email, password: $password,location: $location, role: $role){
            status,
            content
        }
    }
`;

export const updateRestaurantMutation = gql`
    mutation ($id: ID, $name: String, $email: String,$location: String, $dscr: String, $timings: String){
        updateRestaurant(id: $id,name: $name,email: $email, location: $location, ,dscr: $dscr, timings: $timings){
            status,
            content
        }
    }
`;

export const updateRestaurantMenuMutation = gql`
    mutation ($id: ID, $menu: String){
        updateRestaurantMenu(id: $id,menu: $menu){
            status,
            content
        }
    }
`;

export const addMenuItemMutation = gql`
    mutation ($id: ID, $newItem: String){
        addMenuItem(id: $id,newItem: $newItem){
            status,
            content
        }
    }
`;
export const changeOrderStatusMutation = gql`
mutation ($restId: ID,$custId: ID, $status: String, $index: Int ){
    changeOrderStatus(restId: $restId,custId: $custId,status: $status,index: $index){
        status,
        content
    }
}
`;
export const updateCustomerMutation = gql`
    mutation ($id: ID, $name: String, $email: String,$phone_num: String, $about: String, $birthday: String, $city: String, $state: String, $country: String, $nickname: String, $img: String){
        updateCustomer(id: $id,name: $name,email: $email, phone_num: $phone_num, ,about: $about, birthday: $birthday,city: $city,state: $state,country: $country,nickname: $nickname,img: $img){
            status,
            content
        }
    }
`;

export const RestaurantSearchMutation = gql`
mutation ($name: String) {
    restaurantSearch(name: $name) {
     status,
     content
    }
  }
`;

export const RestaurantInfoMutation = gql`
mutation ($id: ID) {
    restaurantInfo(id: $id) {
     status,
     content
    }
  }
`;

export const submitOrderMutation = gql`
mutation ($restId: ID,$custId: ID, $type: String, $quantity: Int, $restaurant: String,$customer: String,$food: String ){
    submitOrder(restId: $restId,custId: $custId,type: $type,quantity: $quantity,restaurant: $restaurant,customer: $customer,food: $food){
        status,
        content
    }
}
`;

export const submitReviewMutation = gql`
mutation ($restId: ID,$custId: ID, $comment: String,$name: String, $rating: Int ){
    submitReview(restId: $restId,custId: $custId,comment: $comment,name: $name,rating: $rating){
        status,
        content
    }
}
`;
