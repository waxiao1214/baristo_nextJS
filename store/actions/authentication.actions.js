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