'use strict';

import { Meteor } from 'meteor/meteor';

const MAIL_URL = Meteor.settings.private.gmail;

Meteor.startup(() => {
	process.env.MAIL_URL = MAIL_URL;
});
