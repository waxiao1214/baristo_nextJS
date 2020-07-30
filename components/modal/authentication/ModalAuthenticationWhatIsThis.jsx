import React from 'react';

const ModalAuthenticationWhatIsThis = () => {
    return (
		<div>
			<div className="modal fade modal-box" id="help-modal">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-top">
							<h2 className="font-32 font-demi text-center mgb-30">
								<span>What's this?</span>
							</h2>
						</div>
						<div className="modal-main">
							<div className="desc font-20 text-center">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Etiam suscipit sapien a
								convallis lobortis.
							</div>
							<div className="text-center mgt-30">
								<button
									type="button"
									className="btn btn-yellow btn-h60 font-20 font-demi w230"
									data-toggle="modal"
									data-target="#sign-up"
								>
									Understand
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="modal-backdrop fade show"></div>
		</div>
	);
}

export default ModalAuthenticationWhatIsThis;