import React from 'react';
import ModalAuthenticationSignUp from '../../components/modal/authentication/ModalAuthenticationSignUp';
import ModalAuthenticationWhatIsThis from '../../components/modal/authentication/ModalAuthenticationWhatIsThis';
import { useSelector } from 'react-redux';

const AuthenticationContainer = () => {
	const { isRegistrationModalVisible, isWhatsThisModalVisible } = useSelector(
		(state) => state.authentication
	);
	return (
		<div>
			{isRegistrationModalVisible && <ModalAuthenticationSignUp />}
			{isWhatsThisModalVisible && <ModalAuthenticationWhatIsThis />}
		</div>
	);
};

export default AuthenticationContainer;
