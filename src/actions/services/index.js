import axios from 'axios';
import firebase from 'react-native-firebase';
import _ from 'lodash';

import appKeys from '../../../secretkey';
import action from '../action';
import NavigationService from '../../NavigationService';

import { MAPS_INPUT_CHANGE, MAPS_AUTOCOMPLETE_SUBMIT, MAPS_AUTOCOMPLETE_SUBMIT_SUCCESS,
MAPS_AUTOCOMPLETE_SUBMIT_FAILED, MAPS_PLACE_DETAILS, MAPS_PLACE_DETAILS_SUCCESS,
MAPS_PLACE_DETAILS_FAILED, ADD_CHURCH_DETAILS, PLACE_DETAILS_SUCCESS
} from './types';


export const handleMapSearchInputChange = (text) => action(MAPS_INPUT_CHANGE, text);

export const handleMapSearch = (textInput) => (
	(dispatch) => {
		dispatch(action(MAPS_AUTOCOMPLETE_SUBMIT));
		axios({
		  method:'get',
		  url:'https://maps.googleapis.com/maps/api/place/autocomplete/json',
		  params: {
		  	input: textInput,
		  	region: 'us',
		  	key: appKeys.googleAPIKey
		  }
		})
	    .then(response => dispatch(action(MAPS_AUTOCOMPLETE_SUBMIT_SUCCESS, response.data.predictions)))
	    .catch(error => dispatch(action(MAPS_AUTOCOMPLETE_SUBMIT_FAILED, error)));
  	}
);



export const getPlaceDetails = (placeId) => (
	(dispatch) => {
		dispatch(action(MAPS_PLACE_DETAILS));
		firebase.database().ref(`/churches/${placeId}`)
	    .on('value', snapshot => {
	      const churchValues = snapshot.val();
	      if(!churchValues) { //does not exist in the DB.
	      	axios({
			  method:'get',
			  url:'https://maps.googleapis.com/maps/api/place/details/json',
			  params: {
			  	placeid: placeId,
			  	key: appKeys.googleAPIKey
			  }
			})
			.then(response => dispatch(action(MAPS_PLACE_DETAILS_SUCCESS, response.data.result)))
		    .catch(error => dispatch(action(MAPS_PLACE_DETAILS_FAILED, error)));
	      } else {
	        dispatch(action(PLACE_DETAILS_SUCCESS, snapshot.val()));     
	        NavigationService.navigate('ProfileChurchForm');
	      }      
	    });
	}
);

export const addChurchDetails = (churchDetails) => (
	(dispatch) => {
		const churchAddress = {
		  churchStreet: getAddress(churchDetails.churchAddress, 'street'),
		  churchCity: getAddress(churchDetails.churchAddress, 'city'),
		  churchState: getAddress(churchDetails.churchAddress, 'state'),
		  churchZip: getAddress(churchDetails.churchAddress, 'zip'),
		  churchCountry: getAddress(churchDetails.churchAddress, 'country')
		};
		dispatch(action(ADD_CHURCH_DETAILS, { ...churchDetails, churchAddress }));
		NavigationService.navigate('AddChurchForm');
	}
);

const getAddress = (data, type) => {
	switch(type) {
		case 'street':
			return _.filter(data, val => (
				val.types[0] === 'street_number' 
			))[0].short_name + ' ' + _.filter(data, val => (
				val.types[0] === 'route' 
			))[0].short_name;
		case 'city': 
			return _.filter(data, val => (
				val.types[0] === 'locality' 
			))[0].short_name;
		case 'state': 
			return _.filter(data, val => (
				val.types[0] === 'administrative_area_level_1' 
			))[0].short_name;
		case 'zip':  
			return _.filter(data, val => (
				val.types[0] === 'postal_code' 
			))[0].short_name;
		case 'country': 
			return _.filter(data, val => (
				val.types[0] === 'country'
			))[0].short_name;
	}
}


