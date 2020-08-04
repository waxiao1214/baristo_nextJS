import React, { useEffect, useState } from 'react';
import ModalAuthenticationSignUp from '../../components/modal/authentication/ModalAuthenticationSignUp';
import ModalAuthenticationWhatIsThis from '../../components/modal/authentication/ModalAuthenticationWhatIsThis';
import ModalAuthenticationSignIn from '../../components/modal/authentication/ModalAuthenticationSignIn';
import ModalAuthenticationVerifyPhone from '../../components/modal/authentication/ModalAuthenticationVerifyPhone';
import ModalAuthenticationForgotPassword from '../../components/modal/authentication/ModalAuthenticationForgotPassword';
import { useSelector } from 'react-redux';
import axios from '../../lib/axios';
const AuthenticationContainer = () => {
	const {
		isRegistrationModalVisible,
		isWhatsThisModalVisible,
		isLoginModalVisible,
		isPhoneVerificationModalVisible,
		isForgotPasswordModalVisible,
	} = useSelector((state) => state.authentication);
	const [socialAuthProviders, setSocialAuthProviders] = useState([]);
	const getSocialAuthProviders = async () => {
		try {
			const response = await axios.get(
				'TokenAuth/GetExternalAuthenticationProviders'
			);

			setSocialAuthProviders(response.data.result);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getSocialAuthProviders();
	}, []);

	return (
		<div>
			{isRegistrationModalVisible && (
				<ModalAuthenticationSignUp
					socialAuthProviders={socialAuthProviders}
				/>
			)}
			{isWhatsThisModalVisible && <ModalAuthenticationWhatIsThis />}
			{isLoginModalVisible && (
				<ModalAuthenticationSignIn
					socialAuthProviders={socialAuthProviders}
				/>
			)}
			{!isPhoneVerificationModalVisible && (
				<ModalAuthenticationVerifyPhone />
			)}
			{isForgotPasswordModalVisible && (
				<ModalAuthenticationForgotPassword />
			)}
		</div>
	);
};

export default AuthenticationContainer;
