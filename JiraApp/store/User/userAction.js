import {jira} from '../../axios/axios';
export const GET_LOGIN = 'GET_LOGIN';

export const getLogin = (email, password) => {
  return async dispatch => {
    try {
      const response = await jira.post('/users/login', {email, password});

      const resData = response.data;

      dispatch({type: GET_LOGIN, user: resData});
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
