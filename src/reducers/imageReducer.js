import { IMAGES_LOAD_SUCCESS } from '../actions/types';

const imageReducer = (state = {}, action) => {
  if (action.type === IMAGES_LOAD_SUCCESS) {
    return [...state, ...action.images];
  }
  return state;
};

export default imageReducer;
