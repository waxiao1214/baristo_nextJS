import { useSelector } from 'react-redux';
import _ from 'lodash';

/**
 * Hook that detects wether the user 
 * is logged in or not
 * 
 * @return {Boolean}
 */
const useUserIsLoggedIn = () => {
    const { currentUser } = useSelector(state => state.authentication);

    return !_.isEmpty(currentUser);
}

export default useUserIsLoggedIn;