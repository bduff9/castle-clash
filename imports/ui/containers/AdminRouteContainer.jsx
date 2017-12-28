'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { userType } from '../helpers/types';

const AdminRouteContainer = ({ authenticated, component, location, loggingIn, user, ...rest }) => (
	<Route {...rest} render={props => {
		if (loggingIn) return <div></div>;
		if (user && !user.is_admin) return (<Redirect to="/" />);
		return authenticated ? (
			React.createElement(component, { ...props, location, loggingIn, authenticated })
		)
			:
			(
				<Redirect to={{ pathname: '/login', state: { nextPathname: location.pathname }}} />
			);
	}} />
);

AdminRouteContainer.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired,
	location: PropTypes.object,
	loggingIn: PropTypes.bool.isRequired,
	user: userType
};

export default AdminRouteContainer;
