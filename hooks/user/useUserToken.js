import { useSelector } from 'react-redux';

/**
 * Hook that return the user auth token
 *
 * @param {String} token
 */
function useUserToken(links) {
    const { token } = useSelector(state => state.authentication.user)

    return token;
}

export default useUserToken;