import React from 'react';
import { useTranslation } from 'react-i18next';

const ModalAuthenticationSignIn = () => {
	const { t } = useTranslation(['common']);

	return (
		<div>
			<div className="modal fade modal-box modal-box-sm" id="sign-in">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-top">
							<h2 className="title">
								<span>{t('sign_in')}</span>
							</h2>
						</div>
						<div className="modal-main">
							<div className="box-signin">
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
								<form className="form-sign">
									<div className="name-bg mgb-20">
										<input
											type="text"
											placeholder="Username or email"
											className="input-radius btn-h50"
										/>
									</div>
									<div className="name-bg mgb-20">
										<input
											type="password"
											placeholder="Password"
											className="input-radius btn-h50"
										/>
									</div>
									<div className="flex-center-between">
										<div className="remember">
											<label>
												<input type="checkbox" />
												<span>{t('remember_me')}</span>
											</label>
										</div>
										<a
											href=""
											title=""
											data-toggle="modal"
											data-target="#forget-password"
											className="fogot"
										>
											{t('forgot_password')}
										</a>
									</div>
									<div className="text-center mgt-30">
										<button className="btn btn-yellow btn-h60 font-20 font-demi w230">
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
									<a
										href="#"
										title=""
										className="text-yellow link-underlinef font-demi"
										data-toggle="modal"
										data-target="#sign-up"
									>
										{t('sign_up')}
									</a>{' '}
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
