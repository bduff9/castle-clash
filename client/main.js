/* jshint ignore: start */
'use strict';

import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

import '/imports/startup/client';

import AppContainer from '../imports/ui/containers/AppContainer';

Meteor.startup(() => {
	render(<AppContainer />, document.getElementById('react-root'));
});
