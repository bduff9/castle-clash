'use strict';

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
	authenticatedType,
	componentType,
	locationType,
	loggingInType
} from '../helpers/types';

/**
 * @typedef {{ authenticated: Boolean, component: Object, exact: Boolean, location?: Object, loggingIn: Boolean, path: String }} UnauthenticatedRouteContainerProps
 * @type {React.SFC<UnauthenticatedRouteContainerProps>}
 */
const UnauthenticatedRouteContainer = ({
	authenticated,
	component,
	location,
	loggingIn,
	...rest
}) => (
	<Route
		{...rest}
		render={props => {
			const { state = {} } = location,
					{ nextPathname } = state;
			return !authenticated ? (
				React.createElement(component, {
					...props,
					location,
					loggingIn,
					authenticated
				})
			) : (
				<Redirect to={{ pathname: nextPathname || '/', state: {} }} />
			);
		}}
	/>
);

UnauthenticatedRouteContainer.propTypes = {
	authenticated: authenticatedType.isRequired,
	component: componentType.isRequired,
	location: locationType,
	loggingIn: loggingInType.isRequired
};

export default UnauthenticatedRouteContainer;
