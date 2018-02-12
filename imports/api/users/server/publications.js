'use strict';

import { Meteor } from 'meteor/meteor';

import Users from '../users';
import { explainQuery, getIndexes } from '../../utils';

Meteor.publish('Users.currentUserInfo', function currentUserInfo () {
	const query = { _id: this.userId };
	let userInfo;
	if (!this.userId) return this.ready();
	getIndexes(Users);
	explainQuery(Users, query);
	userInfo = Users.find(query, {
		fields: Users.publicFields
	});
	if (userInfo) return userInfo;
	return this.ready();
});
