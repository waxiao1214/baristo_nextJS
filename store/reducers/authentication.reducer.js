import { userConstants } from '../../_constants';

const initialState = {
    authentication: {
        isRegistrationModalVisible: false
    }
};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        
        case userConstants.TOGGLE_REGISTRATION_MODAL:
            return {
                ...state,
                isRegistrationModalVisible: !state.authentication.isRegistrationModalVisible
            }
        default:
            return state
    }
}