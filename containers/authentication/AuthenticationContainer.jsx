import React from 'react';
import ModalAuthenticationSignUp from '../../components/modal/authentication/ModalAuthenticationSignUp';
import { useSelector } from 'react-redux';

const AuthenticationContainer = () => {
	const { isRegistrationModalVisible } = useSelector(
		(state) => state.authentication
	);
	return (
		<div>{isRegistrationModalVisible && <ModalAuthenticationSignUp />}</div>
	);
};

export default AuthenticationContainer;
