import {jira} from '../../axios/axios';
export const GET_TASK = 'GETTASK';

export const getTask = status => {
  return async dispatch => {
    try {
      const response = await jira.get('/getSelectTask/0', {
        // headers: {
        //   Authorization:
        //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjRiNDk0YjgzOGIxZGM2YTRmMjI5OTQiLCJpYXQiOjE2NDkxMDExMzF9.99NHuqQnBFp6_wH0rlQac8HAjn952p6vGAovjabXseY',
        // },
      });

      const resData = response.data;

      dispatch({type: GET_TASK, tasks: resData});
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
