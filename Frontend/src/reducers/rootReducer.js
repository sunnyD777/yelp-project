import { bindActionCreators } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initState = {
  role: 'Customer'
};

const persistConfig = {
  key: 'root',
  storage
};
const rootReducer = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case 'LOGIN':
    case 'SIGN_UP':
      return {
        user: action.user,
        isAuth: true,
        id: action.id,
        role: action.role.toLowerCase(),
      };
    case 'LOGOUT':
      return {
        isAuth: false,
        role: 'Customer'
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.user
        }
      };
    case 'SEARCH':
      return {
        ...state,
        searchResults: action.search,
        searchValues: action.searchValues
      };
    case 'NAME_HANDLER':
      return {
        ...state,
        name: action.name
      };
    case 'EMAIL_HANDLER':
      return {
        ...state,
        email: action.email
      };
    case 'PASSWORD_HANDLER':
      return {
        ...state,
        password: action.password
      };
    case 'LOCATION_HANDLER':
      return {
        ...state,
        location: action.location
      };
    case 'ROLE_HANDLER':
      return {
        ...state,
        role: action.role,
        name: '',
        email: '',
        password: '',
        location: ''
      };
    case 'PROFILE_HANDLER':
      return {
        ...state,
        user: {
          ...state.user,
          [action.key]: action.value
        }
      };
    case 'PICTURE_HANDLER':
      return {
        ...state,
        file: action.file,
        upload: true
      };
    case 'UPLOAD_PICTURE':
      return {
        ...state,
        user: {
          ...state.user,
          img: action.img
        }
      };
    case 'SHOW_UPDATE':
      return {
        ...state,
        update: true
      };
    case 'HIDE_UPDATE':
      return {
        ...state,
        update: false
      };
    case 'HIDE_UPLOAD':
      return {
        ...state,
        upload: false
      };
    case 'MENU_ITEM_HANDLER':
      return {
        ...state,
        user: {
          ...state.user,
          menu: state.user.menu.map((item, i) => {
            if (i === action.index) item[action.key] = action.value;
            return item;
          })
        }
      };
    case 'NEW_MENU_ITEM_HANDLER':
      return {
        ...state,
        menuItem: {
          ...state.menuItem,
          [action.key]: action.value
        }
      };
    case 'INIT_MENU_ITEM':
      return {
        ...state,
        menuItem: { food_name: '', price: '', ingredients: '', dscr: '', category: '', img: '' }
      };
    case 'ADD_MENU_ITEM':
      return {
        ...state,
        user: {
          ...state.user,
          menu: [...state.user.menu, action.newItem]
        }
      };
    case 'GET_REVIEWS':
      return {
        ...state,
        reviews: action.reviews
      };
    case 'INIT_NEW_EVENT':
      return {
        ...state,
        newEvent: { name: '', dscr: '', location: '', date: '' },
        addEvent: false
      };
    case 'TOGGLE_ADD_EVENT':
      return {
        ...state,
        addEvent: !state.addEvent
      };
    case 'NEW_EVENT_HANDLER':
      return {
        ...state,
        newEvent: {
          ...state.newEvent,
          [action.key]: action.value
        }
      };
    case 'ADD_EVENT':
      return {
        ...state,
        user: {
          ...state.user,
          events: [...state.user.events, action.newEvent]
        }
      };
    case 'INIT_CUSTOMER':
      return {
        ...state,
        upcomingEvents: [],
        eventFilter: '',
        registered: false
      };
    case 'GET_EVENTS':
      return {
        ...state,
        upcomingEvents: action.upcomingEvents,
        user: {
          ...state.user,
          registeredEvents: action.registeredEvents
        }
      };
    case 'REGISTER_EVENT':
      return {
        ...state,
        user: {
          ...state.user,
          registeredEvents: [...state.user.registeredEvents, action.event]
        }
      };
    case 'TOGGLE_REGISTERED':
      return {
        ...state,
        registered: !state.registered
      };
    case 'FILTER_EVENTS':
      return {
        ...state,
        [action.eventType]: action.events,
        eventFilter: action.eventFilter
      };
    case 'EVENT_INDEX':
      return {
        ...state,
        eventIndex: action.eventIndex
      };
    default:
      return state;
  }
};

export default persistReducer(persistConfig, rootReducer);
