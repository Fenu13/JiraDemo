import {combineReducers} from 'redux';
import taskReducer from './Task/taskReducer';
import loginReducer from './User/userReducer';
import workspaceReducer from './workspace/workspaceReducer';
export const rootReducer = combineReducers({
  tasks: taskReducer,
  userData: loginReducer,
  workspaces: workspaceReducer,
});
