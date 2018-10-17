import { PROFILE_SAVE_MASS_TIME } from '../actions/forms/types';
import { PLACE_DETAILS_SUCCESS } from '../actions/services/types';
import { removeElement } from '../util/util';

const INITIAL_STATE = {
	myChurches: [{
			churchName: 'St Johns',
			massTimes: ['Sunday 11:00 AM', 'Sunday 12:00 PM']
		},
		{
			churchName: 'St Johns 1',
			massTimes: ['Sunday 11:00 AM', 'Sunday 12:00 PM']
		},
		{
			churchName: 'St Johns 2',
			massTimes: ['Sunday 11:00 AM', 'Sunday 12:00 PM']
		}
	],
	selectedMassTimes: [],
	editChurchName: '',
	editChurchMassTimes: [],
	editChurchPlaceId: '',
	error: '',
	loading: false
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PROFILE_SAVE_MASS_TIME:
			return { ...state, selectedMassTimes: [ ...state.selectedMassTimes, action.payload],
			editChurchMassTimes: removeElement(state.editChurchMassTimes, action.payload ) }
		case PLACE_DETAILS_SUCCESS:
			return { ...state, editChurchName: action.payload.churchName,
			 editChurchMassTimes: action.payload.massTimes, editChurchPlaceId: action.payload.placeId  
			}
		default:
		 	return state;
	}
}
