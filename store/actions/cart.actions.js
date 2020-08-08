import cartConstants from '../../_constants/cart.constants';

export const toggleMealDetailsModal = () => {
    return {
        type: cartConstants.TOGGLE_MEAL_DETAILS_MODAL,
        payload: {}
    }
}

export const toggleCustomizeMealModal = () => {
    return {
        type: cartConstants.TOGGLE_CUSTOMIZE_MEAL_MODAL,
        payload: {}
    }
}