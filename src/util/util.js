import _ from 'lodash';

export const removeElement = (arr, val, key) => (
	_.filter(arr, item => {
		if(!key) {
			return item !== val
		}
		return item[key] !== val
	})
);

export const removeElementsArray = (baseArr, valArr) => (
	_.filter(baseArr, item => (
		_.find(valArr, val => (
			val === item
		)) ? false : true
	))
);

export const findElement = (arr, val, key) => (
	_.find(arr, item => (
		item[key] === val
	))
);