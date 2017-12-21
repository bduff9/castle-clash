'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Helmet from 'react-helmet';

//import { Routes } from '../../startup/client/Routes.jsx';
//import { Loading } from '../pages/Loading.jsx';

const App = ({ authenticated, loggingIn, pageReady, userID }) => {
	return (
		<div className="row">
			<Helmet
				htmlAttributes={{ lang: 'en', 'amp': undefined }}
				title="Welcome"
				titleTemplate="%s | Castle Clash Tracker"
				link={[{ rel: 'icon', sizes: '16x16 32x32', href: '/favicon.png?v=1' }]}
				meta={[{ 'charset': 'utf-8' }, { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge' }, { 'name': 'viewport', 'content': 'width=device-width, initial-scale=1, user-scalable=no' }]} />
			{pageReady ? 'Ready' : 'Not Ready'
			//<Routes authenticated={authenticated} loggingIn={loggingIn} key={`current-user-${userID}`} /> : <Loading />
			}
		</div>
	);
};

App.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	loggingIn: PropTypes.bool.isRequired,
	pageReady: PropTypes.bool.isRequired,
	user: PropTypes.object,
	userID: PropTypes.string
};

export default withTracker(props => {
	const userHandle = Meteor.subscribe('userData'),
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
