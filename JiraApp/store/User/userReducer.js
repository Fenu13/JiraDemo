import {getLogin} from './userAction';

const initalLoginState = {
  isLoading: true,
  userName: null,
  userToken: null,
  users: [],
};

const loginReducer = (prevState = initalLoginState, action) => {
  switch (action.type) {
    case 'RETRIEVE_TOKEN': //For First Time Login previously or not
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case 'GET_LOGIN':
      return {
        ...prevState,
        users: action.user,
        isLoading: false,
      };

    case 'LOGOUT':
      return {
        ...prevState,
        userName: null,
        userToken: null,
        isLoading: false,
      };
    default:
      return prevState;
  }
};

export default loginReducer;
