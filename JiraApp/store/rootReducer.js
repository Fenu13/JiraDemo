import {combineReducers} from 'redux';
import taskReducer from './Task/taskReducer';

export const rootReducer = combineReducers({
  tasks: taskReducer,
});
