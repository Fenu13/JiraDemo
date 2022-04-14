import {GET_WORKSPACE} from './workspaceAction';

const initialState = {
  workspace: [],
};

const workspaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WORKSPACE:
      return {
        workspaces: action.workspaces,
      };
  }
  return state;
};

export default workspaceReducer;
