import {GET_WORKSPACE} from './workspaceAction';

const initialState = {
  workspace: [],
  workspaceUsers: [],
};

const workspaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WORKSPACE:
      return {
        workspace: action.workspace,
        workspaceUsers: action.usersData,
      };
  }
  return state;
};

export default workspaceReducer;
