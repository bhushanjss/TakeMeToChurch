import firebase from 'react-native-firebase';
import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import NavigationService from '../../NavigationService';
import action from '../action';
import { EMAIL_CHANGE, PASSWORD_CHANGE, CONFIRM_PASSWORD_CHANGE,
  LOGIN_USER_SUCCESS, LOGIN_USER_FAILED, LOGIN_USER, CREATE_USER, CREATE_USER_SUCCESS,
  TOGGLE_ACCOUNT, FIRST_NAME_CHANGE, LAST_NAME_CHANGE, PHONE_NUMBER_CHANGE, PROFILE_STREET_CHANGE,
  PROFILE_APT_CHANGE, PROFILE_CITY_CHANGE, PROFILE_STATE_CHANGE, PROFILE_ZIP_CHANGE,
  CAR_MODEL_CHANGE, CAR_SEATS_CHANGE, PROFILE_CHECKBOX_CHECKED, SAVE_PROFILE,
  SAVE_PROFILE_SUCCESS, SAVE_PROFILE_FAILED, SAVE_DRIVER, SAVE_DRIVER_SUCCESS,
  SAVE_DRIVER_FAILED, CHURCH_NAME_CHANGE, CHURCH_PHONE_NUMBER_CHANGE,
  CHURCH_STREET_CHANGE, CHURCH_CITY_CHANGE, CHURCH_STATE_CHANGE, CHURCH_ZIP_CHANGE,
  MASS_TIME_CHANGE, ADD_MASS_TIME, DELETE_MASS_TIME, SAVE_MASS_TIME, SAVE_CHURCH,
  SAVE_CHURCH_SUCCESS, SAVE_CHURCH_FAILED, UPLOAD_IMAGE, UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILED } from './types';
  import { UPDATE_PROFILE_IMAGE_URL } from '../entities/types';

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

export const loginFacebook = (token) => (
  (dispatch) => {
    dispatch(action(LOGIN_USER));
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    firebase.auth().signInAndRetrieveDataWithCredential(credential)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(error => loginUserFailed(dispatch, error));
  }
);

const loginUserSuccess = (dispatch, user) => {
  dispatch(action(LOGIN_USER_SUCCESS, user));
  NavigationService.navigate('Profile');
};

const createUserSuccess = (dispatch, user) => {
  dispatch(action(CREATE_USER_SUCCESS, user));
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

export const saveProfile = (profile, driver, isChecked) => (
  (dispatch) => {
    const { currentUser } = firebase.auth();
    dispatch(action(SAVE_PROFILE));
    firebase.database().ref(`/profiles/${currentUser.uid}`)
    .push(profile)
    .on('value', snapshot => {
      dispatch(action(SAVE_PROFILE_SUCCESS, snapshot.val()));
      if (isChecked) {
        dispatch(action(SAVE_DRIVER));
        firebase.database().ref('/drivers')
        .push({ ...driver, profileId: snapshot.key, userId: currentUser.uid })
        .on('value', snap => {
          dispatch(action(SAVE_DRIVER_SUCCESS, snap.val()));
        });
      }
      NavigationService.navigate('Profile');
    });
  }
);

const uploadingImage = (uri, mime = 'application/octet-stream') => (
  new Promise((resolve, reject) => {
    const { currentUser } = firebase.auth();
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const imageRef = firebase.storage().ref('images').child(`${currentUser.uid}`).child('profile');

    imageRef.put(uploadUri, { contentType: mime })    
      .then(() => {
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        resolve(url);
      })
      .catch((error) => {
        reject(error);
    });
  })
);

export const uploadImage = () => {

  return (dispatch) => {
    dispatch(action(UPLOAD_IMAGE));
    ImagePicker.launchImageLibrary({}, response => {
      uploadingImage(response.uri)
        .then(url => {
          dispatch(action(UPLOAD_IMAGE_SUCCESS, url));
          dispatch(action(UPDATE_PROFILE_IMAGE_URL, url))
        })
        .catch(error => dispatch(action(UPLOAD_IMAGE_FAILED, error)));
    });
  };
};

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
