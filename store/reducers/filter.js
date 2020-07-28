const filter = (state = {
    isFilterModalActive: false,
}, action) => {
    switch (action.type) {
        case 'TOGGLE_FILTER_MODAL':
            return {
                ...state,
                isFilterModalActive: !state.isFilterModalActive,
            }

        default:
            return state
    }
}

export default filter;