import {jira} from '../../axios/axios';
export const GET_TASK = 'GETTASK';

export const getTask = (status, token) => {
  console.log('Stat=', status);
  console.log('token=', token);
  return async dispatch => {
    try {
      const response = await jira.get(`/getSelectTask/${status}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resData = response.data;

      dispatch({type: GET_TASK, tasks: resData});
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
