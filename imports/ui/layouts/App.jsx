'use strict';

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import { authenticatedType, loggingInType, pageReadyType, userType, userIDType } from '../helpers/types';
import Routes from '../../startup/client/Routes.jsx';
import Loading from '../components/Loading';

const AppGrid = styled.div`
	display: grid;
	grid-template-rows: minmax(50px, auto) 1fr;
	grid-template-columns: minmax(200px, auto) 1fr;
	grid-template-areas:
		"header header"
		"sidebar maincontent";
`;

const Header = styled.header`
	grid-area: header;
`;

const SideBar = styled.section`
	grid-area: sidebar;
`;

const App = ({ authenticated, loggingIn, pageReady, user, userID }) => {
	return (
		<AppGrid id="app">
			<Helmet
				htmlAttributes={{ lang: 'en', 'amp': undefined }}
				title="Welcome"
				titleTemplate="%s | Castle Clash Tracker"
				link={[{ rel: 'icon', sizes: '16x16 32x32', href: '/favicon.png?v=1' }]}
				meta={[{ 'charset': 'utf-8' }, { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge' }, { 'name': 'viewport', 'content': 'width=device-width, initial-scale=1, user-scalable=no' }]} />
			<Header user={user}>Header</Header>
			<SideBar authenticated={authenticated}>Side Bar</SideBar>
			{pageReady ? <Routes authenticated={authenticated} loggingIn={loggingIn} key={`current-user-${userID}`} /> : <Loading />
			}
		</AppGrid>
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
