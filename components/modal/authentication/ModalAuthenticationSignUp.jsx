import React from 'react';

const ModalAuthenticationSignUp = () => {
	return (
		<div>
			<div className="modal fade modal-box" id="sign-up">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="text-center pdt-30 relative">
							<a href="" title="">
								<img
									src="images/icon/logo.svg"
									alt=""
									title=""
								/>
							</a>
							<button
								type="button"
								data-toggle="modal"
								data-target="#help-modal"
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
											placeholder="Name"
											className="input-radius btn-h50"
										/>
									</div>
									<div className="name-bg mgb-20">
										<input
											type="text"
											placeholder="Email"
											className="input-radius btn-h50"
										/>
										<div className="note-warning flex-center">
											<span>
												<img src="images/icon/priority_high_24px.svg" />
											</span>
											<div className="note-text">
												Your email has been registered
												with ABC. Do you want to{' '}
												<a
													href=""
													title=""
													className="text-yellow font-16 font-demi link-underline"
													data-target="#sign-in"
													data-toggle="modal"
												>
													Sign in
												</a>{' '}
											</div>
										</div>
									</div>
									<div className="name-bg mgb-20">
										<input
											type="text"
											placeholder="Phone number"
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
									<div className="text-center mgt-50">
										<button
											type="button"
											className="btn btn-yellow btn-h60 font-20 font-demi w230"
											data-toggle="modal"
											data-target="#verify-phone"
										>
											SIGN UP
										</button>
									</div>
								</form>
								<div className="text-center font-18">
									<span className="font-medium text-ghi">
										Have an account?
									</span>{' '}
									<a
										href=""
										title=""
										className="text-yellow link-underlinef font-demi"
										data-target="#sign-in"
										data-toggle="modal"
									>
										Sign in
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

export default ModalAuthenticationSignUp;
