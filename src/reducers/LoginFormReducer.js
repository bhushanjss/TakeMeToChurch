import { EMAIL_CHANGE, PASSWORD_CHANGE, CONFIRM_PASSWORD_CHANGE, LOGIN_USER, LOGIN_USER_SUCCESS,
 LOGIN_USER_FAILED, CREATE_USER, CREATE_USER_SUCCESS, RESET_LOGIN_FORM, TOGGLE_ACCOUNT,
 SAVE_PROFILE_SUCCESS, LOGOUT_USER, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILED, LOGIN_FACEBOOK_SUCCESS } from '../actions/forms/types';

import { getUserId } from '../util/util';

const INITIAL_STATE = {
  email: 'abc@c.com',
  password: 'Abcdefg@1',
  confirmPassword: '',
  error: '',
  loading: false,
  showCreateUser: false,
  user: null,
  drawerClosed: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGE:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGE:
      return { ...state, password: action.payload };
    case CONFIRM_PASSWORD_CHANGE:
      return { ...state, confirmPassword: action.payload };
    case LOGIN_USER:
    case CREATE_USER:
    case LOGOUT_USER:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload, userId: getUserId(action.payload) , error: '', loading: false };
    case LOGIN_FACEBOOK_SUCCESS:
      return { ...state, loading: false, user: action.payload } 
    case LOGIN_USER_FAILED:
      return { ...state,
        error: action.payload.message,
        loading: false,
        password: '',
        confirmPassword: '' };
    case LOGOUT_USER_SUCCESS:
      return { ...state, user: null, loading: false };          
    case CREATE_USER_SUCCESS:
      return { ...state, user: action.payload, error: '', userId: getUserId(action.payload), loading: false };
    case SAVE_PROFILE_SUCCESS:
      return { ...state, createUserDetailsPending: false };     
    case TOGGLE_ACCOUNT:
        return { ...state,
        showCreateUser: action.payload,
        error: '',
        password: '',
        confirmPassword: '' };
    case RESET_LOGIN_FORM:
      return INITIAL_STATE;
    case 'Navigation/OPEN_DRAWER':
    case 'Navigation/DRAWER_OPENED':
      return {...state, drawerClosed: false };  
    case 'Navigation/CLOSE_DRAWER':
    case 'Navigation/DRAWER_CLOSED':  
      return {...state, drawerClosed: true };
    default:
      return state;
  }
};
