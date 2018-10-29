import { LOAD_PROFILE, LOAD_PROFILE_SUCCESS, LOAD_PROFILE_FAILED, LOAD_DRIVER,
  LOAD_DRIVER_SUCCESS, LOAD_DRIVER_FAILED, UPDATE_PROFILE_IMAGE_URL } from '../actions/entities/types';

const INITIAL_STATE = {
  profile: {
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
      isChecked: false,
      churches: null
  },
  profileImgUrl: '',
  drivers: [],
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_PROFILE:
      return { ...state, loading: true };
    case LOAD_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case LOAD_PROFILE_FAILED:
      return { ...state, loading: false, error: action.payload };
    case LOAD_DRIVER:
      return { ...state, loading: true };
    case LOAD_DRIVER_SUCCESS:
      return { ...state, loading: false, drivers: action.payload };
    case LOAD_DRIVER_FAILED:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_PROFILE_IMAGE_URL:
      return { ...state, profileImgUrl: action.payload }; 
    default:
      return state;
  }
};
