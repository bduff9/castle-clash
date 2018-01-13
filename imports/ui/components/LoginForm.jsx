'use strict';

import { Meteor } from 'meteor/meteor';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { Form, withFormik } from 'formik';
import Yup from 'yup';

import { formikErrorType, formikErrorsType, handleBlurType, handleChangeType, handleResetType, handleSubmitType, isSubmittingType, touchedType, valuesType } from '../helpers/types';
import { getFieldStatus } from '../helpers/forms';

const LoginForm = ({
	values,
	touched,
	errors,
	error,
	handleChange,
	handleSubmit,
	handleBlur,
	handleReset,
	isSubmitting
}) =>
	<Form>
		<div className="field">
			<label className="label" htmlFor="email">Email</label>
			<div className="control has-icons-left">
				<input
					className={`input ${getFieldStatus('email', errors, touched)}`}
					id="email"
					name="email"
					placeholder="Email Address"
					type="email"
					value={values.email}
					onBlur={handleBlur}
					onChange={handleChange} />
				<span className="icon is-small is-left">
					<i className="fa fa-user"></i>
				</span>
			</div>
			{errors.email && touched.email && <p className="help is-danger">{errors.email}</p>}
		</div>

		<div className="field">
			<label className="label" htmlFor="password">Password</label>
			<div className="control has-icons-left">
				<input
					className={`input ${getFieldStatus('password', errors, touched)}`}
					id="password"
					name="password"
					placeholder="Password"
					type="password"
					value={values.password}
					onBlur={handleBlur}
					onChange={handleChange} />
				<span className="icon is-small is-left">
					<i className="fa fa-lock"></i>
				</span>
			</div>
			{errors.password && touched.password && <p className="help is-danger">{errors.password}</p>}
		</div>

		<div className="field is-grouped">
			<div className ="control">
				<button className={`button is-primary${isSubmitting ? ' is-loading' : ''}`} type="submit">Login</button>
			</div>
			<div className ="control">
				<NavLink className="button is-link" to="/register">I need to register</NavLink>
			</div>
		</div>
		{error && error.message && <p className="help is-danger">{error.message}</p>}
	</Form>;

LoginForm.propTypes = {
	error: formikErrorType,
	errors: formikErrorsType.isRequired,
	isSubmitting: isSubmittingType.isRequired,
	touched: touchedType.isRequired,
	values: valuesType.isRequired,
	handleBlur: handleBlurType.isRequired,
	handleChange: handleChangeType.isRequired,
	handleReset: handleResetType.isRequired,
	handleSubmit: handleSubmitType.isRequired
};

export default withFormik({
	validationSchema: Yup.object().shape({
		email: Yup.string().email('Please enter a valid email').required('Email address is required'),
		password: Yup.string().min(6, 'Password must be at least 6 characters').required('Please enter a password')
	}),

	mapPropsToValues: ({ email, password }) => ({
		email,
		password
	}),

	handleSubmit: (payload, { props, setError, setSubmitting }) => {
		const { email, password } = payload;
		Meteor.loginWithPassword(email, password, err => {
			if (err) {
				setError(err);
				setSubmitting(false);
				if (err.reason === 'User not found') {
					//displayError(err, { title: 'User not found!  Did you mean to register using the button at the bottom right of this page instead?', type: 'warning' });
				} else {
					//displayError(err, { title: err.reason, type: 'warning' });
				}
			} else {
				Bert.alert({
					message: 'Welcome back!',
					type: 'success',
					icon: 'fa-thumbs-up'
				});
			}
		});
	},
})(LoginForm);
