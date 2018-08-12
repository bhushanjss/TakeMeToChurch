import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import action from '../action';
import { EMAIL_CHANGE, PASSWORD_CHANGE, CONFIRM_PASSWORD_CHANGE,
  LOGIN_USER_SUCCESS, LOGIN_USER_FAILED, LOGIN_USER, CREATE_USER, CREATE_USER_SUCCESS,
  TOGGLE_ACCOUNT, FIRST_NAME_CHANGE, LAST_NAME_CHANGE, PHONE_NUMBER_CHANGE, PROFILE_STREET_CHANGE,
  PROFILE_APT_CHANGE, PROFILE_CITY_CHANGE, PROFILE_STATE_CHANGE, PROFILE_ZIP_CHANGE,
  CAR_MODEL_CHANGE, CAR_SEATS_CHANGE, PROFILE_CHECKBOX_CHECKED, SAVE_PROFILE,
  SAVE_PROFILE_SUCCESS, SAVE_PROFILE_FAILED, CHURCH_NAME_CHANGE,
  CHURCH_PHONE_NUMBER_CHANGE, CHURCH_STREET_CHANGE, CHURCH_CITY_CHANGE,
  CHURCH_STATE_CHANGE, CHURCH_ZIP_CHANGE, MASS_TIME_CHANGE,
  ADD_MASS_TIME, DELETE_MASS_TIME, SAVE_MASS_TIME, SAVE_CHURCH,
  SAVE_CHURCH_SUCCESS, SAVE_CHURCH_FAILED } from './types';

//login form

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

//profile forms
export const firstNameChange = (text) => action(FIRST_NAME_CHANGE, text);
export const lastNameChange = (text) => action(LAST_NAME_CHANGE, text);
export const phoneNumberChange = (text) => action(PHONE_NUMBER_CHANGE, text);
export const profileStreetChange = (text) => action(PROFILE_STREET_CHANGE, text);
export const profileAptChange = (text) => action(PROFILE_APT_CHANGE, text);
export const profileCityChange = (text) => action(PROFILE_CITY_CHANGE, text);
export const profileStateChange = (text) => action(PROFILE_STATE_CHANGE, text);
export const profileZipChange = (text) => action(PROFILE_ZIP_CHANGE, text);
export const carModelChange = (text) => action(CAR_MODEL_CHANGE, text);
export const carSeatsChange = (text) => action(CAR_SEATS_CHANGE, text);
export const isProfileCheckboxChanged = (val) => action(PROFILE_CHECKBOX_CHECKED, val);

//add church form
export const churchNameChange = text => action(CHURCH_NAME_CHANGE, text);
export const churchPhoneNumberChange = text => action(CHURCH_PHONE_NUMBER_CHANGE, text);
export const churchStreetChange = text => action(CHURCH_STREET_CHANGE, text);
export const churchCityChange = text => action(CHURCH_CITY_CHANGE, text);
export const churchStateChange = text => action(CHURCH_STATE_CHANGE, text);
export const churchZipChange = text => action(CHURCH_ZIP_CHANGE, text);
export const massTimeChange = text => action(MASS_TIME_CHANGE, text);
export const addMassTimeChange = () => action(ADD_MASS_TIME);
export const saveMassTimeChange = text => action(SAVE_MASS_TIME, text);
export const deleteMassTimeChange = text => action(DELETE_MASS_TIME, text);

export const saveChurch = (church) => (
  (dispatch) => {
    dispatch(action(SAVE_CHURCH));
    firebase.database().ref('/churches/')
    .push(church)
    .on('value', snapshot => {
      dispatch(action(SAVE_CHURCH_SUCCESS, snapshot.val()));
    });
  }
);
