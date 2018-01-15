'use strict';

import { Meteor } from 'meteor/meteor';

export const handleError = (err, opts = {}, cb = null, hide = false) => {
	let sweetAlert;
	if (!err) return;
	if (Meteor.isClient && !hide) {
		sweetAlert = require('sweetalert');
		opts.title = opts.title || 'Error Occurred';
		opts.text =
			opts.text ||
			err.reason ||
			err.message ||
			err.error ||
			'Something went wrong, please try again';
		opts.icon = opts.icon || 'error';
		sweetAlert(opts).then(cb);
	} else {
		console.error(opts.title || 'Caught error', err);
		if (cb) cb();
	}
};
