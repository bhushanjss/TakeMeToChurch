import { combineReducers } from 'redux';
import EntitiesReducer from './EntitiesReducer';
import LoginFormReducer from './LoginFormReducer';
import ProfileFormReducer from './ProfileFormReducer';
import AddChurchFormReducer from './AddChurchFormReducer.js';

export default combineReducers({
  entities: EntitiesReducer,
  loginForm: LoginFormReducer,
  profileForm: ProfileFormReducer,
  addChurchForm: AddChurchFormReducer
});
