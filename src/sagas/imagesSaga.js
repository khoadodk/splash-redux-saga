import { takeEvery, select, call, put } from 'redux-saga/effects';
import { setImages, setError } from '../actions/imageActions';
import { IMAGES } from '../constants';
import { fetchImages } from '../api';

/* Action Flow
    1. Click on "Load More" button, the action IMAGES.LOAD is dispatched
    2. The watcher saga watchImagesLoad call the works saga handleImagesLoad
    3. fetchImages execute the API call 
    4. An action to update the state is dispatched( setImages or setError)
*/

const getPage = state => state.nextPage;

function* handleImagesLoad() {
  try {
    //pulling the nextPage from the state
    const page = yield select(getPage);
    // call the function fetchImages pass the page to it, return an object of images
    const images = yield call(fetchImages, page);
    // dispatch the action {type: IMAGES.LOAD_SUCCESS, images}
    yield put(setImages(images));
  } catch (error) {
    //{type: IMAGES.LOAD_FAIL, error}
    yield put(setError(error.toString()));
  }
}

export default function* watchImagesLoad() {
  yield takeEvery(IMAGES.LOAD, handleImagesLoad);
}
