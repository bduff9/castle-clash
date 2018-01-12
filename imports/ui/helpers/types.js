'use strict';

import {
	array,
	bool,
	func,
	number,
	object,
	oneOf,
	oneOfType,
	shape,
	string
} from 'prop-types';

export const authenticatedType = bool;

export const colorType = string;

export const componentType = func;

export const formikErrorType = object;

export const formikErrorsType = object;

export const handleBlurType = func;

export const handleChangeType = func;

export const handleResetType = func;

export const handleSubmitType = func;

export const locationType = shape({
	hash: string.isRequired,
	key: string,
	pathname: string.isRequired,
	search: string.isRequired,
	state: object
});

export const historyType = shape({
	action: string.isRequired,
	block: func.isRequired,
	go: func.isRequired,
	goBack: func.isRequired,
	goForward: func.isRequired,
	length: number.isRequired,
	location: locationType.isRequired,
	push: func.isRequired,
	replace: func.isRequired
});

export const isSubmittingType = bool;

export const loggingInType = bool;

export const matchType = shape({
	isExact: bool.isRequired,
	params: object.isRequired,
	path: oneOfType([array, string]).isRequired,
	url: string.isRequired
});

export const onClickType = func;

export const pageReadyType = bool;

export const serviceType = oneOf(['Facebook', 'Google', 'Twitter']);

export const touchedType = object;

export const updateEmailType = func;

export const updatePasswordType = func;

export const userType = object;

export const userIDType = string;

export const valuesType = object;
