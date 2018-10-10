//import { } from '../actions/forms/types';

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
	addChurches: [],
	error: '',
	loading: false,
	massTimes: [],

}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		default:
		 	return state;
	}
}