'use strict';

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import { authenticatedType, loggingInType, pageReadyType, userType, userIDType } from '../helpers/types';
import Routes from '../../startup/client/Routes.jsx';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

const background = Math.floor(Math.random() * 4) + 1;

const AppGrid = styled.div`
	display: grid;
	grid-template-rows: minmax(50px, auto) 1fr;
	grid-template-columns: minmax(200px, auto) 1fr;
	grid-template-areas:
		"header header"
		"sidebar maincontent";
	background-image: url("/backgrounds/c${background}.png");
	background-size: cover;
`;

const App = ({ appReady, authenticated, user, userID, ...rest }) => {
	return (
		<AppGrid id="app">
			<Helmet
				htmlAttributes={{ lang: 'en', 'amp': undefined }}
				title="Welcome"
				titleTemplate="%s | Castle Clash Tracker"
				link={[{ rel: 'icon', sizes: '16x16 32x32', href: '/favicon.ico?v=1' }]}
				meta={[{ 'charset': 'utf-8' }, { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge' }, { 'name': 'viewport', 'content': 'width=device-width, initial-scale=1, user-scalable=no' }]} />
			<Header user={user} />
			{authenticated ? <SideBar /> : null}
			{appReady ? <Routes {...rest} authenticated={authenticated} user={user} key={`current-user-${userID}`} /> : null}
		</AppGrid>
	);
};

App.propTypes = {
	appReady: pageReadyType.isRequired,
	authenticated: authenticatedType.isRequired,
	loggingIn: loggingInType.isRequired,
	user: userType,
	userID: userIDType
};

export default App;
