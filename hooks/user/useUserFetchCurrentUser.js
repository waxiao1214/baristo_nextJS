import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
    setUserData
} from '../../store/actions/authentication.actions';
import _ from 'lodash';

const useUserFetchCurrentUser = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.authentication.currentUser);

    // when mounted
    useEffect(() => {
        // the user is already logged in
        if (!_.isEmpty(currentUser)) return;

        const user = localStorage.getItem('user');
        // no user is stored in local storage
        if (!user) return;
        dispatch(setUserData(JSON.parse(user)));
    }, []);
}

export default useUserFetchCurrentUser;