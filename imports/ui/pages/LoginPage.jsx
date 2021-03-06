'use strict';

import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { matchType } from '../helpers/types';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import OAuthButton from '../components/OAuthButton';

class LoginPage extends Component {
	constructor (props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
		this._updateEmail = this._updateEmail.bind(this);
		this._updatePassword = this._updatePassword.bind(this);
	}

	_updateEmail (ev) {
		const value = ev.target.value;
		this.setState({ email: value });
	}

	_updatePassword (ev) {
		const value = ev.target.value;
		this.setState({ password: value });
	}

	render () {
		/** @type {object} */
		const { match } = this.props;
		const isLogin = match.path === '/login';
		const pageTitle = isLogin ? 'Login' : 'Register';
		return (
			<div>
				<Helmet title={pageTitle} />
				<h1 className="is-size-1 has-text-centered">{pageTitle}</h1>
				{isLogin ? (
					<LoginForm
						{...this.state}
						updateEmail={this._updateEmail}
						updatePassword={this._updatePassword}
					/>
				) : (
					<RegisterForm
						{...this.state}
						updateEmail={this._updateEmail}
						updatePassword={this._updatePassword}
					/>
				)}
				<hr />
				<h4 className="has-text-centered">{pageTitle} quickly with:</h4>
				<div className="buttons">
					<OAuthButton color="is-primary" service="Facebook" />
					<OAuthButton color="is-danger" service="Google" />
					<OAuthButton color="is-info" service="Twitter" />
				</div>
			</div>
		);
	}
}

LoginPage.propTypes = {
	match: matchType
};

export default LoginPage;
