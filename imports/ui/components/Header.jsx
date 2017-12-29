'use strict';

import React from 'react';
import styled from 'styled-components';

import { userType } from '../helpers/types';
import HeaderNavLink from '../components/HeaderNavLink';

const HeaderEl = styled.header`
	grid-area: header;
	display: flex;
	align-items: center;
	padding-left: 20px;
`;

const HeaderIcon = styled.i`
	flex: 1
`;

const Header = ({ user }) => (
	<HeaderEl>
		<HeaderIcon className="fa fa-gamepad fa-2x"></HeaderIcon>
		{user ? (
			<div>
				<HeaderNavLink to="/">Home</HeaderNavLink>
				<HeaderNavLink to="/users/heroes">My Heroes</HeaderNavLink>
				<HeaderNavLink to="/users/edit">My Profile</HeaderNavLink>
				{user.is_admin ? <HeaderNavLink to="/admin">Admin</HeaderNavLink> : null}
				<HeaderNavLink to="/logout">Logout</HeaderNavLink>
			</div>
		)
			:
			(
				<div>
					<HeaderNavLink to="/fdhbjska">404 Page</HeaderNavLink>
					<HeaderNavLink to="/login">Login</HeaderNavLink>
					<HeaderNavLink to="/register">Register</HeaderNavLink>
				</div>
			)
		}
	</HeaderEl>
);

Header.propTypes = {
	user: userType
};

export default Header;
