'use strict';

import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import Users from './users';

// TODO: methods here

// Get list of all method names on Users
const USERS_METHODS = _.pluck([
	//TODO: method variable names here
], 'name');

if (Meteor.isServer) {
	// Only allow 5 user operations per connection per second
	DDPRateLimiter.addRule({
		name: (name) => _.contains(USERS_METHODS, name),

		// Rate limit per connection ID
		connectionId: () => true
	}, 5, 1000);
}
