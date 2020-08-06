import React from 'react';
import BannerAuthenticationVerifyEmail from '../components/banner/authentication/BannerAuthenticationVerifyEmail';
import AuthenticationContainer from '../containers/authentication/AuthenticationContainer';

const DefaultLayout = ({ children }) => {
    return (
		<div>
			<AuthenticationContainer />
			<BannerAuthenticationVerifyEmail />
			{children}
		</div>
	);
}

export default DefaultLayout;