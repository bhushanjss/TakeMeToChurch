import _ from 'lodash';

export const removeElement = (arr, data) => (
	_.remove(arr, val => (
		val !== data
	))
);