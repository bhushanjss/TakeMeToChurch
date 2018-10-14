import axios from 'axios';
import _ from 'lodash';

import appKeys from '../../../secretkey';
import action from '../action';
import NavigationService from '../../NavigationService';

import { MAPS_INPUT_CHANGE, MAPS_AUTOCOMPLETE_SUBMIT, MAPS_AUTOCOMPLETE_SUBMIT_SUCCESS,
MAPS_AUTOCOMPLETE_SUBMIT_FAILED, MAPS_PLACE_DETAILS, MAPS_PLACE_DETAILS_SUCCESS,
MAPS_PLACE_DETAILS_FAILED, ADD_CHURCH_DETAILS
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
	}
)

export const addChurchDetails = (churchDetails) => (
	(dispatch) => {
		const church = {
  		  churchName: churchDetails.name,	
		  churchPhoneNumber: churchDetails.formatted_phone_number,
		  churchStreet: getAddress(churchDetails.address_components, 'street'),
		  churchCity: getAddress(churchDetails.address_components, 'city'),
		  churchState: getAddress(churchDetails.address_components, 'state'),
		  churchZip: getAddress(churchDetails.address_components, 'zip'),
		  churchCountry: getAddress(churchDetails.address_components, 'country'),
		  icon: churchDetails.icon,
		  placeId: churchDetails.placeId,
		  website: churchDetails.website,
		  latlang: churchDetails.latlang,
		  formattedAddress: churchDetails.formatted_address
		};
		dispatch(action(ADD_CHURCH_DETAILS, church));
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


