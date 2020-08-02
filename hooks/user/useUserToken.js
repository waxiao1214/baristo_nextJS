import { useSelector } from 'react-redux';

/**
 * Hook that return the user auth token
 *
 * @param {String} token
 */
function useUserToken(links) {
    const { accessToken } = useSelector(state => state.authentication.currentUser)

    return accessToken;
}

export default useUserToken;