'use strict';

import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { authenticatedType, loggingInType } from '../../ui/helpers/types';
import NotFoundPage from '../../ui/pages/NotFoundPage';

const MainContent = styled.section`
	grid-area: maincontent;
`;

const Routes = (props) => (
	<MainContent>
		<Router>
			<Switch>
				{/*<Authenticated exact path="/" component={AuthedLayout} {...props} />*/}
				<Route component={NotFoundPage} {...props} />
			</Switch>
		</Router>
	</MainContent>
);

Routes.propTypes = {
	authenticated: authenticatedType.isRequired,
	loggingIn: loggingInType.isRequired
};

export default Routes;
