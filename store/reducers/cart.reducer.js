import cartConstants from '../../_constants/cart.constants';

const initialState = {
    isMealDetailsModalActive: false,
    isCustomizeModalActive: false
};

export default function cart(state = initialState, action) {
    switch (action.type) {
        case cartConstants.TOGGLE_CUSTOMIZE_MEAL_MODAL:
            return {
                loggingIn: true,
                isCustomizeModalActive: !state.isCustomizeModalActive
            };
        case cartConstants.TOGGLE_MEAL_DETAILS_MODAL:
            return {
                loggedIn: true,
                isMealDetailsModalActive: !state.isMealDetailsModalActive
            };

        default:
            return state
    }
}