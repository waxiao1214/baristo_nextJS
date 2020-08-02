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
	const [currentStep, setCurrentStep] = useState(1); // we have two steps

	const watchPhoneNumber = watch('PhoneNumber', '');

	const nextStep = () => {
		setCurrentStep(1);
	};

	const onSubmit = async (data) => {
		setIsLoading(true);
		try {
			const response = await axios.post(
				`customer/send-phone-verification-code?phone=${watchPhoneNumber}`,
				{
					AUTHORIZATION: `Bearer ${token}`,
				}
			);
			// if success go to next step
			nextStep();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
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
									onSubmit={handleSubmit(onSubmit)}
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
								<form className="form-verity text-center">
									<div id="form-otp">
										<input
											type="text"
											maxLength="1"
											size="1"
											min="0"
											max="9"
											pattern="[0-9]{1}"
										/>
										<input
											type="text"
											maxLength="1"
											size="1"
											min="0"
											max="9"
											pattern="[0-9]{1}"
										/>
										<input
											type="text"
											maxLength="1"
											size="1"
											min="0"
											max="9"
											pattern="[0-9]{1}"
										/>
										<input
											type="text"
											maxLength="1"
											size="1"
											min="0"
											max="9"
											pattern="[0-9]{1}"
										/>
									</div>
									<div className="mgb-20 mgt-50">
										<span className="font-18 font-medium text-ghi">
											Do not get your code?
										</span>
										<a
											href=""
											title=""
											className="text-yellow font-18 font-demi"
										>
											Send again
										</a>
									</div>
									<div className="text-center mgt-30">
										<button
											type="button"
											className="btn btn-yellow btn-h60 font-20 font-demi w230"
											data-toggle="modal"
											data-target="#sign-in"
										>
											CONTINUE
										</button>
									</div>
								</form>
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
