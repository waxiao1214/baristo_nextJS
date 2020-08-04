import React, { useState, useEffect } from 'react';
import BaseLoader from '../components/base/BaseLoader';
import axios from '../lib/axios';
import queryString from 'query-string';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

const ResetPassword = () => {
	const { t } = useTranslation(['common']);
	const { register, handleSubmit, watch, errors } = useForm();

	const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
	const [token, setToken] = useState('');
	const [isSuccess, setIsSuccess] = useState(false);
    const watchPassword = watch('password', '');
    
    useEffect(() => {
		// get url query
		const { c } = queryString.parse(location.search, {
			decode: true,
		});

		if (_.isNil(c)) {
			window.location.href = '/';
		}

        setToken(c);
	}, []);

    const onSubmit = async (data) => {
        setIsLoading(true);

		try {
			const response = await axios.post('customer/reset-password', {
				c: token,
				password: data.password
			});
			
			setIsLoading(false);
			setMessage('');
			setIsSuccess(true);
            setTimeout(() => {
                window.location.href = '/';
            }, 5000);
		} catch (error) {
            setIsLoading(false);
			if (error.response) {
				setMessage(error.response.data.error.message);
			} else {
				setMessage(t('an_error_happened'));
				setTimeout(() => {
					window.location.href = '/';
				}, 5000);
			}
		}
    };

	return (
		<div className="w-100 min-h-screen">
			<div className="modal fade modal-box show" id="sign-up">
				<div className="modal-dialog" role="document">
					{isLoading && <BaseLoader />}
					<div className="modal-content">
						<div className="modal-top">
							<h2 className="title">
								<span>{t('reset_password')}</span>
							</h2>
						</div>
						<div className="modal-main">
							<div className="box-signin">
								{message && (
									<div className="alert alert-danger">
										{message}
									</div>
								)}
								{!isSuccess && (
									<form
										className="form-sign mgb-30"
										onSubmit={handleSubmit(onSubmit)}
									>
										<div className="name-bg mgb-20">
											<input
												type="password"
												name="password"
												placeholder={t('password')}
												className="input-radius btn-h50"
												ref={register({
													required: true,
													minLength: 8,
												})}
											/>
											{errors.password?.type ===
												'required' && (
												<div className="invalid-input">
													{t('input_required')}
												</div>
											)}
											{errors.password?.type ===
												'minLength' && (
												<div className="invalid-input">
													{`${t('min_length')} 8`}
												</div>
											)}
										</div>
										<div className="name-bg mgb-20">
											<input
												type="password"
												placeholder={t(
													'confirm_password'
												)}
												name="confirmPassword"
												className="input-radius btn-h50"
												ref={register({
													required: true,
													validate: (value) =>
														value === watchPassword,
												})}
											/>
											{errors.confirmPassword?.type ===
												'required' && (
												<div className="invalid-input">
													{t('input_required')}
												</div>
											)}
											{errors.confirmPassword?.type ===
												'validate' && (
												<div className="invalid-input">
													{t('not_identical')}
												</div>
											)}
											{errors.confirmPassword?.type ===
												'minLength' && (
												<div className="invalid-input">
													{`${t('min_length')} 8`}
												</div>
											)}
										</div>
										<div className="text-center mgt-50">
											<button
												type="submit"
												className="btn btn-yellow btn-h60 font-20 font-demi w230"
											>
												{t('reset')}
											</button>
										</div>
									</form>
								)}
								{isSuccess && (
									<div className="text-center py-10 desc font-20 mgb-20">
										<p>{t('password_changed')}</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				onClick={() => dispatch(toggleRegistrationModal())}
				className="modal-backdrop fade show"
			></div>
		</div>
	);
};

export default ResetPassword;
