'use strict';

import React from 'react';
import Helmet from 'react-helmet';

import { authenticatedType, loggingInType, pageReadyType, userType, userIDType } from '../helpers/types';
//import { Routes } from '../../startup/client/Routes.jsx';
import Loading from '../components/Loading';

const App = ({ authenticated, loggingIn, pageReady, userID }) => {
	return (
		<div className="row">
			<Helmet
				htmlAttributes={{ lang: 'en', 'amp': undefined }}
				title="Welcome"
				titleTemplate="%s | Castle Clash Tracker"
				link={[{ rel: 'icon', sizes: '16x16 32x32', href: '/favicon.png?v=1' }]}
				meta={[{ 'charset': 'utf-8' }, { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge' }, { 'name': 'viewport', 'content': 'width=device-width, initial-scale=1, user-scalable=no' }]} />
			{pageReady ? 'Ready'
			//<Routes authenticated={authenticated} loggingIn={loggingIn} key={`current-user-${userID}`} />
				: <Loading />
			}
		</div>
	);
};

App.propTypes = {
	authenticated: authenticatedType.isRequired,
	loggingIn: loggingInType.isRequired,
	pageReady: pageReadyType.isRequired,
	user: userType,
	userID: userIDType
};

export default App;
