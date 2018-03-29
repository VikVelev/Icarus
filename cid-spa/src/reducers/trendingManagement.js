const defaultState = {
    trendingPosts: {},
    fetching: false,
    fetched: false,
    shuffled: false,
    shuffledPosts: [],
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
        case "SHUFFLE":
            return {
                ...state,
                shuffled: true,
                shuffledPosts: action.payload
            }
        default:
            return state
    }
}

export default trendingManagement