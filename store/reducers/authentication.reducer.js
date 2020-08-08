import userConstants from '../../_constants/user.constants';

const initialState = {
    isRegistrationModalVisible: false,
    isWhatsThisModalVisible: false,
    isLoginModalVisible: false,
    isPhoneVerificationModalVisible: false,
    isForgotPasswordModalVisible: false,
    currentUser: {}
};

export default function authentication(state = initialState, action) {
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
                isRegistrationModalVisible: !state.isRegistrationModalVisible
            }

        case userConstants.TOGGLE_WHATS_THIS_MODAL:
            return {
                ...state,
                isWhatsThisModalVisible: !state.isWhatsThisModalVisible
            }

        case userConstants.TOGGLE_LOGIN_MODAL:
            return {
                ...state,
                isLoginModalVisible: !state.isLoginModalVisible
            }
        
        case userConstants.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload.user
            }
        
        case userConstants.TOGGLE_PHONE_VERIFICATION_MODAL:
            return {
                ...state,
                isPhoneVerificationModalVisible: !state.isPhoneVerificationModalVisible,
            }
        
        case userConstants.TOGGLE_FORGOT_PASSWORD_MODAL:
            return {
                ...state,
                isForgotPasswordModalVisible: !state.isForgotPasswordModalVisible,
            }

        default:
            return state
    }
}