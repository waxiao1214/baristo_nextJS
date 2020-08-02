import React from 'react';
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
import BaseLoader from '../../../components/base/BaseLoader';
const { register, handleSubmit, watch, errors } = useForm();
const { t, i18n } = useTranslation(['common']);

const ModalAuthenticationForgotPassword = () => {
	const logo = useSelector((state) => state.root.logo);
	const { t } = useTranslation(['common']);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (data) => {
        console.log(data);
    }

	return (
		<div>
			<div className="modal fade modal-box" id="forget-password">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="text-center pdt-30 relative">
							<a href="" title="">
								<img className="logo-s" src={logo} />
							</a>
						</div>
						<div className="modal-top">
							<h2 className="title">
								<span>{t('forgot_password')}</span>
							</h2>
						</div>
						<div className="modal-main">
							<form
								className="form-verity text-center"
								onSubmit={handleSubmit(onSubmit)}
							>
								<div className="desc font-20 mgb-20">
									<p>
										We will send a verification code to your
										phone number to continue logging in.
									</p>
								</div>
								<div className="name-bg">
									<input
										type="text"
										placeholder="Enter your email"
										className="input-radius btn-h50"
										name="email"
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
								</div>
								<div className="text-center mgt-30">
									<button
										type="submit"
										className="btn btn-yellow btn-h60 font-20 font-demi w230"
									>
										{t('send')}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
