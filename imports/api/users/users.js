'use strict';

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'aldeed:simple-schema';

class UsersCollection extends Mongo.Collection {
	//TODO: do something in here?
}

const Users = new UsersCollection('users');

Users.schema = new SimpleSchema({
	//TODO: define schema
});

Users.attachSchema(Users.schema);

export default Users;
