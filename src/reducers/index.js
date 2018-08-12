import { combineReducers } from 'redux';
import LoginFormReducer from './LoginFormReducer';
import ProfileFormReducer from './ProfileFormReducer';
import AddChurchFormReducer from './AddChurchFormReducer.js';

export default combineReducers({
  loginForm: LoginFormReducer,
  profileForm: ProfileFormReducer,
  addChurchForm: AddChurchFormReducer
});
