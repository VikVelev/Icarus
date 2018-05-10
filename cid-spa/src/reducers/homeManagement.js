const defaultState = {
    personalizedPosts: [],
    batches: [],
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
                fetchingBatch: true,
                fetchedBatch: false,
                ...state
            }
        case "FETCH_NEXT_BATCH_FULFILLED":
            state.batches.push(action.payload)
            return {
                fetchingBatch: false,
                fetchedBatch: true,
                ...state
            }
        case "FETCH_NEXT_BATCH_REJECTED":
            return {
                fetchingBatch: false,                
                fetchedBatch: false,
                ...state
            }
        default: 
            return state
    }
}

export default homeManagement