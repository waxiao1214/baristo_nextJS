import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
    togglePhoneVerficationModal,
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
        if (!user) return;

        const { isPhoneConfirmed } = JSON.parse(user);
        // show phone confirm modal
        if (!isPhoneConfirmed) {
            dispatch(togglePhoneVerficationModal());
        }
    }, []);
}

export default useUserFetchCurrentUser;