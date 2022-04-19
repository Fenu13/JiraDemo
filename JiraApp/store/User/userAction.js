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
      // console.log('Email==', email, password);

      const response = await jira.post('/users/login', {
        email: email,
        password: password,
      });

      const resData = response.data;
      // console.log('RESPONSE===', resData);
      const userDetail = {
        token: resData.token,
        user: {
          name: resData.user.name,
          id: resData.user._id,
          email: resData.user.email,
          workspace_id: resData.user.workspace_id,
        },
      };
      // console.log('NAME=', userDetail);
      await AsyncStorage.setItem('userData', JSON.stringify(resData));

      return dispatch(setUserData(resData));
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
