import {combineReducers} from 'redux';
import taskReducer from './Task/taskReducer';
import loginReducer from './User/userReducer';
export const rootReducer = combineReducers({
  tasks: taskReducer,
  users: loginReducer,
});
