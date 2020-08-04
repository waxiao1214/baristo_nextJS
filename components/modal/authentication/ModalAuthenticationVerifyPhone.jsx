import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from '../../../lib/axios';
import useUserToken from '../../../hooks/user/useUserToken';
import BaseLoader from '../../../components/base/BaseLoader';
import { togglePhoneVerficationModal } from '../../../store/actions/authentication.actions';
import { findLastKey } from 'lodash';

const ModalAuthenticationVerifyPhone = () => {
	const dispatch = useDispatch();
	const logo = useSelector((state) => state.root.logo);
	const { t } = useTranslation(['common']);
	const { register, handleSubmit, watch, errors } = useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [currentStep, setCurrentStep] = useState(0); // we have 3 steps
	const [message, setMessage] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const token = useUserToken();
	const watchPhoneNumber = watch('phoneNumber', '');

	const showErrorMessage = (message, timeout) => {
		setMessage(message);

		setTimeout(() => {
			setMessage('');
		}, timeout);
	};

	const boundTogglePhoneVerficationModal = () =>
		dispatch(togglePhoneVerficationModal());

	const nextStep = () => {
		setCurrentStep(currentStep + 1);
	};

	const isCodeFormatInvalid = () => {
		return (
			errors.verificationNum4?.type === 'required' ||
			errors.verificationNum3?.type === 'required' ||
			errors.verificationNum2?.type === 'required' ||
			errors.verificationNum1?.type === 'required'
		);
	};

	const validateCodeInput = (e) => {
		e.persist();
		if (e.target.value.length > 0) {
			e.preventDefault();
		}
	};

	const sendPhoneVerificationCode = async () => {
		setPhoneNumber(watchPhoneNumber);
		setIsLoading(true);
		try {
			const response = await axios.post(
				`customer/send-phone-verification-code?phone=${phoneNumber}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			// if success go to next step
			if (response.data.success && currentStep === 0) {
				nextStep();
			}
			setIsLoading(false);
		} catch (error) {
			showErrorMessage(t('an_error_happened'), 5000);
			setIsLoading(false);
		}
	};

	const verifyPhoneNumber = async (data) => {
		setIsLoading(true);
		try {
			let code = Object.values(data).join('');

			const response = await axios.post(
				`customer/verify-phone-code?phone=${phoneNumber}&code=${code}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.data.success) {
				// update the local storage
				const user = localStorage.getItem('user')
					? JSON.parse(localStorage.getItem('user'))
					: {};
				user.isPhoneConfirmed = true;
				localStorage.setItem('user', JSON.stringify(user));

				nextStep();
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
			showErrorMessage(t('an_error_happened'), 5000);
			setIsLoading(false);
		}
	};

	return (
		<div>
			<div
				className="modal fade modal-box show"
				id="verify-phone"
				onClick={boundTogglePhoneVerficationModal}
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
						</div>
						<div className="modal-top">
							<h2 className="title">
								<span>{t('verify_phone_number')}</span>
							</h2>
						</div>
						<div className="modal-main">
							<div className="row px-5">
								<div className="col-12">
									{message && (
										<div className="alert alert-danger col-12">
											{message}
										</div>
									)}
								</div>
							</div>
							{currentStep === 0 && (
								<form
									className="form-verity text-center"
									onSubmit={handleSubmit(
										sendPhoneVerificationCode
									)}
								>
									<div className="desc font-20 mgb-20">
										{t('verify_phone_number_explanation')}
									</div>
									<div className="name-bg">
										<input
											type="text"
											placeholder="Enter your mobile number"
											className="input-radius btn-h50"
											name="phoneNumber"
											ref={register({
												required: true,
												minLength: 12,
												maxLength: 12,
												pattern: /^[+][0-9]{11}/,
											})}
										/>
										{errors.phoneNumber?.type ===
											'required' && (
											<div className="invalid-input">
												{t('input_required')}
											</div>
										)}
										{errors.phoneNumber?.type ===
											'minLength' && (
											<div className="invalid-input">
												{t('invalid_phone_number')}
											</div>
										)}
										{errors.phoneNumber?.type ===
											'maxLength' && (
											<div className="invalid-input">
												{t('invalid_phone_number')}
											</div>
										)}
										{errors.phoneNumber?.type ===
											'pattern' && (
											<div className="invalid-input">
												{t('invalid_phone_number')}
											</div>
										)}
									</div>
									<div className="text-center mgt-30">
										<button
											type="submit"
											className="btn btn-yellow btn-h60 font-20 font-demi w230"
										>
											{t('verify')}
										</button>
									</div>
								</form>
							)}
							{currentStep === 1 && (
								<form
									onSubmit={handleSubmit(verifyPhoneNumber)}
									className="form-verity text-center"
								>
									<div id="form-otp">
										<input
											type="number"
											maxLength="1"
											size="1"
											min="0"
											max="9"
											name="verificationNum1"
											pattern="[0-9]{1}"
											ref={register({
												required: true,
												minLength: 1,
												maxLength: 1,
												pattern: /^[0-9]{1}/,
											})}
											onKeyPress={(e) =>
												validateCodeInput(e)
											}
										/>
										<input
											type="number"
											maxLength="1"
											size="1"
											min="0"
											max="9"
											name="verificationNum2"
											pattern="[0-9]{1}"
											ref={register({
												required: true,
												minLength: 1,
												maxLength: 1,
												pattern: /^[0-9]{1}/,
											})}
											onKeyPress={(e) =>
												validateCodeInput(e)
											}
										/>
										<input
											type="number"
											maxLength="1"
											size="1"
											min="0"
											max="9"
											name="verificationNum3"
											pattern="[0-9]{1}"
											ref={register({
												required: true,
												minLength: 1,
												maxLength: 1,
												pattern: /^[0-9]{1}/,
											})}
											onKeyPress={(e) =>
												validateCodeInput(e)
											}
										/>
										<input
											type="number"
											maxLength="1"
											size="1"
											min="0"
											max="9"
											name="verificationNum4"
											pattern="[0-9]{1}"
											ref={register({
												required: true,
												minLength: 1,
												maxLength: 1,
												pattern: /^[0-9]{1}/,
											})}
											onKeyPress={(e) =>
												validateCodeInput(e)
											}
										/>
										{isCodeFormatInvalid() && (
											<div className="invalid-input">
												{t('invalid_code')}
											</div>
										)}
									</div>
									<div className="mgb-20 mgt-50">
										<span className="font-18 font-medium text-ghi">
											{t('didnt_get_code')}
										</span>
										<a
											onClick={sendPhoneVerificationCode}
											className="text-yellow font-18 font-demi"
										>
											{t('send_again')}
										</a>
									</div>
									<div className="text-center mgt-30">
										<button
											type="submit"
											className="btn btn-yellow btn-h60 font-20 font-demi w230"
											data-toggle="modal"
											data-target="#sign-in"
										>
											CONTINUE
										</button>
									</div>
								</form>
							)}
							{currentStep === 2 && (
								<div className="text-center py-10 desc font-20 mgb-20">
									<p>{t('phone_number_verified')}</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="modal-backdrop fade show"></div>
		</div>
	);
};

export default ModalAuthenticationVerifyPhone;
