import { CHURCH_NAME_CHANGE, CHURCH_PHONE_NUMBER_CHANGE, CHURCH_STREET_CHANGE,
  CHURCH_CITY_CHANGE, CHURCH_STATE_CHANGE, CHURCH_ZIP_CHANGE, MASS_TIME_CHANGE,
  ADD_MASS_TIME, SAVE_CHURCH, SAVE_CHURCH_SUCCESS, SAVE_CHURCH_FAILED,
  SAVE_MASS_TIME, DELETE_MASS_TIME } from '../actions/forms/types';

  import { removeElement } from '../util/util';

const INITIAL_STATE = {
  churchName: '',
  churchPhoneNumber: '',
  churchStreet: '',
  churchCity: '',
  churchState: '',
  churchZip: '',
  massTime: 'SUN 12:00 PM',
  massTimes: [],
  addMassTime: false,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  console.log(state);
  switch (action.type) {
    case CHURCH_NAME_CHANGE:
      return { ...state, churchName: action.payload };
    case CHURCH_PHONE_NUMBER_CHANGE:
      return { ...state, churchPhoneNumber: action.payload };
    case CHURCH_STREET_CHANGE:
      return { ...state, churchStreet: action.payload };
    case CHURCH_CITY_CHANGE:
      return { ...state, churchCity: action.payload };
    case CHURCH_STATE_CHANGE:
      return { ...state, churchState: action.payload };
    case CHURCH_ZIP_CHANGE:
      return { ...state, churchZip: action.payload };
    case ADD_MASS_TIME:
      return { ...state, addMassTime: true };
    case SAVE_MASS_TIME:
      return { ...state, massTimes: [...state.massTimes, action.payload], addMassTime: false };
    case DELETE_MASS_TIME:
      return { ...state, massTimes: removeElement(state.massTimes, action.payload) };
    case MASS_TIME_CHANGE:
      return { ...state, massTime: action.payload };
    case SAVE_CHURCH_SUCCESS:
      return INITIAL_STATE;  
    default:
      return state;
  }
};
