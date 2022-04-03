import {GET_TASK} from './taskAction';
const initialState = {
  task: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK:
      return {
        tasks: action.tasks,
      };
  }
  return state;
};

export default taskReducer;
