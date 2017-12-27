'use strict';

import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import App from '../layouts/App';

export default withTracker(props => {
	const userHandle = Meteor.subscribe('Users.currentUserInfo'),
			userReady = userHandle.ready(),
			loggingIn = Meteor.loggingIn(),
			userID = Meteor.userId();
	return {
		authenticated: !loggingIn && !!Meteor.userId(),
		loggingIn,
		pageReady: userReady,
		userID
	};
})(App);
