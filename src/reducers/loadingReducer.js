import {
  IMAGES_LOAD_FAIL,
  IMAGES_LOAD_SUCCESS,
  IMAGE_LOAD
} from '../actions/types';

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case IMAGE_LOAD:
      return true;
    case IMAGES_LOAD_SUCCESS:
    case IMAGES_LOAD_FAIL:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;
