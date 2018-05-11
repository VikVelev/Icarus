const defaultState = {
    trendingPosts: [],
    hasMore: true,
    fetching: false,
    fetched: false,
    error: {},
}

const trendingManagement = (state=defaultState, action) => {
    switch (action.type) {
        case "FETCH_TRENDING_POSTS":
            return {
                ...state,
                fetching: true,
            }
        case "FETCH_TRENDING_POSTS_FULFILLED":
            return {
                ...state,
                fetching: false,
                fetched: true,
                trendingPosts: action.payload
            }
        case "FETCH_TRENDING_POSTS_REJECTED":
            return {
                ...state,
                fetching: false,
                fetched: false,
                error: action.payload
            }
        case "FETCH_NEXT_TRENDING_BATCH":
            return {
                fetching: true,
                fetched: false,
                ...state
            }
        case "FETCH_NEXT_TRENDING_BATCH_FULFILLED":
            state.trendingPosts.push(action.payload.results)
            return {
                ...state,
                hasMore: action.payload.next !== null,
                fetching: false,
                fetched: true,
            }
        case "FETCH_NEXT_TRENDING_BATCH_REJECTED":
            return {
                fetching: false,                
                fetched: false,
                ...state
            }
        default:
            return state
    }
}

export default trendingManagement