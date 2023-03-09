import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { spotErrorsReducer } from './spots';

export default combineReducers({
  session: sessionErrorsReducer,
  spot: spotErrorsReducer
});
