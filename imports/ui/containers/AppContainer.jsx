'use strict';

import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';

import App from '../layouts/App';

export default withRouter(withTracker((props) => {
	const userHandle = Meteor.subscribe('Users.currentUserInfo'),
			userReady = userHandle.ready(),
			loggingIn = Meteor.loggingIn(),
			userID = Meteor.userId(),
			user = Meteor.user();
	return {
		appReady: userReady,
		authenticated: !loggingIn && !!Meteor.userId(),
		loggingIn,
		user,
		userID,
		...props
	};
})(App));
