import React from 'react';
import BannerAuthenticationVerifyEmail from '../components/banner/authentication/BannerAuthenticationVerifyEmail';
import AuthenticationContainer from '../containers/authentication/AuthenticationContainer';
import ProductsCustomizeContainer from '../containers/products/ProductsCustomizeContainer';

const DefaultLayout = ({ children }) => {
    return (
		<div>
			<BannerAuthenticationVerifyEmail />
			<AuthenticationContainer />
			<ProductsCustomizeContainer />
			{children}
		</div>
	);
}

export default DefaultLayout;