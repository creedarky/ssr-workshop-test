import { SET_IMAGE, REMOVE_IMAGE } from 'actions/image.js';

export default function count(state = null, action) {
  switch (action.type) {
    case SET_IMAGE:
      console.log('action', action);
      return action.src;
    case REMOVE_IMAGE:
      return null;
    default:
      return state;
  }
}
