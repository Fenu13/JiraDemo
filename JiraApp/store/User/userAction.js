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

// export const getLogout = () => {
//   console.log('hrllo');
//   return async dispatch => {
//     try {
//       await AsyncStorage.removeItem('userToken');
//       dispatch({type: LOGOUT});
//     } catch (err) {
//       console.log(err);
//       //throw err;
//     }
//   };
// };

// export const getUser = () => {
//   return async dispatch => {
//     const jsonValue = await AsyncStorage.getItem('userData');
//     const objectValue = JSON.parse(jsonValue);
//     const token = objectValue.token;
//     try {
//       const response = await jira.get(`/users/me`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const resData = response.data;

//       console.log(resData);

//       // dispatch({type: GET_USER, users: resData});
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   };
// };
