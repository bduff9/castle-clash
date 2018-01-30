'use strict';

import { Meteor } from 'meteor/meteor';
import React from 'react';

import { handleError } from './errors';
import Loading from '../components/Loading';
import LogoutPage from '../pages/LogoutPage';

export const logoutUser = () => {
	const userId = Meteor.userId();

	if (userId) {
		Meteor.logout(handleError);

		return React.createElement(Loading, {});
	}

	return React.createElement(LogoutPage, {});
};
