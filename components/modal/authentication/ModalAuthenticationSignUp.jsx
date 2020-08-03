import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
	toggleWhatsThisModal,
	toggleRegistrationModal,
	toggleLoginModal,
	togglePhoneVerficationModal,
	setUserData,
} from '../../../store/actions/authentication.actions';
import { useForm } from 'react-hook-form';
import axios from '../../../lib/axios';
import _ from 'lodash';
import BaseLoader from '../../../components/base/BaseLoader';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const ModalAuthenticationSignUp = ({ socialAuthProviders }) => {
	const dispatch = useDispatch();
	const { register, handleSubmit, watch, errors } = useForm();
	const { t, i18n } = useTranslation(['common']);

	const logo = useSelector((state) => state.root.logo);
	const [isEmailAlreadyRegistered, setIsEmailAlreadyRegistered] = useState(
		false
	);
	const [isCatptchaActive, setIsCatptchaActive] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [registrationMessage, setRegistrationMessage] = useState('');
	const [message, setMessage] = useState('');
	const watchPassword = watch('password', '');
	const watchEmail = watch('email', '');
	const watchConfirmPassword = watch('confirmPassword', '');

	const showErrorMessage = (message, timeout) => {
		setMessage(message);

		setTimeout(() => {
			setMessage('');
		}, timeout);
	};

	const boundToggleRegistrationModal = () =>
		dispatch(toggleRegistrationModal());

	const boundToggleWhatsThisModal = () => {
		dispatch(toggleRegistrationModal());
		dispatch(toggleWhatsThisModal());
	};

	const boundToggleLoginModal = () => {
		dispatch(toggleRegistrationModal());
		dispatch(toggleLoginModal());
	};

	const boundTogglePhoneVerficationModal = () => {
		dispatch(toggleRegistrationModal());
		dispatch(togglePhoneVerficationModal());
	};

	const onSubmit = async (data) => {
		if (!_.isEmpty(errors)) return;
		setIsLoading(true);

		let response;
		try {
			response = await axios.post('customer/register', {
				emailAddress: watchEmail,
				password: watchPassword,
				confirmPassword: watchConfirmPassword,
				captchaResponse: '',
				language: i18n.language,
			});

			if (response.data.success) {
				const userData = response.data.result;

				setIsLoading(false);
				dispatch(setUserData(userData));
				boundTogglePhoneVerficationModal();
			}
		} catch (error) {
			setIsLoading(false);
			if (error.response) {
				setRegistrationMessage(error.response.data.error.message);
			}
		}
	};

	const generateSocialButtons = () => {
		return socialAuthProviders.map((provider, index) => {
			if (provider.name === 'Google') {
				return (
					<GoogleLogin
						key={index}
						clientId={provider.clientId}
						buttonText={t('login')}
						onSuccess={responseGoogleSuccess}
						onFailure={responseGoogleFailure}
						render={(renderProps) => (
							<a
								onClick={renderProps.onClick}
								className="btn-h50 flex-center-center signin-ggle"
							>
								{t('sign_up')}
							</a>
						)}
					/>
				);
			} else if (provider.name === 'Facebook') {
				return (
					<FacebookLogin
						key={index}
						appId={provider.clientId}
						autoLoad={true}
						fields="name,email,picture"
						callback={responseFacebook}
						render={(renderProps) => (
							<a
								onClick={renderProps.onClick}
								className="btn-h50 flex-center-center signin-facebook"
							>
								{t('sign_up')}
							</a>
						)}
					/>
				);
			}
		});
	};

	const responseGoogleSuccess = async (data) => {
		console.log(data);
		const { accessToken, profileObj } = data;
		setIsLoading(true);

		try {
			const response = await axios.post('customer/external-login', {
				authProvider: 'Google',
				ProviderKey: profileObj.googleId,
				ProviderAccessCode: accessToken,
			});

			console.log(response);

			const userData = response.data.result;

			userData.emailOrUsername = profileObj.email;

			setIsLoading(false);
			dispatch(setUserData(userData));
			if (!userData.isPhoneConfirmed) {
				boundTogglePhoneVerficationModal();
			} else {
				boundToggleRegistrationModal();
			}
		} catch (error) {
			setIsLoading(false);
			showErrorMessage(t('request_failed'), 5000);
		}
	};

	const responseGoogleFailure = (data) => {
		console.log('adsf', data);
		showErrorMessage(t('google_auth_failed', 5000));
	};

	const responseFacebook = (response) => {
		console.log('fb', response);
	};

	return (
		<div>
			<div
				className="modal fade modal-box show"
				id="sign-up"
				onClick={boundToggleRegistrationModal}
			>
				<div
					className="modal-dialog"
					role="document"
					onClick={(e) => e.stopPropagation()}
				>
					{isLoading && <BaseLoader />}
					<div className="modal-content">
						<div className="text-center pdt-30 relative">
							<a href="" title="">
								<img className="logo-s" src={logo} />
							</a>
							<button
								type="button"
								onClick={boundToggleWhatsThisModal}
								className="btn-help btn-default"
							>
								<img src="images/icon/icon-help.svg" />
							</button>
						</div>
						<div className="modal-top">
							<h2 className="title">
								<span>Get your ABC Account</span>
							</h2>
						</div>
						<div className="modal-main">
							<div className="box-signin">
								{socialAuthProviders.length !== 0 && (
									<div>
										<div className="sigin-social">
											{generateSocialButtons()}
										</div>
										<div className="or">{t('or')}</div>
									</div>
								)}
								<form
									className="form-sign mgb-30"
									onSubmit={handleSubmit(onSubmit)}
								>
									<div className="name-bg mgb-20">
										<input
											type="email"
											name="email"
											placeholder={t('email')}
											className="input-radius btn-h50"
											ref={register({
												required: true,
												pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
											})}
										/>
										{errors.email?.type === 'required' && (
											<div className="invalid-input">
												{t('input_required')}
											</div>
										)}
										{errors.email?.type === 'pattern' && (
											<div className="invalid-input">
												{t('invalid_email')}
											</div>
										)}
										{message.length !== 0 && (
											<div className="note-warning flex-center">
												<span>
													<img src="images/icon/priority_high_24px.svg" />
												</span>
												<div className="note-text">
													{`${registrationMessage} ${t(
														'do_you_want_to'
													)} `}
													{}
													<a
														onClick={
															boundToggleLoginModal
														}
														className="text-yellow font-16 font-demi link-underline"
													>
														{t('sign_in')}
													</a>
												</div>
											</div>
										)}
									</div>
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
											placeholder={t('confirm_password')}
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
									{isCatptchaActive && (
										<div className="captcha flex-center">
											<span>
												<img src="images/picture/CAPTCHA.png" />
											</span>
											<div className="name-bg">
												<input
													type="text"
													placeholder="Enter CAPCHA code"
													className="input-radius btn-h50"
												/>
											</div>
										</div>
									)}
									<div className="text-center mgt-50">
										<button
											type="submit"
											className="btn btn-yellow btn-h60 font-20 font-demi w230"
										>
											{t('sign_up')}
										</button>
									</div>
								</form>
								<div className="text-center font-18">
									<span className="font-medium text-ghi">
										{t('have_an_account')}
									</span>
									<button
										onClick={boundToggleLoginModal}
										className="btn btn-link btn-link--no-shadow text-yellow link-underlinef font-demi"
									>
										{t('sign_in')}
									</button>
								</div>
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

export default ModalAuthenticationSignUp;
