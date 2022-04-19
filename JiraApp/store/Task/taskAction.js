import {jira} from '../../axios/axios';
export const GET_TASK = 'GETTASK';
export const GET_REPORTER = 'GET_REPORTER';
export const GET_ASSIGNED_USER = 'GET_ASSIGNED_USER';
export const getTask = (status, token) => {
  // console.log('Stat=', status);
  // console.log('token=', token);
  return async dispatch => {
    try {
      const response = await jira.get(`/getSelectTask/${status}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resData = response.data;
      //console.log('RES==', resData);
      dispatch({type: GET_TASK, tasks: resData});
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const getuserbyreport = reporter_id => {
  return async (dispatch, getState) => {
    const userToken = getState().userData.users.token;
    //  console.log('token=====', userToken);
    try {
      const response = await jira.get(`/getuserbyid/${reporter_id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const resData = response.data;
      dispatch({
        type: GET_REPORTER,
        reporter: resData,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const getassigneduser = assign_id => {
  return async (dispatch, getState) => {
    const userToken = getState().userData.users.token;

    try {
      // console.log('Ress=', assign_id);
      const response = await jira.get(`/getuserbyid/${assign_id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const resData = response.data;
      // console.log('RES==', resData);
      dispatch({
        type: GET_ASSIGNED_USER,
        assigned: resData,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
