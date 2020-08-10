import cartConstants from '../../_constants/cart.constants';

const initialState = {
    isProductDetailsActive: false,
    isProductDetailsLoaderActive: false,
    isCustomizeProductModalActive: false,
    isConfirmProductModalActive: false,
    productDetails: {},
    productsBatch: [],
    currentActiveProductId: 0,
    currentActiveProductIndex: 0,
    deliveryType: 'Delivery', // Delivery or PickUp,
    selectedPrice: {},
    selectedToppings: []
};

export default function cart(state = initialState, action) {
    switch (action.type) {
        case cartConstants.TOGGLE_CUSTOMIZE_PRODUCT_MODAL:
            return {
                ...state,
                isCustomizeProductModalActive: !state.isCustomizeProductModalActive
            };
        case cartConstants.TOGGLE_PRODUCT_DETAILS_MODAL:
            return {
                ...state,
                isProductDetailsActive: !state.isProductDetailsActive
            };
        case cartConstants.TOGGLE_PRODUCT_DETAILS_MODAL_LOADER:
            return {
                ...state,
                isProductDetailsLoaderActive: !state.isProductDetailsLoaderActive
            }
        case cartConstants.TOGGLE_CONFIRM_PRODUCT_MODAL:
            return {
                ...state,
                isConfirmProductModalActive: !state.isConfirmProductModalActive
            }
        case cartConstants.SET_PRODUCT_DETAILS:
            return {
                ...state,
                productDetails: action.payload.productDetails
            }
        case cartConstants.SET_PRODUCTS_BATCH:
            return {
                ...state,
                productsBatch: action.payload.productsBatch
            }
        case cartConstants.SET_CURRENT_ACTIVE_PRODUCT_INDEX:
            return {
                ...state,
                currentActiveProductIndex: action.payload.index
            }
        case cartConstants.SET_CURRENT_ACTIVE_PRODUCT_ID:
            return {
                ...state,
                currentActiveProductId: action.payload.id
            }
        case cartConstants.SET_DELIVERY_TYPE:
            return {
                ...state,
                deliveryType: action.payload.type
            }
        case cartConstants.SET_SELECTED_PRICE:
            return {
                ...state,
                selectedPrice: action.payload.selectedPrice
            }
        case cartConstants.SET_SELECTED_TOPPINGS:
            return {
                ...state,
                selectedToppings: action.payload.selectedToppings
            }

        default:
            return state
    }
}