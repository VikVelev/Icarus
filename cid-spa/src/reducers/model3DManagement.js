let defaultState = {
    model: {},
    fetching: false,
    fetched: false,
    error: {},
}

const model3DManagement = (state=defaultState, action) => {
    switch(action.type) {
        case "FETCH_DATA":
            return {
                ...state,
                fetching: true,
            }
        case "FETCH_DATA_FULFILLED":
            return {
                ...state,
                model: action.payload,
                fetching: false,
                fetched: true,
            }
        case "FETCH_DATA_REJECTED":
            return {
                ...state,
                fetching: false,
                fetched: false,
                error: action.payload,
            }
        default: 
            return state
    }
}

export default model3DManagement;