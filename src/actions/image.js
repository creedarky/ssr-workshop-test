import axios from 'axios';

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

export function fetchImage() {
  return dispatch => (
    axios.get('http://localhost:6060/api')
      .then((response) => {
        console.log('completed fetch Image');
        dispatch(setImage(response.data.image));
      }
  ));
}
