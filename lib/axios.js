import axios from 'axios';
import _ from 'lodash';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
        return new Promise((resolve, reject) => {
            const originalReq = error.config;
            const responseCode = error.response.status;
            const isLoginRedirect = error.response.request.responseURL.toLowerCase().includes('login');

            if (responseCode === 404 && isLoginRedirect) {
                const user = localStorage.getItem('user');
                // no user in the local storage
                if (user === null) return Promise.reject(error);
                
                const userData = JSON.parse(user);
                // user opted for not staying logged in
                if (_.isNil(userData.refreshToken)) return Promise.reject(error);

                let res = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tokenAuth/refreshToken?refreshToken=${userData.refreshToken}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(res => res.json()).then(res => {
                    const { accessToken } = res.result;
                    userData.accessToken = accessToken;
                    localStorage.setItem('user', JSON.stringify(userData));

                    originalReq.headers['authorization'] = `Bearer ${accessToken}`;

                    return axios(originalReq);
                });

                resolve(res);
            }

            return reject(error);
        });
});

export default instance;