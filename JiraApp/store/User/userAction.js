import AsyncStorage from '@react-native-community/async-storage';

import {jira} from '../../axios/axios';
export const GET_LOGIN = 'GET_LOGIN';
export const LOGOUT = 'LOGOUT';
export const GET_USER = GET_USER;

export const setUserData = userData => {
  return {type: GET_LOGIN, user: userData};
};

export const getLogin = (email, password) => {
  return async dispatch => {
    try {
      const response = await jira.post('/users/login', {
        email: email,
        password: password,
      });

      const resData = response.data;
      await AsyncStorage.setItem('userData', JSON.stringify(resData));
      return dispatch(setUserData(resData));
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
