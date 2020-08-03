import React, { useState, useEffect } from 'react';
import BaseLoader from '../components/base/BaseLoader';
import useUserToken from '../hooks/user/useUserToken';
import axios from '../lib/axios';
import queryString from 'query-string';
import _ from 'lodash';
import useUserFetchCurrentUser from '../hooks/user/useUserFetchCurrentUser';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';


const ConfirmEmail = () => {
	useUserFetchCurrentUser();
	const dispatch = useDispatch();
	const { t } = useTranslation(['common']);
	const [isLoading, setIsLoading] = useState(true);
	const accessToken = useUserToken();
	const [message, setMessage] = useState('');

	const activateEmail = async (token) => {
		try {
			const response = await axios.post(
				`customer/activate-email?c=${token}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (response.data.success) {
				setMessage(t('email_activated'));
				const user = localStorage.getItem('user');
				// no user is stored in local storage
				if (!user) return;
				user.isEmailConfirmed = true;
				dispatch(setUserData(JSON.parse(user)));
				setTimeout(() => {
					window.location.href = '/';
				}, 4000);
			} else {
				setMessage(t('an_error_happened'));
			}
			setIsLoading(false);
		} catch (error) {
			setMessage(t('an_error_happened'));
			setIsLoading(false);
		}
	};

	useEffect(() => {
		// get url query
		const { c } = queryString.parse(location.search, {
			decode: false,
		});

		if (_.isNil(c)) {
			window.location.href = '/';
		}

		activateEmail(c);
	}, []);

	return (
		<div className="position-relative h-100 w-100 min-h-screen">
			{isLoading && <BaseLoader />}
			{!isLoading && <div className="py-5 px-5 text-center">{message}</div>}
		</div>
	);
};

export default ConfirmEmail;
