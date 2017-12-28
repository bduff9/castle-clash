/* jshint ignore: start */
'use strict';

import { Meteor } from 'meteor/meteor';
import React from 'react';

import Loading from '../components/Loading';
import LogoutPage from '../pages/LogoutPage';

export const logoutUser = () => {
	const user = Meteor.user();
	const userId = Meteor.userId();
	if (userId) {
		Meteor.logout(err => {
			if (err) {
				console.error('Error from logging out', err);
			} else {
				console.log('Signed out user', user);
			}
		});
		return <Loading />;
	}
	return React.createElement(LogoutPage, {});
};
