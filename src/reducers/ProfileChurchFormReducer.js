import { PROFILE_SAVE_MASS_TIME, PROFILE_CHURCH_DELETE_MASS_TIME, PROFILE_SAVE_CHURCH, 
	PROFILE_SAVE_CHURCH_SUCCESS, LOAD_PROFILE_CHURCH, LOAD_PROFILE_CHURCH_SUCCESS, 
	CHURCH_MASS_DETAILS_SUCCESS, CHURCH_MAKE_DEFAULT } from '../actions/forms/types';
import { PLACE_DETAILS_SUCCESS } from '../actions/services/types';
import { removeElement, findElement, removeElementsArray, unsetDefaultValues } from '../util/util';

const INITIAL_STATE = {
	myChurches: [],
	selectedMassTimes: [],
	editChurchName: '',
	editChurchCity: '',
	editChurchMassTimes: [],
	editChurchPlaceId: '',
	editChurchDefault: false,
	error: '',
	loading: false
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PROFILE_SAVE_MASS_TIME:
			return { ...state, selectedMassTimes: [ ...state.selectedMassTimes, action.payload],
			editChurchMassTimes: removeElement(state.editChurchMassTimes, action.payload )};	
		case PROFILE_CHURCH_DELETE_MASS_TIME:
			return { ...state, selectedMassTimes: removeElement(state.selectedMassTimes, action.payload ),
			editChurchMassTimes: [ ...state.editChurchMassTimes, action.payload ]};
		case PROFILE_SAVE_CHURCH:
			return { ...state, loading: true };		
		case PROFILE_SAVE_CHURCH_SUCCESS:
			return { ...state, editChurchName: '', editChurchCity:'', editChurchMassTimes: [], editChurchPlaceId: '',
			 myChurches: action.payload, selectedMassTimes: [], loading: false, editChurchDefault: false };	
		case LOAD_PROFILE_CHURCH:
			return { ...state, loading: true };
		case LOAD_PROFILE_CHURCH_SUCCESS:
			return { ...state, loading: false, myChurches: action.payload, editChurchDefault: false, editChurchName: '', 
				editChurchCity: '', editChurchMassTimes: [], editChurchPlaceId: '' };
		case PLACE_DETAILS_SUCCESS:	
		case CHURCH_MASS_DETAILS_SUCCESS:
			const churchEdit = findElement(state.myChurches, action.payload.placeId, 'churchPlaceId');
			if(!churchEdit) {
				return { ...state, editChurchName: action.payload.churchName,
				 editChurchMassTimes: action.payload.massTimes, editChurchCity: 
				 action.payload.churchAddress.churchCity, editChurchPlaceId: action.payload.placeId
				};
			} else {
				return { ...state, editChurchName: action.payload.churchName,
					selectedMassTimes: churchEdit.massTimes, editChurchMassTimes: 
					removeElementsArray(action.payload.massTimes, churchEdit.massTimes), editChurchCity: 
					action.payload.churchAddress.churchCity, editChurchPlaceId: action.payload.placeId,
					myChurches: removeElement(state.myChurches, action.payload.placeId, 'churchPlaceId'),
					editChurchDefault: churchEdit.churchDefault
				};
			}
		case CHURCH_MAKE_DEFAULT:
			return { ...state, myChurches: unsetDefaultValues(state.myChurches, 'churchDefault'), editChurchDefault: true }				 				
		default:
		 	return state;
	}
}
