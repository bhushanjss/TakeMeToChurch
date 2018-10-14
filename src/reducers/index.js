import { combineReducers } from 'redux';
import EntitiesReducer from './EntitiesReducer';
import LoginFormReducer from './LoginFormReducer';
import ProfileFormReducer from './ProfileFormReducer';
import ProfileChurchFormReducer from './ProfileChurchFormReducer';
import AddChurchFormReducer from './AddChurchFormReducer';
import MapsReducer from './MapsReducer';

export default combineReducers({
  entities: EntitiesReducer,
  loginForm: LoginFormReducer,
  profileForm: ProfileFormReducer,
  profileChurch: ProfileChurchFormReducer,
  addChurchForm: AddChurchFormReducer,
  maps: MapsReducer
});
