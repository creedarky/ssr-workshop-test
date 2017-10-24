import { SET_IMAGE, REMOVE_IMAGE } from 'actions/image.js';

export default function count(state = 0, action) {
  switch (action.type) {
    case SET_IMAGE:
      return state + 1;
    case REMOVE_IMAGE:
      return state - 1;
    default:
      return state;
  }
}
