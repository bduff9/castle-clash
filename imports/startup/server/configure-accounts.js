'use strict';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { EMAIL_SUBJECT_PREFIX, EMAIL_FROM, SITE_NAME } from '../../../imports/utils/constants';
import User from '../../api/users/users';

const updateUserIfNeeded = (user, field, newValue) => {
	const oldValue = user[field];

	if (oldValue != null && oldValue !== '') return;

	if (newValue == null) return;

	user[field] = newValue;
};

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
			Meteor.users.remove({ _id: existingUser._id });
			user = existingUser;
		}
		updateUserIfNeeded(user, 'profile', profile);
		updateUserIfNeeded(user, 'email', email);
		updateUserIfNeeded(user, 'phone_number', '');
		updateUserIfNeeded(user, 'first_name', firstName);
		updateUserIfNeeded(user, 'last_name', lastName);
		updateUserIfNeeded(user, 'verified', verified);
		updateUserIfNeeded(user, 'done_registering', false);
		updateUserIfNeeded(user, 'is_admin', false);
		firstName = first_name || 'An unknown';
		lastName = last_name || 'user';
		if (existingUser) {
			//writeLog.call({ userId: user._id, action: 'MERGE', message: `${firstName} ${lastName} merged with email ${email}` }, handleError);
		} else {
			//writeLog.call({ userId: user._id, action: 'REGISTER', message: `${firstName} ${lastName} registered with email ${email}` }, handleError);
		}
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

Accounts.emailTemplates.siteName = SITE_NAME;
Accounts.emailTemplates.from = EMAIL_FROM;

Accounts.emailTemplates.verifyEmail = {
	subject () {
		return `${EMAIL_SUBJECT_PREFIX}Verify Your Email Address`;
	},
	html (user, urlWithHash) {
		const url = urlWithHash.replace('#/', '');
		let body;
		console.log(`Sending Verify Email email to ${user.email}...`);
		body = `Thanks for registering!

In order to complete your registration, you will need to verify your email address (${user.email}), by clicking the link below.

If you did not request this verification, you can safely ignore this email.

${url}`;
		console.log(`Successfully sent Verify Email email to ${user.email}!`);
		return body;
	}
};

Accounts.emailTemplates.resetPassword = {
	subject () {
		return `${EMAIL_SUBJECT_PREFIX}Reset Password Request`;
	},
	html (user, urlWithHash) {
		const url = urlWithHash.replace('#/', '');
		let body;
		console.log(`Sending Reset Password email to ${user.email}...`);
		body = `Hi ${user.first_name},

We just received a reset password request from you.  If you did not do this, you can safely ignore this email.  If you do want to reset your password, simply click the link below and follow the instructions.

${url}`;
		console.log(`Successfully sent Reset Password email to ${user.email}!`);
		return body;
	}
};
