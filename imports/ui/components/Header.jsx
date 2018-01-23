'use strict';

import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { userType } from '../helpers/types';
import HeaderNavLink from '../components/HeaderNavLink';

const HeaderEl = styled.nav`
	grid-area: header;
	display: flex;
	align-items: center;
	padding-left: 20px;
`;

/**
 * @typedef {{ user: Object }} HeaderProps
 * @type {React.SFC<HeaderProps>}
 */
const Header = ({ user }) => (
	<HeaderEl className="navbar">
		<div className="navbar-brand">
			<NavLink className="navbar-item" to="/">
				<i className="fa fa-gamepad fa-2x"></i>
				&nbsp; CC DB
			</NavLink>
		</div>
		<div className="navbar-menu">
			<div className="navbar-start"></div>
			{user ? (
				<div className="navbar-end">
					<HeaderNavLink className="navbar-item" to="/">Home</HeaderNavLink>
					<HeaderNavLink className="navbar-item" to="/users/heroes">My Heroes</HeaderNavLink>
					<HeaderNavLink className="navbar-item" to="/users/edit">My Profile</HeaderNavLink>
					{user.is_admin ? <HeaderNavLink className="navbar-item" to="/admin">Admin</HeaderNavLink> : null}
					<HeaderNavLink className="navbar-item" to="/logout">Logout</HeaderNavLink>
				</div>
			)
				:
				(
					<div className="navbar-end">
						<HeaderNavLink className="navbar-item" to="/login">Login</HeaderNavLink>
						<HeaderNavLink className="navbar-item" to="/register">Register</HeaderNavLink>
					</div>
				)
			}
		</div>
	</HeaderEl>
);

Header.propTypes = {
	user: userType
};

export default Header;
