import { combineReducers } from 'redux';
import LoginFormReducer from './LoginFormReducer';
import ProfileFormReducer from './ProfileFormReducer';

export default combineReducers({
  loginForm: LoginFormReducer,
  profileForm: ProfileFormReducer
});
