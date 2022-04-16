import {stat} from 'fs';
import {GET_TASK} from './taskAction';
import {GET_REPORTER} from './taskAction';
import {GET_ASSIGNED_USER} from './taskAction';
const initialState = {
  task: [],
  reporter: [],
  assigned: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK:
      return {
        ...state,
        task: action.tasks,
      };
    case GET_REPORTER:
      return {
        ...state,
        reporter: action.reporter,
      };
    case GET_ASSIGNED_USER:
      return {
        ...state,
        assigned: action.assigned,
      };
    default:
      return state;
  }
  // return state;
};

export default taskReducer;
