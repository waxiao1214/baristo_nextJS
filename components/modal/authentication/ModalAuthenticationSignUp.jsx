import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
	toggleWhatsThisModal,
	toggleRegistrationModal,
	toggleLoginModal,
} from '../../../store/actions/authentication.actions';

const ModalAuthenticationSignUp = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation(['common']);
	const logo = useSelector((state) => state.root.logo);
	const [isEmailAlreadyRegistered, setIsEmailAlreadyRegistered] = useState(
		false
	);
	const [isCatptchaActive, setIsCatptchaActive] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const boundToggleWhatsThisModal = () => {
		dispatch(toggleRegistrationModal());
		dispatch(toggleWhatsThisModal());
	};

	const boundToggleLoginModal = () => {
		dispatch(toggleRegistrationModal());
		dispatch(toggleLoginModal());
	};

	return (
		<div>
			<div className="modal fade modal-box show" id="sign-up">
				<div className="modal-dialog" role="document">
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
								<form className="form-sign mgb-30">
									<div className="name-bg mgb-20">
										<input
											type="text"
											placeholder={t('email')}
											value={email}
											onChage={(e) =>
												setEmail(e.target.value)
											}
											className="input-radius btn-h50"
										/>
										{isEmailAlreadyRegistered && (
											<div className="note-warning flex-center">
												<span>
													<img src="images/icon/priority_high_24px.svg" />
												</span>
												<div className="note-text">
													Your email has been
													registered with ABC. Do you
													want to
													<a
														href=""
														title=""
														className="text-yellow font-16 font-demi link-underline"
														data-target="#sign-in"
														data-toggle="modal"
													>
														{t('sign_in')}
													</a>{' '}
												</div>
											</div>
										)}
									</div>
									<div className="name-bg mgb-20">
										<input
											type="password"
											placeholder={t('password')}
											value={password}
											onChage={(e) =>
												setPassword(e.target.value)
											}
											className="input-radius btn-h50"
										/>
									</div>
									<div className="name-bg mgb-20">
										<input
											type="password"
											placeholder={t('confirm_password')}
											value={confirmPassword}
											onChage={(e) =>
												setConfirmPassword(
													e.target.value
												)
											}
											className="input-radius btn-h50"
										/>
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
											type="button"
											className="btn btn-yellow btn-h60 font-20 font-demi w230"
											data-toggle="modal"
											data-target="#verify-phone"
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
