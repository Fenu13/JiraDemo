import {jira} from '../../axios/axios';
export const GET_TASK = 'GET_TASK';

export const getTask = () => {
  return async dispatch => {
    try {
      const response = await jira.get('/tasks');
      const resData = response.data;
      dispatch({type: GET_TASK, tasks: resData});
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
