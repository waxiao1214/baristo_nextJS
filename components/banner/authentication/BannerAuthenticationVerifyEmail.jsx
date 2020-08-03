import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import BaseLoader from '../../../components/base/BaseLoader';
import axios from '../../../lib/axios';
import useUserToken from '../../../hooks/user/useUserToken';

const BannerAuthenticationVerifyEmail = () => {
	const { currentUser } = useSelector((state) => state.authentication);
	const { t } = useTranslation(['common']);

	const [isLoading, setIsLoading] = useState(false);
    const token = useUserToken();
    
    const [isRevalidated, setIsRevalidated] = useState(false);

	const resendEmailVerfication = async () => {
		setIsLoading(true);
		try {
			const { emailOrUsername } = currentUser;
			const response = await axios.post(
				`customer/resend-verification-email?emailAddress=${emailOrUsername}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

            const { isSuccess } = JSON.parse(response.data.result);
            if (isSuccess) {
                setIsRevalidated(true);
            }
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	if (_.isEmpty(currentUser)) return '';

	if (_.isUndefined(currentUser.isEmailConfirmed) || currentUser.isEmailConfirmed) return '';

	return (
		<div className="alert alert-danger mb-0 text-center px-3" role="alert">
			{isLoading && <BaseLoader />}
			{isRevalidated
				? t('revalidated_check_inbox')
				: t('email_not_confirmed_text')}
			<a className="alert-link ml-1" onClick={resendEmailVerfication}>
				{isRevalidated ? '' : t('revalidate')}
			</a>
		</div>
	);
};

export default BannerAuthenticationVerifyEmail;
