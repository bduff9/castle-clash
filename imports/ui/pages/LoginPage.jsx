'use strict';

import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { matchType } from '../helpers/types';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

class LoginPage extends Component {
	constructor () {
		super();
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
		const { match } = this.props;
		const isLogin = (match.path === '/login');
		const pageTitle = (isLogin ? 'Login' : 'Register');
		return (
			<div>
				<Helmet title={pageTitle} />
				<h1 className="is-size-1">{pageTitle}</h1>
				{isLogin ? <LoginForm {...this.state} /> : <RegisterForm {...this.state} />}
			</div>
		);
	}
}

LoginPage.propTypes = {
	match: matchType
};

export default LoginPage;
