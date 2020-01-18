import { combineReducers } from 'redux';

import loadingReducer from './loadingReducer';
import imageReducer from './imageReducer';
import errorReducer from './errorReducer';
import pageReducer from './pageReducer';

const rootReducer = combineReducers({
  isLoading: loadingReducer,
  images: imageReducer,
  error: errorReducer,
  nextPage: pageReducer
});

export default rootReducer;
