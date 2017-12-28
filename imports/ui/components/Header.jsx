'use strict';

import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { userType } from '../helpers/types';

const HeaderEl = styled.header`
	grid-area: header;
`;

const Header = ({ user }) => (
	<HeaderEl>
		{user ? (
			<div>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/users/heroes">My Heroes</NavLink>
				<NavLink to="/users/edit">My Profile</NavLink>
				{user.is_admin ? <NavLink to="/admin">Admin</NavLink> : null}
				<NavLink to="/logout">Logout</NavLink>
			</div>
		)
			:
			(
				<div>
					<NavLink to="/login">Login</NavLink>
					<NavLink to="/register">Register</NavLink>
				</div>
			)
		}
	</HeaderEl>
);

Header.propTypes = {
	user: userType
};

export default Header;
