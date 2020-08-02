import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from '../../../lib/axios';
import useUserToken from '../../../hooks/user/useUserToken';
import BaseLoader from '../../../components/base/BaseLoader';

const ModalAuthenticationVerifyPhone = () => {
	const logo = useSelector((state) => state.root.logo);
	const { t } = useTranslation(['common']);
	const { register, handleSubmit, watch, errors } = useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [currentStep, setCurrentStep] = useState(0); // we have 3 steps
	const [message, setMessage] = useState('');
	const token = useUserToken();
	const watchPhoneNumber = watch('phoneNumber', '');

	const nextStep = () => {
		setCurrentStep(1);
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

	const sendPhoneVerificationCode = async (data) => {
		setIsLoading(true);
		try {
			const response = await axios.post(
				`customer/send-phone-verification-code?phone=${watchPhoneNumber}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			// if success go to next step
			if (response.data.success) {
				nextStep();
			}
			// go to step 3
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const verifyPhoneNumber = async (data) => {
		try {
			let code = Object.values(data).join('');

			const response = await axios.post(
				`customer/verify-phone-code?phone=${watchPhoneNumber}&code=${code}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<div className="modal fade modal-box show" id="verify-phone">
				<div className="modal-dialog" role="document">
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
											href=""
											title=""
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
							{message && (
								<div className="text-center mgt-10">
									{message}
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
