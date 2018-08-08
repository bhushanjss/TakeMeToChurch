import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import action from '../action';
import { EMAIL_CHANGE, PASSWORD_CHANGE, CONFIRM_PASSWORD_CHANGE,
  LOGIN_USER_SUCCESS, LOGIN_USER_FAILED, LOGIN_USER, CREATE_USER, CREATE_USER_SUCCESS,
  TOGGLE_ACCOUNT, FIRST_NAME_CHANGE, LAST_NAME_CHANGE, PHONE_NUMBER_CHANGE, PROFILE_STREET_CHANGE,
  PROFILE_APT_CHANGE, PROFILE_CITY_CHANGE, PROFILE_STATE_CHANGE, PROFILE_ZIP_CHANGE,
  CAR_MODEL_CHANGE, CAR_SEATS_CHANGE, SAVE_PROFILE, SAVE_PROFILE_SUCCESS, SAVE_PROFILE_FAILED } from './types';

//Login Form

export const emailChange = (text) => action(EMAIL_CHANGE, text);
export const passwordChange = (text) => action(PASSWORD_CHANGE, text);
export const confirmPasswordChange = (text) => action(CONFIRM_PASSWORD_CHANGE, text);
export const toggleAccount = (val) => action(TOGGLE_ACCOUNT, val);

export const loginUser = ({ email, password }) => (
   (dispatch) => {
    dispatch(action(LOGIN_USER));
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(error => loginUserFailed(dispatch, error));
  }
);

export const createUser = ({ email, password }) => (
  (dispatch) => {
   dispatch(action(CREATE_USER));
   firebase.auth().createUserWithEmailAndPassword(email, password)
   .then(user => createUserSuccess(dispatch, user))
   .catch(error => loginUserFailed(dispatch, error));
 }
);

const loginUserSuccess = (dispatch, user) => {
  dispatch(action(LOGIN_USER_SUCCESS, user));
  Actions.profile({ type: 'reset' });
};

const createUserSuccess = (dispatch, user) => {
  dispatch(action(CREATE_USER_SUCCESS, user));
  Actions.profileForm({ type: 'reset' });
};

const loginUserFailed = (dispatch, error) => (
  dispatch(action(LOGIN_USER_FAILED, error))
);

//Profile forms

export const firstNameChange = (text) => ({
  type: FIRST_NAME_CHANGE,
  payload: text
});
