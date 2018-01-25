'use strict';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import User from '../../api/users/users';

Meteor.startup(() => {
	//Meteor.onConnection((conn) => {});

	Accounts.onCreateUser((options, user) => {
		const EMPTY_VAL = '';
		let existingUser = Meteor.user();
		let first_name = EMPTY_VAL;
		let last_name = EMPTY_VAL;
		let email = EMPTY_VAL;
		let profile = options.profile || {};
		let verified = true;
		let firstName;
		let lastName;
		let service;
		//TODO: check if existing user, and if so, merge them, else continue on
		//TODO: also need to check for someone signed in
		//TODO: https://forums.meteor.com/t/accounts-password-merge-with-accounts-google-2017-way/35590/2
		if (user.services.facebook) {
			firstName = user.services.facebook.first_name;
			lastName = user.services.facebook.last_name;
			email = user.services.facebook.email;
			service = 'facebook';
		} else if (user.services.google) {
			firstName = user.services.google.given_name;
			lastName = user.services.google.family_name;
			email = user.services.google.email;
			service = 'google';
		} else {
			email = options.email;
			firstName = profile.first_name;
			lastName = profile.last_name;
			verified = false;
			service = 'password';
		}
		if (!existingUser) existingUser = Meteor.users.findOne({ email });
		if (existingUser) {
			existingUser.services = existingUser.services || {};
			existingUser.services[service] = user.services[service];
			//TODO: need to modify user here?
			Meteor.users.remove({ _id: existingUser._id });
			//TODO: update _id refs
			return existingUser;
		} else {
			user.profile = profile;
			user.email = email;
			user.phone_number = '';
			user.first_name = firstName;
			user.last_name = lastName;
			user.verified = verified;
			user.done_registering = false;
			user.is_admin = false;
			firstName = first_name || 'An unknown';
			lastName = last_name || 'user';
			//writeLog.call({ userId: user._id, action: 'REGISTER', message: `${firstName} ${lastName} registered with email ${email}` }, handleError);
			return user;
		}
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
