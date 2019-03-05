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

export const unsetDefaultValues = (arr, key) => (
	_.map(arr, item => {
		let obj = {...item};
		obj[key]= undefined;
		return obj;
	})
);

export const getUserId = (user) => (
	user && user.signInUserSession && user.signInUserSession.idToken && 
	user.signInUserSession.idToken.payload ? user.signInUserSession.idToken.payload.sub : null
)