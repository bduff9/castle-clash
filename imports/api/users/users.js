'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class UsersCollection extends Mongo.Collection {
	//TODO: add any custom insert, update, or delete logic here
}

const Users = Meteor.users;//new UsersCollection('users');

// Deny all client-side updates since we will be using methods to manage this collection
Users.deny({
	insert () { return true; },
	update () { return true; },
	remove () { return true; }
});

Users.schema = new SimpleSchema({
	//TODO: define schema
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
