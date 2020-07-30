import React from 'react';

const ModalAuthenticationVerifyPhone = () => {
	return (
		<div>
			<div
				className="modal fade modal-box"
				id="verify-phone"
				tabindex="-1"
				role="dialog"
				aria-hidden="true"
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="text-center pdt-30 relative">
							<a href="" title="">
								<img src="images/icon/logo.svg" />
							</a>
						</div>
						<div className="modal-top">
							<h2 className="title">
								<span>Verify phone number</span>
							</h2>
						</div>
						<div className="modal-main">
							<form className="form-verity text-center">
								<div className="desc font-20 mgb-20">
									We will send a verification code to your
									phone number to continue logging in.
								</div>
								<div className="name-bg">
									<input
										type="text"
										placeholder="Enter your mobile number"
										className="input-radius btn-h50"
									/>
								</div>
								<div className="text-center mgt-30">
									<button
										type="button"
										className="btn btn-yellow btn-h60 font-20 font-demi w230"
										data-toggle="modal"
										data-target="#verify-phone-number"
									>
										VERIFY
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="modal-backdrop fade show"></div>
		</div>
	);
};

export default ModalAuthenticationVerifyPhone;
