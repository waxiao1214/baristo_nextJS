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

export const togglePhoneVerficationModal = () => {
    return {
        type: userConstants.TOGGLE_PHONE_VERIFICATION_MODAL,
        payload: {}
    }
}

export const setUserData = (user) => {
    console.log(user, 'as')
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(user));

    return {
        type: userConstants.SET_CURRENT_USER,
        payload: {
            user
        }
    }
}
