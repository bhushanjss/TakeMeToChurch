import firebase from 'react-native-firebase';
import API from '@aws-amplify/api';

import action from '../action';
import NavigationService from '../../NavigationService';

import { LOAD_PROFILE, LOAD_PROFILE_SUCCESS, LOAD_PROFILE_FAILED,
  LOAD_DRIVER, EDIT_PROFILE, LOAD_DRIVER_SUCCESS, LOAD_DRIVER_FAILED, 
  UPDATE_PROFILE_IMAGE_URL, GET_DRIVERS, GET_DRIVERS_SUCCESS, GET_DRIVERS_FAILED } from './types';

const apiName = 'tmtc';

export const loadProfile = (userId) => (
  (dispatch) => {
    dispatch(action(LOAD_PROFILE));

    API.get(apiName, `/profiles/${userId}`)
    .then( (data) => {
         console.log(data);
         if(!data.body) {
            NavigationService.navigate('ProfileForm');
          } else {
            dispatch(action(LOAD_PROFILE_SUCCESS, data.body)); 
          }
       }).catch( error => 
       dispatch(action(LOAD_PROFILE_FAILED, error)));
  }
);

export const loadProfileImage = (userId) => (
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

export const getDrivers = (churchId) => (
  (dispatch) => {
    dispatch(action(GET_DRIVERS));
    firebase.database().ref('/drivers')
    .on('value', snap => {
      dispatch(action(GET_DRIVERS_SUCCESS, snap.val()));
        NavigationService.navigate('Drivers');
    });
  }
 );

export const editProfile = (profile) => (
  (dispatch) => {
    dispatch(action(EDIT_PROFILE, profile));
    NavigationService.navigate('ProfileForm');
  }
);
