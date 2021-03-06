'use strict';

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { Form, withFormik } from 'formik';
import Yup, { addMethod, string, ref } from 'yup';

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
 * @typedef {{ error: Object, errors: Object, isSubmitting: Boolean, touched: Object, values: Object, handleBlur: React.FocusEventHandler<HTMLInputElement>, handleChange: React.ChangeEventHandler<HTMLInputElement>, handleReset: Function, handleSubmit: Function, updateEmail: React.ChangeEventHandler<HTMLInputElement>, updatePassword: React.ChangeEventHandler<HTMLInputElement> }} RegisterFormProps
 * @type {React.SFC<RegisterFormProps>}
 */
const RegisterForm = ({
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
			<label className="label" htmlFor="first_name">
				Name
			</label>
			<div className="field-body">
				<div className="field">
					<div className="control has-icons-left">
						<input
							className={`input ${getFieldStatus(
								'first_name',
								errors,
								touched
							)}`}
							id="first_name"
							name="first_name"
							placeholder="First Name"
							type="text"
							value={values.first_name}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
						<span className="icon is-small is-left">
							<i className="fa fa-address-card" />
						</span>
					</div>
				</div>
				<div className="field">
					<div className="control has-icons-left">
						<input
							className={`input ${getFieldStatus(
								'last_name',
								errors,
								touched
							)}`}
							id="last_name"
							name="last_name"
							placeholder="Last Name"
							type="text"
							value={values.last_name}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
						<span className="icon is-small is-left">
							<i className="fa fa-address-card" />
						</span>
					</div>
				</div>
			</div>
			{errors.first_name &&
				touched.first_name && (
					<p className="help is-danger">{errors.first_name}</p>
				)}
			{errors.last_name &&
				touched.last_name && (
					<p className="help is-danger">{errors.last_name}</p>
				)}
		</div>

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

		<div className="field">
			<label className="label" htmlFor="confirmPassword">
				Confirm Password
			</label>
			<div className="control has-icons-left">
				<input
					className={`input ${getFieldStatus(
						'confirmPassword',
						errors,
						touched
					)}`}
					id="confirmPassword"
					name="confirmPassword"
					placeholder="Confirm Password"
					type="password"
					value={values.confirmPassword}
					onBlur={handleBlur}
					onChange={handleChange}
				/>
				<span className="icon is-small is-left">
					<i className="fa fa-lock" />
				</span>
			</div>
			{errors.confirmPassword &&
				touched.confirmPassword && (
					<p className="help is-danger">{errors.confirmPassword}</p>
				)}
		</div>

		<div className="field is-grouped">
			<div className="control">
				<button
					className={`button is-primary${isSubmitting ? ' is-loading' : ''}`}
					type="submit">
					Register
				</button>
			</div>
			<div className="control">
				<NavLink className="button is-link" to="/login">
					I already have an account
				</NavLink>
			</div>
		</div>
		{error &&
			error.message && <p className="help is-danger">{error.message}</p>}
	</Form>
);

RegisterForm.propTypes = {
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

addMethod(string, 'sameAs', function (ref, message) {
	return this.test('sameAs', message, function (value) {
		let other = this.resolve(ref);
		return !other || !value || value === other;
	});
});

export default withFormik({
	validationSchema: Yup.object().shape({
		email: Yup.string()
			.email('Please enter a valid email')
			.required('Email address is required'),
		password: Yup.string()
			.min(6, 'Password must be at least 6 characters')
			.required('Please enter a password'),
		confirmPassword: Yup.string()
			.sameAs(ref('password'), 'Please enter the same password again')
			.required('Please enter the same password again'),
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

	handleSubmit: (values, { props, setErrors, setSubmitting }) => {
		const { email, password, confirmPassword: UUconfirmPassword, ...profile } = values,
				payload = { email, password, profile };

		Accounts.createUser(payload, err => {
			if (err && err.reason !== 'Login forbidden') {
				setErrors(err);
				setSubmitting(false);
				if (err.error && err.reason) {
					handleError(err, {
						title: err.error,
						message: err.reason,
						icon: 'warning'
					});
				} else {
					handleError(err);
				}
			} else {
				Bert.alert({
					message: 'Thanks for registering',
					type: 'success'
				});
			}
		});
	}
})(RegisterForm);
