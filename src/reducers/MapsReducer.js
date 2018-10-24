import { MAPS_INPUT_CHANGE, MAPS_AUTOCOMPLETE_SUBMIT, 
	MAPS_AUTOCOMPLETE_SUBMIT_SUCCESS, MAPS_AUTOCOMPLETE_SUBMIT_FAILED, 
	MAPS_PLACE_DETAILS, MAPS_PLACE_DETAILS_SUCCESS, 
	MAPS_PLACE_DETAILS_FAILED 
} from '../actions/services/types';

const INITIAL_STATE = {
	mapsInput: '',
	autoCompleteList: [],
	churchDetails: {
		latlang: {
			latitude: 39.7648686,
			longitude: -86.1616275
		},
		churchName: '',
		churchPhoneNumber: '',
		formattedAddress: '',
		churchAddress: {},
		icon: '',
		placeId: '',
		website: ''
	},
	loading: false,
	error: ''
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case MAPS_INPUT_CHANGE:
			return { ...state, mapsInput: action.payload };
		case MAPS_AUTOCOMPLETE_SUBMIT:
			return { ...state, loading: true };	
		case MAPS_AUTOCOMPLETE_SUBMIT_SUCCESS:
			return { ...state, loading: false, autoCompleteList: action.payload };
		case MAPS_AUTOCOMPLETE_SUBMIT_FAILED:
			return { ...state, loading: false, error: action.payload };
		case MAPS_PLACE_DETAILS:
			return { ...state, loading: true }
		case MAPS_PLACE_DETAILS_SUCCESS:
			return { ...state, loading: false, churchDetails: getChurchDetails(action.payload) }				
		default:
			return state;
	}	
}

const getChurchDetails = (data) => ({
	latlang: { latitude: data.geometry.location.lat, longitude: data.geometry.location.lng },
	churchName: data.name,
	churchPhoneNumber: data.formatted_phone_number,
	formattedAddress: data.formatted_address,
	churchAddress: data.address_components,
	icon: data.icon,
	placeId: data.place_id,
	website: data.website
});