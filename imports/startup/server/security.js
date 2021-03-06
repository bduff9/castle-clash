'use strict';

import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

// Get a list of all accounts methods by running `Meteor.server.method_handlers` in meteor shell
const AUTH_METHODS = [
	'login',
	'logout',
	'logoutOtherClients',
	'getNewToken',
	'removeOtherTokens',
	'configureLoginService',
	'changePassword',
	'forgotPassword',
	'resetPassword',
	'verifyEmail',
	'createUser',
	'ATRemoveService',
	'ATCreateUserServer',
	'ATResendVerificationEmail'
];

// Only allow 2 login attempts per connection per 5 seconds
DDPRateLimiter.addRule({
	name: (name) => _.contains(AUTH_METHODS, name),

	// Rate limit per connection ID
	connectionId: () => true
}, 2, 5000);
