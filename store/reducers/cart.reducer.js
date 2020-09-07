import cartConstants from '../../_constants/cart.constants';

const initialState = {
    isProductDetailsActive: false,
    isProductDetailsLoaderActive: false,
    isCustomizeProductModalActive: false,
    isConfirmProductModalActive: false,
    isCartDetailsModalActive: false,
    productDetails: {},
    productsBatch: [],
    currentActiveProductId: 0,
    currentActiveProductIndex: 0,
    currentCustomizeProductMode: 'add', // add or edit
    deliveryType: 'Delivery', // Delivery or PickUp,
    selectedPrice: {},
    selectedProductChoices: [],
    orderItems: [],
    comboOrderItems: [],
    isProductDetailsTrigger: true,
    isMenuDetailsTrigger: true,
    orderAddressFk: {
        postalCodeId: 0,
        orderAddressFk: null
    }
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
        case cartConstants.TOGGLE_CART_DETAILS_MODAL:
            return {
                ...state,
                isCartDetailsModalActive: !state.isCartDetailsModalActive
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
        case cartConstants.SET_PRODUCT_DETAILS_TRIGGER:
            return {
                ...state,
                isProductDetailsTrigger: !state.isProductDetailsTrigger
            }
        case cartConstants.SET_MENU_DETAILS_TRIGGER:
            return {
                ...state,
                isMenuDetailsTrigger: !state.isMenuDetailsTrigger
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
                selectedProductChoices: action.payload.selectedToppings
            }
        case cartConstants.SET_ORDER_ITEMS:
            return {
                ...state,
                orderItems: action.payload.items
            }
        case cartConstants.SET_COMBO_ORDER_ITEMS:
            return {
                ...state,
                comboOrderItems: action.payload.items
            }

        default:
            return state
    }
}