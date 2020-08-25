import React from 'react';
import BannerAuthenticationVerifyEmail from '../components/banner/authentication/BannerAuthenticationVerifyEmail';
import AuthenticationContainer from '../containers/authentication/AuthenticationContainer';
import ProductsCustomizeContainer from '../containers/products/ProductsCustomizeContainer';
import CheckoutModalCartDetails from '../components/checkout/modal/CheckoutModalCartDetails';

const DefaultLayout = ({ children }) => {
    return (
		<div>
			<BannerAuthenticationVerifyEmail />
			<AuthenticationContainer />
			<ProductsCustomizeContainer />
			<CheckoutModalCartDetails />
			{children}
		</div>
	);
}

export default DefaultLayout;