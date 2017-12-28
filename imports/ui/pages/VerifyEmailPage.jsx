'use strict';

import React from 'react';
import Helmet from 'react-helmet';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

import { authenticatedType, historyType, loggingInType, matchType } from '../helpers/types';
import Loading from '../components/Loading';

const VerifyEmailPage = ({ authenticated, history, loggingIn, match }) => {
	if (authenticated) {
		history.replace('/');
	} else if (!loggingIn) {
		Accounts.verifyEmail(match.params.token, err => {
			if (err) {
				console.error('Error on verifying email', err);
			} else {
				Bert.alert('Your email is now verified!', 'success');
				history.replace('/users/edit');
			}
		});
	}

	return (
		<div>
			<Helmet title="Logged Out" />
			<Loading />
		</div>
	);
};

VerifyEmailPage.propTypes = {
	authenticated: authenticatedType.isRequired,
	history: historyType.isRequired,
	loggingIn: loggingInType,
	match: matchType.isRequired
};

export default VerifyEmailPage;
