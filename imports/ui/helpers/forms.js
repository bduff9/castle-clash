'use strict';

export const getFieldStatus = (field, errors, touched) => {
	if (!touched[field]) return '';
	if (errors[field]) return 'is-danger';
	return 'is-success';
};
