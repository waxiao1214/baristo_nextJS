import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
	toggleLoginModal,
	toggleRegistrationModal,
	setUserData,
	togglePhoneVerficationModal,
	toggleForgotPasswordModal
} from '../../../store/actions/authentication.actions';
import { useForm } from 'react-hook-form';
import BaseLoader from '../../../components/base/BaseLoader';
import axios from '../../../lib/axios';

const ModalAuthenticationSignIn = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation(['common']);
	const [isSocialMediaAuthActive, setIsSocialMediaAuthActive] = useState(
		false
	);
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState('');
	const { register, handleSubmit, watch, errors } = useForm();

	const boundToggleLoginModal = () => dispatch(toggleLoginModal());

	const boundToggleRegistrationModal = () => {
		dispatch(toggleLoginModal());
		dispatch(toggleRegistrationModal());
	};

	const boundTogglePhoneVerficationModal = () => {
		dispatch(toggleLoginModal());
		dispatch(togglePhoneVerficationModal());
	};

	const boundToggleForgotPasswordModal = () => {
		dispatch(toggleLoginModal());
		dispatch(toggleForgotPasswordModal());
	}

	const showErrorMessage = (message, timeout) => {
		setMessage(message);

		setTimeout(() => {
			setMessage('');
		}, timeout);
	};

	const onSubmit = async (data) => {
		const { emailOrUsername, password, rememberMe } = data;

		setIsLoading(true);

		try {
			const response = await axios.post('customer/login', {
				userNameOrEmailAddress: emailOrUsername,
				password: password,
				twoFactorVerificationCode: '',
				twoFactorRememberClientToken: '',
				rememberClient: rememberMe,
				singleSignIn: true,
				returnUrl: 'string',
			});

			const userData = response.data.result;

			userData.emailOrUsername = emailOrUsername;
			
			setIsLoading(false);
			dispatch(setUserData(userData));
			if (!userData.isPhoneConfirmed) {
				boundTogglePhoneVerficationModal();
			} else {
				boundToggleLoginModal();
			}
		} catch (error) {
			setIsLoading(false);
			if (!error.success) {
				showErrorMessage(t('email_or_password_is_wrong'), 5000);
			}
			console.error(error);
		}
	};

	return (
		<div>
			<div
				className="modal fade modal-box modal-box-sm show"
				id="sign-in"
				onClick={boundToggleLoginModal}
			>
				<div
					onClick={(e) => e.stopPropagation()}
					className="modal-dialog"
					role="document"
				>
					{isLoading && <BaseLoader />}
					<div className="modal-content">
						<div className="modal-top">
							<h2 className="title">
								<span>{t('sign_in')}</span>
							</h2>
						</div>
						<div className="modal-main">
							<div className="box-signin">
								{isSocialMediaAuthActive && (
									<div>
										<div className="sigin-social">
											<a
												href=""
												title=""
												className="btn-h50 flex-center-center signin-facebook"
											>
												Sign in with Facebook
											</a>
											<a
												href=""
												title=""
												className="btn-h50 flex-center-center signin-ggle"
											>
												Sign in with Google
											</a>
											<a
												href=""
												title=""
												className="btn-h50 flex-center-center signin-insta"
											>
												Sign in with Instagram
											</a>
										</div>
										<div className="or">{t('or')}</div>
									</div>
								)}

								<form
									className="form-sign"
									onSubmit={handleSubmit(onSubmit)}
								>
									{message && (
										<div className="alert alert-danger">
											{message}
										</div>
									)}
									<div className="name-bg mgb-20">
										<input
											name="emailOrUsername"
											type="text"
											placeholder="Username or email"
											className="input-radius btn-h50"
											ref={register({
												required: true,
											})}
										/>
										{errors.emailOrUsername?.type ===
											'required' && (
											<div className="invalid-input">
												{t('input_required')}
											</div>
										)}
									</div>
									<div className="name-bg mgb-20">
										<input
											name="password"
											type="password"
											placeholder="Password"
											className="input-radius btn-h50"
											ref={register({
												required: true,
											})}
										/>
										{errors.password?.type ===
											'required' && (
											<div className="invalid-input">
												{t('input_required')}
											</div>
										)}
									</div>
									<div className="flex-center-between">
										<div className="remember">
											<label>
												<input
													name="rememberMe"
													type="checkbox"
													ref={register({
														required: false,
													})}
												/>
												<span>{t('remember_me')}</span>
											</label>
										</div>
										<a
											className="fogot"
											onClick={
												boundToggleForgotPasswordModal
											}
										>
											{t('forgot_password')}
										</a>
									</div>
									<div className="text-center mgt-30">
										<button
											type="submit"
											className="btn btn-yellow btn-h60 font-20 font-demi w230"
										>
											{t('sign_in')}
										</button>
									</div>
								</form>
								<div className="sign-note font-16 font-medium">
									<div className="note-first">
										<span>ABC account can access</span>
									</div>
									<div className="note-pre">
										all other restaurants in the ABC system.
									</div>
								</div>
								<div className="text-center font-18">
									<span className="font-medium text-ghi">
										{t('do_not_have_an_account')}
									</span>
									<button
										onClick={boundToggleRegistrationModal}
										className="btn btn-link btn-link--no-shadow text-yellow link-underlinef font-demi"
									>
										{t('sign_up')}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="modal-backdrop fade show"></div>
		</div>
	);
};

export default ModalAuthenticationSignIn;
