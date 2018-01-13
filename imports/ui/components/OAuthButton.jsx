'use strict';

import { Meteor } from 'meteor/meteor';
import React from 'react';
// @ts-ignore
import { Bert } from 'meteor/themeteorchef:bert';

import { displayError } from '../helpers/errors';
import { colorType, onClickType, serviceType } from '../helpers/types';

/**
 * @typedef {{ color: String, service: String, onClick?: Function }} OAuthButtonProps
 * @type {React.SFC<OAuthButtonProps>}
 */
const OAuthButton = ({ color, service, onClick }) => {
	const _oauthLogin = ev => {
		const options = {
			requestPermissions: ['email']
		};
		if (onClick) onClick(ev);
		Meteor[`loginWith${service}`](options, err => {
			if (err) {
				displayError(err, { title: err.message, icon: 'danger' });
			} else {
				Bert.alert({
					message: 'Welcome!',
					type: 'success',
					icon: 'fa-thumbs-up'
				});
			}
		});
	};

	return (
		<button className={`button ${color}`} onClick={_oauthLogin}>
			<span className="icon">
				<i className={`fa fa-${service.toLowerCase()}`} />
			</span>
			<span>{service}</span>
		</button>
	);
};

OAuthButton.propTypes = {
	color: colorType,
	service: serviceType.isRequired,
	onClick: onClickType
};

OAuthButton.defaultProps = {
	color: ''
};

export default OAuthButton;
