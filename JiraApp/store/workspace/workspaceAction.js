import {jira} from '../../axios/axios';
export const GET_WORKSPACE = 'GETWORKSPACE';

export const getWorkspace = () => {
  return async (dispatch, getState) => {
    const userToken = getState().userData.users.token;
    const user_workspace = getState().userData.users.user.workspace_id;

    // console.log('ID=', user_workspace);
    // console.log('token=', userToken);
    try {
      const response = await jira.get(`/getuserbyworkspace/${user_workspace}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const resData = response.data;
      // console.log('RESDATA==', resData);
      dispatch({
        type: GET_WORKSPACE,
        usersData: resData.users,
        workspace: resData.workspace,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
