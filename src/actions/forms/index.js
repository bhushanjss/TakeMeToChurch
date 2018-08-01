import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import { EMAIL_CHANGE, PASSWORD_CHANGE, CONFIRM_PASSWORD_CHANGE,
  LOGIN_USER_SUCCESS, LOGIN_USER_FAILED,
  LOGIN_USER, CREATE_USER, TOGGLE_ACCOUNT } from './types';

//Login Login Form

export const emailChange = (text) => ({
  type: EMAIL_CHANGE,
  payload: text
});

export const passwordChange = (text) => ({
  type: PASSWORD_CHANGE,
  payload: text
});

export const confirmPasswordChange = (text) => ({
  type: CONFIRM_PASSWORD_CHANGE,
  payload: text
});

export const toggleAccount = (val) => ({
  type: TOGGLE_ACCOUNT,
  payload: val
});

export const loginUser = ({ email, password }) => (
   (dispatch) => {
    dispatch({ type: LOGIN_USER });
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(error => loginUserFailed(dispatch, error));
  }
);

export const createUser = ({ email, password }) => (
  (dispatch) => {
   dispatch({ type: CREATE_USER });
   firebase.auth().createUserWithEmailAndPassword(email, password)
   .then(user => loginUserSuccess(dispatch, user))
   .catch(error => loginUserFailed(dispatch, error));
 }
);

const loginUserSuccess = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
  Actions.showFlights({ type: 'reset' });
};

const loginUserFailed = (dispatch, error) => (
  dispatch({ type: LOGIN_USER_FAILED, payload: error })
);
