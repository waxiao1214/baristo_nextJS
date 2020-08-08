import cartConstants from '../../_constants/cart.constants';

export const toggleProductDetailsModal = () => {
    return {
        type: cartConstants.TOGGLE_PRODUCT_DETAILS_MODAL,
        payload: {}
    }
}

export const toggleProductDetailsModalLoader = () => {
    return {
        type: cartConstants.TOGGLE_PRODUCT_DETAILS_MODAL_LOADER,
        payload: {}
    }
}

export const toggleCustomizeProductModal = () => {
    return {
        type: cartConstants.TOGGLE_CUSTOMIZE_PRODUCT_MODAL,
        payload: {}
    }
}

export const setProductDetails = (productDetails) => {
    return {
        type: cartConstants.SET_PRODUCT_DETAILS,
        payload: {
            productDetails
        }
    }
}