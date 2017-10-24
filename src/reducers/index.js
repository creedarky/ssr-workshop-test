import { combineReducers } from 'redux';
import count from './count.js';
import image from './image.js';

const rootReducer = combineReducers({
  count,
  image
});

export default rootReducer;
