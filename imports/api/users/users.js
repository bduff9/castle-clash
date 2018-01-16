'use strict';

import { Meteor } from 'meteor/meteor';
//import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Users = Meteor.users; //new Mongo.Collection('users');

// Deny all client-side updates since we will be using methods to manage this collection
Users.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

// Define the User schema here
Users.schema = new SimpleSchema({
	username: {
		type: String,
		// For accounts-password, either emails or username is required, but not both. It is OK to make this
		// optional here because the accounts-password package does its own validation.
		// Third-party login packages may not require either. Adjust this schema as necessary for your usage.
		optional: true
	},
	emails: {
		type: Array,
		// For accounts-password, either emails or username is required, but not both. It is OK to make this
		// optional here because the accounts-password package does its own validation.
		// Third-party login packages may not require either. Adjust this schema as necessary for your usage.
		optional: true
	},
	'emails.$': {
		type: Object
	},
	'emails.$.address': {
		type: String,
		regEx: SimpleSchema.RegEx.Email
	},
	'emails.$.verified': {
		type: Boolean
	},
	'registered_emails.$': {
		type: Object,
		blackbox: true
	},
	createdAt: {
		type: Date
	},
	profile: {
		type: Object,
		blackbox: true
	},
	// Make sure this services field is in your schema if you're using any of the accounts packages
	services: {
		type: Object,
		optional: true,
		blackbox: true
	},
	// In order to avoid an 'Exception in setInterval callback' from Meteor
	heartbeat: {
		type: Date,
		optional: true
	},
	first_name: String,
	last_name: String,
	email: {
		type: String,
		regEx: SimpleSchema.RegEx.Email
	},
	game_name: {
		type: String,
		optional: true
	},
	line_name: {
		type: String,
		optional: true
	},
	game_platform: {
		type: String,
		allowedValues: ['Android', 'iOS', 'Windows'],
		optional: true
	},
	game_server: {
		type: String,
		allowedValues: ['Taiwan', 'US'],
		optional: true
	},
	done_registering: Boolean,
	verified: Boolean,
	is_admin: {
		type: Boolean,
		defaultValue: false
	},
	guild: {
		type: String,
		optional: true
	},
	phone_number: {
		type: String,
		regEx: /^1?(\D*\d\D*){10}$/m,
		optional: true
	}
});

Users.attachSchema(Users.schema);

// Create indexes here for common queries
//TODO: Users._ensureIndex({ keys }, { options });

// This represents the keys from User objects that should be published to the client.
// If we add secret properties to User objects, don't list them here to keep them private to the server.
Users.publicFields = {
	first_name: 1,
	last_name: 1,
	email: 1,
	game_name: 1,
	line_name: 1,
	game_platform: 1,
	game_server: 1,
	is_admin: 1,
	guild: 1
};

Users.helpers({
	//TODO: define any helpers on the schema
});

export default Users;
