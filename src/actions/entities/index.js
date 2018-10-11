import firebase from 'react-native-firebase';

import action from '../action';
import NavigationService from '../../NavigationService';

import { LOAD_PROFILE, LOAD_PROFILE_SUCCESS, LOAD_PROFILE_FAILED,
  LOAD_DRIVER, EDIT_PROFILE, LOAD_DRIVER_SUCCESS, LOAD_DRIVER_FAILED, UPDATE_PROFILE_IMAGE_URL } from './types';

export const loadProfile = () => (
  (dispatch) => {
    const { currentUser } = firebase.auth();
    dispatch(action(LOAD_PROFILE));
    firebase.database().ref(`/profiles/${currentUser.uid}`)
    .on('value', snapshot => {
      const profileVal = snapshot.val();
      if(!profileVal) {
        NavigationService.navigate('ProfileForm');
      } else {
        dispatch(action(LOAD_PROFILE_SUCCESS, snapshot.val()));     
      }      
    });
  }
);

export const loadProfileImage = () => (
   (dispatch) => {
    const { currentUser } = firebase.auth();
    const imageRef = firebase.storage().ref('images')
    .child(`${currentUser.uid}`).child('profile');
    const profileImgUrl = imageRef.getDownloadURL();
    profileImgUrl.then((url) => {
      dispatch(action(UPDATE_PROFILE_IMAGE_URL, url));
    });    
  }
);

export const loadDrivers = () => (
  (dispatch) => {
    dispatch(action(LOAD_DRIVER));
    firebase.database().ref('/drivers')
    .on('value', snap => {      
      dispatch(action(LOAD_DRIVER_SUCCESS, snap.val()));
    });
  }
);

export const editProfile = (profile) => (
  (dispatch) => {
    dispatch(action(EDIT_PROFILE, profile));
    NavigationService.navigate('ProfileForm');
  }
);
