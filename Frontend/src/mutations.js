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
// export { loginMutation, signupMutation };
