import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toggleWhatsThisModal } from '../../../store/actions/authentication.actions';

const ModalAuthenticationWhatIsThis = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation(['common']);

	const boundtoggleWhatsThisModal = () => dispatch(toggleWhatsThisModal());

	return (
		<div>
			<div
				className="modal fade modal-box show"
				id="help-modal"
				onClick={boundtoggleWhatsThisModal}
			>
				<div className="modal-dialog" role="document" onClick={e => e.stopPropagation()}>
					<div className="modal-content">
						<div className="modal-top">
							<h2 className="font-32 font-demi text-center mgb-30">
								<span>{t('what_is_this')}</span>
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
									onClick={boundtoggleWhatsThisModal}
								>
									{t('understand')}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="modal-backdrop fade show"></div>
		</div>
	);
};

export default ModalAuthenticationWhatIsThis;
