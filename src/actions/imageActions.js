import { IMAGE_LOAD, IMAGES_LOAD_FAIL, IMAGES_LOAD_SUCCESS } from './types';

const loadImages = () => ({
  type: IMAGE_LOAD
});

const setImages = images => ({
  type: IMAGES_LOAD_SUCCESS,
  images
});

const setError = error => ({
  type: IMAGES_LOAD_FAIL,
  error
});

export { loadImages, setError, setImages };
