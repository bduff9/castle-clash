'use strict';

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { Form, withFormik } from 'formik';
import Yup, { addMethod, string, ref } from 'yup';

import { formikErrorType, formikErrorsType, handleBlurType, handleChangeType, handleResetType, handleSubmitType, isSubmittingType, touchedType, valuesType } from '../helpers/types';
import { getFieldStatus } from '../helpers/forms';

const RegisterForm = ({
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
				<NavLink className="button is-link" to="/login">Login</NavLink>
			</div>
		</div>
		{error && error.message && <p className="help is-danger">{error.message}</p>}

{/*
		<Field>
			<Label>Confirm Password</Label>
			<Control>
				<Input
					isColor={getFormControlOutlineColor({ hasError: errors.confirmPassword, isTouched: touched.confirmPassword })}
					type="password"
					name="confirmPassword"
					value={values.confirmPassword}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Confirm Password" />
			</Control>
			{errors.confirmPassword && touched.confirmPassword && <Help isColor="danger">{errors.confirmPassword}</Help>}
		</Field>

		<Field>
			<Label>First Name</Label>
			<Control>
				<Input
					isColor={getFormControlOutlineColor({ hasError: errors.first_name, isTouched: touched.last_name })}
					type="text"
					name="first_name"
					value={values.first_name}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="First Name" />
			</Control>
			{errors.first_name && touched.first_name && <Help isColor="danger">{errors.first_name}</Help>}
		</Field>

		<Field>
			<Label>Last Name</Label>
			<Control>
				<Input
					isColor={getFormControlOutlineColor({ hasError: errors.last_name, isTouched: touched.last_name })}
					type="text"
					name="last_name"
					value={values.last_name}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Last Name" />
			</Control>
			{errors.last_name && touched.last_name && <Help isColor="danger">{errors.last_name}</Help>}
		</Field>
*/}
	</Form>;

RegisterForm.propTypes = {
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

addMethod(string, 'sameAs', function (ref, message) {
	return this.test('sameAs', message, function (value) {
		let other = this.resolve(ref);
		return !other || !value || value === other;
	});
});

export default withFormik({
	validationSchema: Yup.object().shape({
		email: Yup.string().email('Please enter a valid email').required('Email address is required'),
		password: Yup.string().min(6, 'Password must be at least 6 characters').required('Please enter a password'),
		confirmPassword: Yup.string().sameAs(ref('password'), 'Please enter the same password again').required('Please enter the same password again'),
		first_name: Yup.string().required('Please enter your first name'),
		last_name: Yup.string().required('Please enter your last name')
	}),

	mapPropsToValues: ({ email, password }) => ({
		email,
		password,
		confirmPassword: '',
		first_name: '',
		last_name: ''
	}),

	mapValuesToPayload: (values) => ({
		email: values.email,
		password: values.password,
		profile: {
			first_name: values.first_name,
			last_name: values.last_name,
			if_forgot: values.password
		}
	}),

	handleSubmit: (payload, { props, setError, setSubmitting }) => {
		Accounts.createUser(payload, (err) => {
			if (err && err.reason !== 'Login forbidden') {
				setError(err);
				setSubmitting(false);
				if (err.error && err.reason) {
					//displayError(err, { title: err.error, message: err.reason, type: 'warning' });
				} else {
					//displayError(err);
				}
			} else {
				Bert.alert({
					message: 'Thanks for registering',
					type: 'success'
				});
			}
		});
	},
})(RegisterForm);
