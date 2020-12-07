export const login = (user, id, role) => {
  return {
    type: 'LOGIN',
    user,
    id,
    role
  };
};
export const signUp = (user, id, role) => {
  return {
    type: 'SIGN_UP',
    user,
    id,
    role
  };
};
export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};

export const updateProfile = (user) => {
  return {
    type: 'UPDATE_PROFILE',
    user
  };
};

export const search = (results, values) => {
  return {
    type: 'SEARCH',
    search: results,
    searchValues: values
  };
};

export const registerEvent = (event) => {
  return {
    type: 'REGISTER_EVENT',
    event
  };
};
export const nameChangeHandler = (e) => {
  return {
    type: 'NAME_HANDLER',
    name: e.target.value
  };
};
export const emailChangeHandler = (e) => {
  return {
    type: 'EMAIL_HANDLER',
    email: e.target.value
  };
};
export const passwordChangeHandler = (e) => {
  return {
    type: 'PASSWORD_HANDLER',
    password: e.target.value
  };
};
export const locationChangeHandler = (e) => {
  return {
    type: 'LOCATION_HANDLER',
    location: e.target.value
  };
};
export const roleChangeHandler = (e) => {
  return {
    type: 'ROLE_HANDLER',
    role: e.target.value
  };
};

export const profileChangeHandler = (e) => {
  return {
    type: 'PROFILE_HANDLER',
    key: e.target.id,
    value: e.target.value
  };
};

export const pictureChangeHandler = (e) => {
  return {
    type: 'PICTURE_HANDLER',
    file: e.target.files[0]
  };
};
export const uploadPicture = (img) => {
  return {
    type: 'UPLOAD_PICTURE',
    img
  };
};
export const showUpdate = () => {
  return {
    type: 'SHOW_UPDATE',
  };
};

export const hideUpdate = () => {
  return {
    type: 'HIDE_UPDATE',
  };
};

export const hideUpload = () => {
  return {
    type: 'HIDE_UPLOAD',
  };
};
export const menuItemChangeHandler = (e) => {
  return {
    type: 'MENU_ITEM_HANDLER',
    index: parseInt(e.target.getAttribute('index')),
    key: e.target.getAttribute('keyname'),
    value: e.target.value
  };
};

export const newMenuItemChangeHandler = (e) => {
  return {
    type: 'NEW_MENU_ITEM_HANDLER',
    key: e.target.getAttribute('keyname'),
    value: e.target.value
  };
};

export const addToMenu = (newItem) => {
  return {
    type: 'ADD_MENU_ITEM',
    newItem
  };
};

export const initMenuItem = () => {
  return {
    type: 'INIT_MENU_ITEM',
  };
};
export const getReviews = (reviews) => {
  return {
    type: 'GET_REVIEWS',
    reviews
  };
};
export const initNewEvent = () => {
  return {
    type: 'INIT_NEW_EVENT',
  };
};
export const toggleAddEvent = () => {
  return {
    type: 'TOGGLE_ADD_EVENT',
  };
};
export const newEventChangeHandler = (e) => {
  return {
    type: 'NEW_EVENT_HANDLER',
    key: e.target.getAttribute('keyname'),
    value: e.target.value
  };
};
export const addNewEvent = (newEvent) => {
  return {
    type: 'ADD_EVENT',
    newEvent
  };
};
export const initCustomer = () => {
  return {
    type: 'INIT_CUSTOMER',
  };
};
export const getEvents = (upcomingEvents, registeredEvents) => {
  return {
    type: 'GET_EVENTS',
    upcomingEvents,
    registeredEvents
  };
};
export const toggleRegistered = () => {
  return {
    type: 'TOGGLE_REGISTERED',
  };
};
export const filterEvents = (eventType, events, eventFilter) => {
  return {
    type: 'FILTER_EVENTS',
    eventType,
    events,
    eventFilter
  };
};

export const setEventIndex = (eventIndex) => {
  return {
    type: 'EVENT_INDEX',
    eventIndex
  };
};
