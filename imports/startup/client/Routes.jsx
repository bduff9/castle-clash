'use strict';

import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import { authenticatedType, loggingInType, userType } from '../../ui/helpers/types';
import AdminRouteContainer from '../../ui/containers/AdminRouteContainer';
import AuthenticatedRouteContainer from '../../ui/containers/AuthenticatedRouteContainer';
import UnauthenticatedRouteContainer from '../../ui/containers/UnauthenticatedRouteContainer';
import AdminPage from '../../ui/pages/AdminPage';
import DashboardPage from '../../ui/pages/DashboardPage';
import LoginPage from '../../ui/pages/LoginPage';
import { logoutUser } from '../../ui/helpers/accounts';
import NotFoundPage from '../../ui/pages/NotFoundPage';
import ResetPasswordPage from '../../ui/pages/ResetPasswordPage';
import UsersPage from '../../ui/pages/UsersPage';
import VerifyEmailPage from '../../ui/pages/VerifyEmailPage';

const MainContent = styled.section`
	grid-area: maincontent;
	background-color: #FFF;
	opacity: 0.75;
	padding: 1.5rem;
`;

/**
 * @typedef {{}} RoutesProps
 * @type {React.SFC<RoutesProps>}
 */
const Routes = (props) => (
	<MainContent>
		<Switch>
			<UnauthenticatedRouteContainer exact path="/login" component={LoginPage} {...props} />
			<UnauthenticatedRouteContainer exact path="/register" component={LoginPage} {...props} />
			<Route exact path="/logout" render={logoutUser} {...props} />
			<Route exact path="/reset-password/:token" component={ResetPasswordPage} {...props} />
			<UnauthenticatedRouteContainer exact path="/verify-email/:token" component={VerifyEmailPage} {...props} />
			<AdminRouteContainer path="/admin" component={AdminPage} {...props} />
			<AuthenticatedRouteContainer path="/users" component={UsersPage} {...props} />
			<AuthenticatedRouteContainer exact path="/" component={DashboardPage} {...props} />
			<Route component={NotFoundPage} {...props} />
		</Switch>
	</MainContent>
);

Routes.propTypes = {
	authenticated: authenticatedType.isRequired,
	loggingIn: loggingInType.isRequired,
	user: userType
};

export default Routes;
