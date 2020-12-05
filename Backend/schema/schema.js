const graphql = require('graphql');
const Customer = require('../Models/CustomerModels/CustomerModel');
const Restaurant = require('../Models/RestaurantModels/RestaurantModel');
const {login} = require('../Mutations/login')
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
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];

var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];
const StatusType = new GraphQLObjectType({
    name: 'Status',
    fields: () => ({
        status: { type: GraphQLString},
        content: { type: GraphQLString},
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
        orders: {type: new GraphQLList (CustomerOrderType)},
        registeredEvents: {type: new GraphQLList (CustomerEventType)},
    })
});

const CustomerOrderType = new GraphQLObjectType({
    name: 'Customer_Order',
    fields: () => ({
        restId: { type: GraphQLString},
        restaurant: { type: GraphQLString },
        food: { type: GraphQLString },
        type: { type: GraphQLString },
        status: { type: GraphQLString},
        order_time: { type: GraphQLString},
        quantity: { type: GraphQLInt}
    })
});

const CustomerEventType = new GraphQLObjectType({
    name: 'Customer_Event',
    fields: () => ({
        name: { type: GraphQLString},
        dscr: { type: GraphQLString },
        location: { type: GraphQLString },
        date: { type: GraphQLString},
        restId: { type: GraphQLString},
        index: { type: GraphQLInt},
        provider: { type: GraphQLString}
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
        orders: {type: new GraphQLList (RestaurantOrderType)},
        events: {type: new GraphQLList (RestaurantEventType)},
        reviews: {type: new GraphQLList (RestaurantReviewType)},
        menus: {type: new GraphQLList (RestaurantMenuType)}
    })
});

const RestaurantOrderType = new GraphQLObjectType({
    name: 'Restaurant_Order',
    fields: () => ({
        custId: { type: GraphQLString},
        customer: { type: GraphQLString },
        food: { type: GraphQLString },
        type: { type: GraphQLString },
        status: { type: GraphQLString},
        order_time: { type: GraphQLString},
        quantity: { type: GraphQLInt}
    })
});

const RestaurantEventType = new GraphQLObjectType({
    name: 'Restaurant_Event',
    fields: () => ({
        name: { type: GraphQLString},
        dscr: { type: GraphQLString },
        location: { type: GraphQLString },
        date: { type: GraphQLString},
        restId: { type: GraphQLString},
        index: { type: GraphQLInt},
        provider: { type: GraphQLString}
    })
});

const RestaurantReviewType = new GraphQLObjectType({
    name: 'Restaurant_Review',
    fields: () => ({
        name: { type: GraphQLString},
        custId: { type: GraphQLString },
        date: { type: GraphQLString},
        comment: { type: GraphQLString},
        rating: { type: GraphQLInt},
    })
});

const RestaurantMenuType = new GraphQLObjectType({
    name: 'Restaurant_Menu',
    fields: () => ({
        food_name: { type: GraphQLString},
        category: { type: GraphQLString },
        dscr: { type: GraphQLString},
        ingredients: { type: GraphQLString},
        price: { type: GraphQLString},
        img: { type: GraphQLString }
    })
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authors.find(author => author.id === parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books.filter(book => book.authorId === parent.id);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root Query',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return books.find(book => book.id === args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return authors.find(author => author.id === args.id );
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            async resolve(parent, args) {
                     let customers = await Customer.find()
                     return customers;
            }
        },
        restaurants: {
            type: new GraphQLList(RestaurantType),
            resolve(parent, args) {
                let restaurants = await Restaurant.find()
                return restaurants;
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                let author = {
                    name: args.name,
                    age: args.age,
                    id: args.id
                };
                authors.push(author)
                console.log("Authors", authors);
                return author;
            }
        },

        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID },
            },
            resolve(parent, args) {
                let book = {
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId,
                    id: books.length+1
                }
                books.push(book);
                return book;
            }
        }
        login: {
            type: CustomerType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                role: { type: GraphQLString },
            },
            resolve(parent, args) {
                return login(args)
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = schema;