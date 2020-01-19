// https://redux-saga.js.org/docs/advanced/Testing.html

import { runSaga } from 'redux-saga';
import { getPage, handleImagesLoad } from './imagesSaga';
import * as api from './../api'; // we'll mock the fetchImages api
import { setImages, setError } from '../actions/imageActions';

test('selector gives back the page', () => {
  const nextPage = 1;
  const state = { nextPage };
  const res = getPage(state);
  expect(res).toBe(nextPage);
});

test('should load images and handle them in case of success ', async () => {
  // we push all dispatched actions to make assertions easier
  // and our tests less brittle
  const dispatchedActions = [];

  // we don't want to perform an actual api call in our tests
  // so we will mock the fetchImages api with jest
  // this will mutate the dependency which we may reset if other tests
  // are dependent on it

  // 1. Mock the api function to return an array of images
  const mockedImages = ['img1', 'img2'];
  api.fetchImages = jest.fn(() => Promise.resolve(mockedImages));

  // 2. make a fake store
  const fakeStore = {
    getState: () => ({ nextPage: 1 }),
    dispatch: action => dispatchedActions.push(action)
  };
  //3. run the saga with mock value, pass it to the worker saga
  await runSaga(fakeStore, handleImagesLoad).toPromise();
  //The mock api function should be called once
  expect(api.fetchImages.mock.calls.length).toBe(1);
  expect(dispatchedActions).toContainEqual(setImages(mockedImages));
});

test('should handle image load errors in case of failure', async () => {
  const dispatchedActions = [];

  // we simulate an error by rejecting the promise
  // then we assert if our saga dispatched the action(s) correctly
  const error = 'API server is down';
  api.fetchImages = jest.fn(() => Promise.reject(error));

  const fakeStore = {
    getState: () => ({ nextPage: 1 }),
    dispatch: action => dispatchedActions.push(action)
  };

  await runSaga(fakeStore, handleImagesLoad).done;

  expect(api.fetchImages.mock.calls.length).toBe(1);
  expect(dispatchedActions).toContainEqual(setError(error));
});
