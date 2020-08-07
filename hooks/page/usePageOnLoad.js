import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../../lib/axios';
import _ from 'lodash';

const usePageOnLoad = ({ settings, currentBranch }) => {
    const dispatch = useDispatch();

    dispatch({
        type: 'ADD_SETTINGS',
        payload: {
            settings: settings
        }
    });

    dispatch({
        type: 'SET_CURRENT_BRANCH',
        payload: {
            branch: currentBranch
        }
    });

    useEffect(() => {
        if (!currentBranch.contentWidgets) return;

        if (_.isEmpty(currentBranch.applicationMedia)) return;

        let logo;

        logo = currentBranch.applicationMedia.filter(media => media.type === 'LOGO')[0].blobLink;

        dispatch({
            type: 'SET_LOGO',
            payload: {
                logo
            }
        });

    }, [currentBranch]);

    // set axios auth headers 
    useEffect(() => {
        const user = localStorage.getItem('user');
        // no user in the local storage
        if (user === null) return;

        const userData = JSON.parse(user);
        if (_.isNil(userData.accessToken)) return;

        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.accessToken}`;
    }, []);
}

export default usePageOnLoad;