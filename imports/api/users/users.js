'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class UsersCollection extends Mongo.Collection {
	//TODO: add any custom insert, update, or delete logic here
}

const Users = Meteor.users;//new UsersCollection('users');

// Deny all client-side updates since we will be using methods to manage this collection
Users.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

// Define the User schema here
const UserCountry = new SimpleSchema({
	name: {
		type: String
	},
	code: {
		type: String,
		regEx: /^[A-Z]{2}$/
	}
});

const UserProfile = new SimpleSchema({
	firstName: {
		type: String,
		optional: true
	},
	lastName: {
		type: String,
		optional: true
	},
	birthday: {
		type: Date,
		optional: true
	},
	gender: {
		type: String,
		allowedValues: ['Male', 'Female'],
		optional: true
	},
	organization : {
		type: String,
		optional: true
	},
	website: {
		type: String,
		regEx: SimpleSchema.RegEx.Url,
		optional: true
	},
	bio: {
		type: String,
		optional: true
	},
	country: {
		type: UserCountry,
		optional: true
	}
});

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
		optional: false
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
		type: UserProfile,
		optional: true
	},
	// Make sure this services field is in your schema if you're using any of the accounts packages
	services: {
		type: Object,
		optional: true,
		blackbox: true
	},
	'roles.$': {
		type: String
	},
	// In order to avoid an 'Exception in setInterval callback' from Meteor
	heartbeat: {
		type: Date,
		optional: true
	}
	//TODO: define custom fields on schema
});

Users.attachSchema(Users.schema);

// This represents the keys from Lists objects that should be published to the client.
// If we add secret properties to List objects, don't list them here to keep them private to the server.
Users.publicFields = {
	//TODO: define public fields
};

Users.helpers({
	//TODO: define any helpers on the schema
});

export default Users;
