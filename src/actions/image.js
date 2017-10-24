export const SET_IMAGE = 'SET_IMAGE';
export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export function setImage(src) {
  return {
    type: SET_IMAGE,
    src
  };
}

export function removeImage() {
  return {
    type: REMOVE_IMAGE
  };
}
