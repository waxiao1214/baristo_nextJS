import React from 'react';
import BannerAuthenticationVerifyEmail from '../components/banner/authentication/BannerAuthenticationVerifyEmail';

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <BannerAuthenticationVerifyEmail />
            {children}
        </div>
    )
}

export default DefaultLayout;