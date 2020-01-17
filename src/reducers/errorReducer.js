import {
  IMAGES_LOAD_FAIL,
  IMAGE_LOAD,
  IMAGES_LOAD_SUCCESS
} from '../actions/types';

const errorReducer = (state = null, action) => {
  switch (action.type) {
    case IMAGES_LOAD_FAIL:
      return action.error;
    case IMAGES_LOAD_SUCCESS:
    case IMAGE_LOAD:
      return null;
    default:
      return state;
  }
};

export default errorReducer;
