const defaultState = {
    personalizedPosts: [],
    hasMore: true,
    fetching: false,
    fetchingBatch: false,
    fetchedBatch: false,
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
        case "FETCH_NEXT_BATCH":
            return {
                fetching: true,
                fetched: false,
                ...state
            }
        case "FETCH_NEXT_BATCH_FULFILLED":
            state.personalizedPosts.push(action.payload.results)
            return {
                ...state,
                hasMore: action.payload.next !== null,
                fetching: false,
                fetched: true,
            }
        case "FETCH_NEXT_BATCH_REJECTED":
            return {
                fetching: false,                
                fetched: false,
                ...state
            }
        default: 
            return state
    }
}

export default homeManagement