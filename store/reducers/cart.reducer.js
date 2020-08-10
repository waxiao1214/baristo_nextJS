import cartConstants from '../../_constants/cart.constants';

const initialState = {
    isProductDetailsActive: false,
    isProductDetailsLoaderActive: false,
    isCustomizeProductModalActive: false,
    productDetails: {},
    productsBatch: [],
    currentActiveProductId: 0,
    currentActiveProductIndex: 0
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

        default:
            return state
    }
}