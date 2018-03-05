const defaultState = {
    personalizedPosts: {},
    fetching: false,
    fetched: false,
    error: {},
}

const homeManagement = (state=defaultState, action) => {
    switch (action.type) {
        case "FETCH_PERSONALIZED_POSTS":
            return {
                ...state,
                fetching: true,
            }
        case "FETCH_PERSONALIZED_POSTS_FULFILLED":
            return {
                ...state,
                fetching: false,
                fetched: true,
                personalizedPosts: action.payload
            }
        case "FETCH_PERSONALIZED_POSTS_REJECTED":
            return {
                ...state,
                fetching: false,
                fetched: false,
                error: action.payload
            }
        default: 
            return state
    }
}

export default homeManagement