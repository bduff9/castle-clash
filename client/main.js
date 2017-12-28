/* jshint ignore: start */
'use strict';

import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import '/imports/startup/client';

import AppContainer from '../imports/ui/containers/AppContainer';

Meteor.startup(() => {
	render(
		<BrowserRouter>
			<AppContainer />
		</BrowserRouter>,
		document.getElementById('react-root')
	);
});
