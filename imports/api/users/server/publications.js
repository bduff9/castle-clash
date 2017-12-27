'use strict';

import { Meteor } from 'meteor/meteor';

import Users from '../users';

Meteor.publish('Users.currentUserInfo', function currentUserInfo () {
	let userInfo;
	if (!this.userId) return this.ready();
	userInfo = Users.find({
		userId: this.userId
	}, {
		fields: Users.publicFields
	});
	if (userInfo) return userInfo;
	return this.ready();
});
