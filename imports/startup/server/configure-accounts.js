'use strict';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { handleError } from '../../ui/helpers/errors';
import User from '../../api/users/users';

Meteor.startup(() => {
	//Meteor.onConnection((conn) => {});

	Accounts.onCreateUser((options, user) => {
		const EMPTY_VAL = '';
		let first_name = EMPTY_VAL;
		let last_name = EMPTY_VAL;
		let email = EMPTY_VAL;
		let verified = true;
		let firstName;
		let lastName;
		//TODO: check if existing user, and if so, merge them, else continue on
		//TODO: do we also need to check for someone signed in?
		//TODO: https://forums.meteor.com/t/accounts-password-merge-with-accounts-google-2017-way/35590/2
		if (user.services.facebook) {
			first_name = user.services.facebook.first_name;
			last_name = user.services.facebook.last_name;
			email = user.services.facebook.email;
		} else if (user.services.google) {
			first_name = user.services.google.given_name;
			last_name = user.services.google.family_name;
			email = user.services.google.email;
		} else {
			email = options.email;
			verified = false;
		}
		user.profile = options.profile || {};
		user.email = email;
		user.phone_number = '';
		user.first_name = first_name;
		user.last_name = last_name;
		user.verified = verified;
		user.done_registering = false;
		user.is_admin = false;
		firstName = first_name || 'An unknown';
		lastName = last_name || 'user';
		//writeLog.call({ userId: user._id, action: 'REGISTER', message: `${firstName} ${lastName} registered with email ${email}` }, handleError);
		return user;
	});

	Accounts.validateLoginAttempt(({ allowed, methodName, user }) => {
		let vEmails;
		if (!allowed || !user) return false;
		if (methodName === 'createUser') {
			Accounts.sendVerificationEmail(user._id);
			return false;
		}
		if (!user.verified) {
			vEmails = user.emails.filter(email => email.verified);
			if (vEmails.length === 0) throw new Meteor.Error('Email not verified!', 'Please check your email to verify your account');
			User.update({ _id: user._id }, { $set: { verified: true }});
			return true;
		}
		return true;
	});
});
