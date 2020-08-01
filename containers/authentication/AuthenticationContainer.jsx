import React from 'react';
import ModalAuthenticationSignUp from '../../components/modal/authentication/ModalAuthenticationSignUp';
import ModalAuthenticationWhatIsThis from '../../components/modal/authentication/ModalAuthenticationWhatIsThis';
import ModalAuthenticationSignIn from '../../components/modal/authentication/ModalAuthenticationSignIn';
import { useSelector } from 'react-redux';

const AuthenticationContainer = () => {
	const {
		isRegistrationModalVisible,
		isWhatsThisModalVisible,
		isLoginModalVisible,
	} = useSelector((state) => state.authentication);
	return (
		<div>
			{isRegistrationModalVisible && <ModalAuthenticationSignUp />}
			{isWhatsThisModalVisible && <ModalAuthenticationWhatIsThis />}
			{isLoginModalVisible && <ModalAuthenticationSignIn />}
		</div>
	);
};

export default AuthenticationContainer;
