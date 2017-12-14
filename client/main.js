/* jshint ignore: start */
'use strict';

import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

import '/imports/startup/client';

import App from '../imports/ui/App';

Meteor.startup(() => {
	// Mount app
	render(<App />, document.getElementById('react-root'));
});
