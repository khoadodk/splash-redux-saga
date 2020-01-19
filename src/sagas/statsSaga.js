import { take, call, fork, put } from 'redux-saga/effects';

import { IMAGES } from '../constants';
import { fetchImageStats } from '../api';
import {
  loadImageStats,
  setImageStats,
  setImageStatsError
} from '../actions/imageActions';

export function* handleStatsRequest(id) {
  try {
    yield put(loadImageStats(id));
    const res = yield call(fetchImageStats, id);
    yield put(setImageStats(id, res.downloads.total));
  } catch (error) {
    yield put(setImageStatsError(error.toString()));
  }
}

export default function* watchStatsRequest(id) {
  while (true) {
    //Get the images
    const { images } = yield take(IMAGES.LOAD_SUCCESS);
    // Loop over all the images, and set the worker saga to each image
    for (let i = 0; i < images.length; i++) {
      // fork is non blocking call, run this function in the background
      yield fork(handleStatsRequest, images[i].id);
    }
  }
}
