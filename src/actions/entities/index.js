import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import action from '../action';

import { LOAD_PROFILE, LOAD_PROFILE_SUCCESS, LOAD_PROFILE_FAILED,
  LOAD_DRIVER, LOAD_DRIVER_SUCCESS, LOAD_DRIVER_FAILED } from './types';

export const loadProfile = () => (
  (dispatch) => {
    const { currentUser } = firebase.auth();
    dispatch(action(LOAD_PROFILE));
    firebase.database().ref(`/profiles/${currentUser.uid}`)
    .on('value', snapshot => {
      dispatch(action(LOAD_PROFILE_SUCCESS, snapshot.val()));
      Actions.profile({ type: 'reset' });
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
