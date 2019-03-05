import firebase from 'react-native-firebase';
import Auth from '@aws-amplify/auth';
import API from '@aws-amplify/api';
import Analytics from '@aws-amplify/analytics';
import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { FBLoginManager } from 'react-native-facebook-login';

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
  UPLOAD_IMAGE_FAILED, PROFILE_SAVE_MASS_TIME, PROFILE_CHURCH_DELETE_MASS_TIME, PROFILE_SAVE_CHURCH,
  PROFILE_SAVE_CHURCH_SUCCESS, PROFILE_SAVE_CHURCH_FAILED, LOAD_PROFILE_CHURCH, 
  LOAD_PROFILE_CHURCH_SUCCESS, CHURCH_MASS_DETAILS_SUCCESS, CHURCH_MAKE_DEFAULT, LOGOUT_USER, 
  LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILED, LOGIN_FACEBOOK_SUCCESS, CHURCH_DRIVE_DEFAULT } from './types';
  import { UPDATE_PROFILE_IMAGE_URL } from '../entities/types';

//login form
export const emailChange = (text) => action(EMAIL_CHANGE, text);
export const passwordChange = (text) => action(PASSWORD_CHANGE, text);
export const confirmPasswordChange = (text) => action(CONFIRM_PASSWORD_CHANGE, text);
export const toggleAccount = (val) => action(TOGGLE_ACCOUNT, val);
const apiName = 'tmtc';

export const loginUser = ({ email, password }) => (
   (dispatch) => {
    dispatch(action(LOGIN_USER));
    Auth.signIn(email, password)
    .then( user => loginUserSuccess(dispatch, user))
    .catch( error => 
      console.log(error => loginUserFailed(dispatch, error))
    );
  }
);

export const logoutUser = () => (
  (dispatch) => {
    dispatch(action(LOGOUT_USER));
    facebookLogOut();
    Auth.signOut()
      .then((data) => dispatch(action(LOGOUT_USER_SUCCESS)))
      .catch(error => dispatch(action(LOGOUT_USER_FAILED, error)));
  }
);

export const createUser = ({ email, password }) => (
  (dispatch) => {
   dispatch(action(CREATE_USER));
   Auth.signUp({
     username: email,
     password: password,
     attributes: { email }
   })
   .then( user => createUserSuccess(dispatch, user))
   .catch(error => loginUserFailed(dispatch, errror));
 }
);

export const loginFacebook = (data) => (
  (dispatch) => {
    loginFacebookCall(dispatch, data);
  }
);

export const checkFBLogin = () => (
  (dispatch) => {
    // FBLoginManager.getCredentials( (err, data) => {
    //   if(data && data.credentials) {
    //     loginFacebookCall(dispatch, data);
    //   }
    // });    
  }
 );  

const loginFacebookCall = (dispatch, data) => {
  dispatch(action(LOGIN_USER));
  const provider = 'facebook';
  const { token, tokenExpirationDate, userId } = data.credentials;
  const user = {
    userId
  };

  Auth.federatedSignIn(provider, {
    token,
    tokenExpirationDate
  }, user)
  .then( credentials => 
    console.log(credentials))
  .catch( error => 
    console.log(error));


  // const credentials = firebase.auth.FacebookAuthProvider.credential(token);
  // firebase.auth().signInAndRetrieveDataWithCredential(credentials)
  // .then(user => loginFacebookSuccess(dispatch, user))
  // .catch(error => loginUserFailed(dispatch, error));
}

const facebookLogOut = () => {
  FBLoginManager.getCredentials( (err, data) => {
    if(data && data.credentials) {
      FBLoginManager.logout( (err, data) => {
        console.log('logout success');
      });
    }
  });
}

const loginUserSuccess = (dispatch, user) => {  
  dispatch(action(LOGIN_USER_SUCCESS, user));
};

const loginFacebookSuccess = (dispatch, data) => {
  console.log(data.user);
  dispatch(action(LOGIN_FACEBOOK_SUCCESS, data.user));
  dispatch(action(UPDATE_PROFILE_IMAGE_URL, data.user['photoURL']));
}


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
export const cancelProfile = () => ( dispatch => NavigationService.navigate('Profile') );

export const saveProfile = (profile, driver, isChecked) => (
  (dispatch) => {
    const payload = { 
      headers: { 'Content-Type': 'application/json'},
      body: profile 
    };
    
    dispatch(action(SAVE_PROFILE));
    API.post(apiName, `/profiles`, payload)
    .then((res) => {
            dispatch(action(SAVE_PROFILE_SUCCESS, res.body));  
            // if(isChecked) {
            //   dispatch(action(SAVE_DRIVER));
            // }
            NavigationService.navigate('Profile');   
          }).catch( error => 
       dispatch(action(SAVE_PROFILE_FAILED, error)));
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
    const { currentUser } = firebase.auth();
    dispatch(action(SAVE_CHURCH));
    firebase.database().ref(`/churches/${church.placeId}`)
    .set({ ...church, reporter: currentUser.uid })
    .then(() => {
      dispatch(action(SAVE_CHURCH_SUCCESS));
      NavigationService.navigate('MapMain');
    });
  }
);

//profile church form
export const profileAddMassDropdown = text => action(PROFILE_SAVE_MASS_TIME, text);
export const profileChurchDeleteMassTime = text => action(PROFILE_CHURCH_DELETE_MASS_TIME, text);
export const churchLookUp = () => (
  (dispatch) => {
    NavigationService.navigate('MapMain');
  }
);
export const loadProfileChurches = () => (
  (dispatch) => {    
    const { currentUser } = firebase.auth();
    dispatch(action(LOAD_PROFILE_CHURCH));
    firebase.database().ref(`/profiles/${currentUser.uid}/churches`)
    .on('value', snapshot => {
        dispatch(action(LOAD_PROFILE_CHURCH_SUCCESS, snapshot.val()));     
    });
  }
);
export const saveProfileChurches = (churches, isChecked, placeId) => (
  (dispatch) => {
    const { currentUser } = firebase.auth();
    dispatch(action(PROFILE_SAVE_CHURCH));
    firebase.database().ref(`/profiles/${currentUser.uid}/churches`)
    .set(churches)
    .then(() => {
      dispatch(action(PROFILE_SAVE_CHURCH_SUCCESS, churches));
      if (isChecked) {
        dispatch(action(SAVE_DRIVER));
        firebase.database().ref(`/churches/${placeId}/drivers/${currentUser.uid}`)
        .set(true)
        .then(() => {
          dispatch(action(SAVE_DRIVER_SUCCESS));
        });
      }
    });
  }
);

export const editChurchMass = (placeId) => (
  (dispatch) => {
    firebase.database().ref(`/churches/${placeId}`)
      .on('value', snapshot => {
          dispatch(action(CHURCH_MASS_DETAILS_SUCCESS, snapshot.val()));
      });
  }
);

export const profileChurchMakeDefault = () => action(CHURCH_MAKE_DEFAULT);
export const profileChurchDriveDefault = (val) => action(CHURCH_DRIVE_DEFAULT, val);
