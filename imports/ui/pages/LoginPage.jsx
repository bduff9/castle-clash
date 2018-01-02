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
				<h1 className="is-size-1 has-text-centered">{pageTitle}</h1>
				{isLogin ? <LoginForm {...this.state} /> : <RegisterForm {...this.state} />}
				<hr />
				<h4 className="has-text-centered">{pageTitle} quickly with:</h4>
				<div className="buttons">
					<button className="button is-primary">
						<span className="icon">
							<i className="fa fa-facebook"></i>
						</span>
						<span>Facebook</span>
					</button>
					<button className="button is-danger">
						<span className="icon">
							<i className="fa fa-google"></i>
						</span>
						<span>Google</span>
					</button>
					<button className="button is-info">
						<span className="icon">
							<i className="fa fa-twitter"></i>
						</span>
						<span>Twitter</span>
					</button>
				</div>
			</div>
		);
	}
}

LoginPage.propTypes = {
	match: matchType
};

export default LoginPage;
