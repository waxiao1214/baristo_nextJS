import { userConstants } from '../../_constants';

export const toggleRegistrationModal = () => {
    return {
        type: userConstants.TOGGLE_REGISTRATION_MODAL,
        payload: {}
    }
}

export const toggleWhatsThisModal = () => {
    return {
        type: userConstants.TOGGLE_WHATS_THIS_MODAL,
        payload: {}
    }
}

export const toggleLoginModal = () => {
    return {
        type: userConstants.TOGGLE_LOGIN_MODAL,
        payload: {}
    }
}

export const setUserData = (user) => {
    // add the tokens to local storage
    return {
        type: userConstants.SET_CURRENT_USER,
        payload: {
            user
        }
    }
} 