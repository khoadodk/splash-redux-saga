import { combineReducers } from 'redux';

import loadingReducer from './loadingReducer';
import imageReducer from './imageReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
  isLoading: loadingReducer,
  images: imageReducer,
  error: errorReducer
});

export default rootReducer;
