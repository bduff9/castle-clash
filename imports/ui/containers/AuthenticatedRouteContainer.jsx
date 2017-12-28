'use strict';

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticatedType, componentType, locationType, loggingInType } from '../helpers/types';

const AuthenticatedRouteContainer = ({ authenticated, component, location, loggingIn, ...rest }) => (
	<Route {...rest} render={props => {
		if (loggingIn) return <div></div>;
		return authenticated ? (
			React.createElement(component, { ...props, location, loggingIn, authenticated })
		)
			:
			(
				<Redirect to={{ pathname: '/login', state: { nextPathname: location.pathname }}} />
			);
	}} />
);

AuthenticatedRouteContainer.propTypes = {
	authenticated: authenticatedType.isRequired,
	component: componentType.isRequired,
	location: locationType,
	loggingIn: loggingInType.isRequired
};

export default AuthenticatedRouteContainer;
