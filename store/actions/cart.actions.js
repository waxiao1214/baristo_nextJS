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

export const toggleConfirmProductModal = () => {
    return {
        type: cartConstants.TOGGLE_CONFIRM_PRODUCT_MODAL,
        payload: {}
    }
}

export const toggleCartDetailsModal = () => {
    return {
        type: cartConstants.TOGGLE_CART_DETAILS_MODAL,
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

export const setProductsBatch = (productsBatch) => {
    return {
        type: cartConstants.SET_PRODUCTS_BATCH,
        payload: {
            productsBatch
        }
    }
}

export const setCurrentActiveProductId = (id) => {
    return {
        type: cartConstants.SET_CURRENT_ACTIVE_PRODUCT_ID,
        payload: {
            id
        }
    }
}

export const setCurrentActiveProductIndex = (index) => {
    return {
        type: cartConstants.SET_CURRENT_ACTIVE_PRODUCT_INDEX,
        payload: {
            index
        }
    }
}

export const setSelectedPrice = (selectedPrice) => {
    return {
        type: cartConstants.SET_SELECTED_PRICE,
        payload: {
            selectedPrice
        }
    }
}

export const setSelectedToppings = (selectedToppings) => {
    return {
        type: cartConstants.SET_SELECTED_TOPPINGS,
        payload: {
            selectedToppings
        }
    }
}

export const setDeliveryType = (type) => {
    if (type !== 'Delivery' && type !== 'PickUp') {
        return {
            type: cartConstants.SET_DELIVERY_TYPE,
            payload: {
                type: 'Delivery'
            }
        }
    }

    return {
        type: cartConstants.SET_DELIVERY_TYPE,
        payload: {
            type
        }
    }
}

export const setOrderItems = (items) => {
    return {
        type: cartConstants.SET_ORDER_ITEMS,
        payload: {
            items
        }
    }
}

export const setComboOrderItems = (items) => {
    return {
        type: cartConstants.SET_COMBO_ORDER_ITEMS,
        payload: {
            items
        }
    }
}

