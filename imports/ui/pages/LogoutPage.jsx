'use strict';

import React from 'react';
import { NavLink } from 'react-router-dom';
import Helmet from 'react-helmet';

const LogoutPage = () => (
	<div>
		<Helmet title="Logged Out" />
		<h3>You have been successfully logged out</h3>
		<NavLink to="/login">Return to Sign-in</NavLink>
	</div>
);

LogoutPage.propTypes = {};

export default LogoutPage;
