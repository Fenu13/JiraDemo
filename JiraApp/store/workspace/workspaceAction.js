import {jira} from '../../axios/axios';
export const GET_WORKSPACE = 'GETWORKSPACE';

export const getWorkspace = (id, token) => {
  console.log('ID=', id);
  console.log('token=', token);
  return async dispatch => {
    try {
      const response = await jira.get(`/getuserbyworkspace/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resData = response.data;

      dispatch({type: GET_WORKSPACE, workspaces: resData});
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
