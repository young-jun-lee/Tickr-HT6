import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TickrLogo from 'media/tickr_logo.png';

const Register: React.FC = () => {
	const [successful, setSuccessful] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');

	const register = (email: string, password: string) => {
		return axios.post('http://localhost:8000/signIn', {
			email,
			password
		});
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email('This is not a valid email.')
			.required('This field is required!'),
		password: Yup.string()
			.test(
				'len',
				'The password must be more than 3 characters.',
				(val: any) => val && val.toString().length >= 3
			)
			.required('This field is required!')
	});

	const handleRegister = (formValue: { email: string; password: string }) => {
		const { email, password } = formValue;

		register(email, password).then(
			(response: any) => {
				setMessage(response.data.message);
				setSuccessful(true);
			},
			(error: any) => {
				const resMessage =
					(error.response &&
						error.response.data &&
						error.response.data.message) ||
					error.message ||
					error.toString();

				setMessage(resMessage);
				setSuccessful(false);
			}
		);
	};

	const initialValues: {
		email: string;
		password: string;
	} = {
		email: '',
		password: ''
	};

	return (
		<div className='col-md-12'>
			<div className='card card-container'>
				<img
					className='signup__logo'
					src={TickrLogo}
					alt='tinderLogo'
				/>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleRegister}
				>
					<Form>
						{!successful && (
							<div>
								<div className='form-group'>
									<label htmlFor='email'> Email </label>
									<Field
										name='email'
										type='email'
										className='form-control'
									/>
									<ErrorMessage
										name='email'
										component='div'
										className='alert alert-danger'
									/>
								</div>

								<div className='form-group'>
									<label htmlFor='password'> Password </label>
									<Field
										name='password'
										type='password'
										className='form-control'
									/>
									<ErrorMessage
										name='password'
										component='div'
										className='alert alert-danger'
									/>
								</div>

								<div className='form-group'>
									<button
										type='submit'
										className='btn btn-primary btn-block'
									>
										Sign Up
									</button>
								</div>
							</div>
						)}

						{message && (
							<div className='form-group'>
								<div
									className={
										successful
											? 'alert alert-success'
											: 'alert alert-danger'
									}
									role='alert'
								>
									{message}
								</div>
							</div>
						)}
					</Form>
				</Formik>
			</div>
		</div>
	);
};

export default Register;
