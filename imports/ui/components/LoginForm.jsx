'use strict';

import { Meteor } from 'meteor/meteor';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Form, withFormik } from 'formik';
import Yup from 'yup';

import { handleError } from '../helpers/errors';
import { getFieldStatus } from '../helpers/forms';
import {
	formikErrorType,
	formikErrorsType,
	handleBlurType,
	handleChangeType,
	handleResetType,
	handleSubmitType,
	isSubmittingType,
	touchedType,
	updateEmailType,
	updatePasswordType,
	valuesType
} from '../helpers/types';

/**
 * @typedef {{ error: Object, errors: Object, isSubmitting: Boolean, touched: Object, values: Object, handleBlur: React.FocusEventHandler<HTMLInputElement>, handleChange: React.ChangeEventHandler<HTMLInputElement>, handleReset: Function, handleSubmit: Function, updateEmail: React.ChangeEventHandler<HTMLInputElement>, updatePassword: React.ChangeEventHandler<HTMLInputElement> }} LoginFormProps
 * @type {React.SFC<LoginFormProps>}
 */
const LoginForm = ({
	error,
	errors,
	isSubmitting,
	touched,
	values,
	handleBlur,
	handleChange,
	handleReset,
	handleSubmit,
	updateEmail,
	updatePassword
}) => (
	<Form>
		<div className="field">
			<label className="label" htmlFor="email">
				Email
			</label>
			<div className="control has-icons-left">
				<input
					className={`input ${getFieldStatus('email', errors, touched)}`}
					id="email"
					name="email"
					placeholder="Email Address"
					type="email"
					value={values.email}
					onBlur={handleBlur}
					onChange={ev => {
						handleChange(ev);
						updateEmail(ev);
					}}
				/>
				<span className="icon is-small is-left">
					<i className="fa fa-user" />
				</span>
			</div>
			{errors.email &&
				touched.email && <p className="help is-danger">{errors.email}</p>}
		</div>

		<div className="field">
			<label className="label" htmlFor="password">
				Password
			</label>
			<div className="control has-icons-left">
				<input
					className={`input ${getFieldStatus('password', errors, touched)}`}
					id="password"
					name="password"
					placeholder="Password"
					type="password"
					value={values.password}
					onBlur={handleBlur}
					onChange={ev => {
						handleChange(ev);
						updatePassword(ev);
					}}
				/>
				<span className="icon is-small is-left">
					<i className="fa fa-lock" />
				</span>
			</div>
			{errors.password &&
				touched.password && <p className="help is-danger">{errors.password}</p>}
		</div>

		<div className="field is-grouped">
			<div className="control">
				<button
					className={`button is-primary${isSubmitting ? ' is-loading' : ''}`}
					type="submit">
					Login
				</button>
			</div>
			<div className="control">
				<NavLink className="button is-link" to="/register">
					I need to register
				</NavLink>
			</div>
		</div>
		{error &&
			error.message && <p className="help is-danger">{error.message}</p>}
	</Form>
);

LoginForm.propTypes = {
	error: formikErrorType,
	errors: formikErrorsType.isRequired,
	isSubmitting: isSubmittingType.isRequired,
	touched: touchedType.isRequired,
	values: valuesType.isRequired,
	handleBlur: handleBlurType.isRequired,
	handleChange: handleChangeType.isRequired,
	handleReset: handleResetType.isRequired,
	handleSubmit: handleSubmitType.isRequired,
	updateEmail: updateEmailType.isRequired,
	updatePassword: updatePasswordType
};

export default withFormik({
	validationSchema: Yup.object().shape({
		email: Yup.string()
			.email('Please enter a valid email')
			.required('Email address is required'),
		password: Yup.string()
			.min(6, 'Password must be at least 6 characters')
			.required('Please enter a password')
	}),

	mapPropsToValues: ({ email, password }) => ({
		email,
		password
	}),

	handleSubmit: (payload, { props, setErrors, setSubmitting }) => {
		const { email, password } = payload;
		Meteor.loginWithPassword(email, password, err => {
			if (err) {
				setErrors(err);
				setSubmitting(false);
				if (err.reason === 'User not found') {
					handleError(err, { title: 'User not found!  Did you mean to register using the button at the bottom right of this page instead?', icon: 'warning' });
				} else {
					handleError(err, { title: err.reason, icon: 'warning' });
				}
			} else {
				Bert.alert({
					message: 'Welcome back!',
					type: 'success',
					icon: 'fa-thumbs-up'
				});
			}
		});
	}
})(LoginForm);
