'use strict';

import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { matchType } from '../helpers/types';

class LoginPage extends Component {
	constructor () {
		super();
		this.state = {
			test: 0
		};
	}

	componentDidUpdate (prevProps, prevState) {
		const { test: prevTest } = prevState;
		const { test } = this.state;
		if (prevTest !== test) return;
		console.log(prevTest, test);
		this.setState({ test: test + 1 });
	}

	render () {
		const { match } = this.props;
		const pageTitle = (match.path === '/login' ? 'Login' : 'Register');
		return (
			<div>
				<Helmet title={pageTitle} />
				TODO: {pageTitle}
			</div>
		);
	}
}

LoginPage.propTypes = {
	match: matchType
};

export default LoginPage;
