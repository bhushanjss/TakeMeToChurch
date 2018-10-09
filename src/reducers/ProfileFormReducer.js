import { FIRST_NAME_CHANGE, LAST_NAME_CHANGE, PHONE_NUMBER_CHANGE,
  PROFILE_STREET_CHANGE, PROFILE_APT_CHANGE, PROFILE_CITY_CHANGE,
  PROFILE_STATE_CHANGE, PROFILE_ZIP_CHANGE, CAR_MODEL_CHANGE, CAR_SEATS_CHANGE,
  PROFILE_CHECKBOX_CHECKED, SAVE_PROFILE, SAVE_PROFILE_SUCCESS,
  SAVE_PROFILE_FAILED, SAVE_DRIVER, SAVE_DRIVER_SUCCESS, SAVE_DRIVER_FAILED,
  } from '../actions/forms/types';
  import { EDIT_PROFILE } from '../actions/entities/types';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  street: '',
  apt: '',
  city: '',
  state: '',
  zip: '',
  carModel: '',
  carSeats: '',
  error: '',
  isChecked: false,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FIRST_NAME_CHANGE:
      return { ...state, firstName: action.payload };
    case LAST_NAME_CHANGE:
      return { ...state, lastName: action.payload };
    case PHONE_NUMBER_CHANGE:
      return { ...state, phoneNumber: action.payload };
    case PROFILE_STREET_CHANGE:
      return { ...state, street: action.payload };
    case PROFILE_APT_CHANGE:
      return { ...state, apt: action.payload };
    case PROFILE_CITY_CHANGE:
      return { ...state, city: action.payload };
    case PROFILE_STATE_CHANGE:
      return { ...state, state: action.payload };
    case PROFILE_ZIP_CHANGE:
      return { ...state, zip: action.payload };
    case CAR_MODEL_CHANGE:
      return { ...state, carModel: action.payload };
    case CAR_SEATS_CHANGE:
      return { ...state, carSeats: action.payload };
    case PROFILE_CHECKBOX_CHECKED:
      return { ...state, isChecked: action.payload };
    case SAVE_PROFILE:
      return { ...state, loading: true };
    case SAVE_PROFILE_SUCCESS:
      return { ...state, loading: false };
    case SAVE_PROFILE_FAILED:
      return { ...state, loading: false, error: action.payload };
    case SAVE_DRIVER:
      return { ...state, loading: true };
    case SAVE_DRIVER_SUCCESS:
      return { ...state, loading: false };
    case SAVE_DRIVER_FAILED:
      return { ...state, loading: false, error: action.payload };
    case EDIT_PROFILE:
      return { ...action.payload, error: '', loading: false }  
    default:
      return state;
  }
};
