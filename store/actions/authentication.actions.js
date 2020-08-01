import { userConstants } from '../../_constants';

export const toggleRegistrationModal = () => {
    return {
        type: userConstants.TOGGLE_REGISTRATION_MODAL,
        payload: {}
    }
}