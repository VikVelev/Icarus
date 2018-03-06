import axios from 'axios'

var url = "http://localhost:8000"

export function fetchTrendingPosts(){
    return function(dispatch) {
        dispatch({type: "FETCH_TRENDING_POSTS"})
        axios.get(url + "/api/posts/").then((response) => {
            dispatch({ type: "FETCH_TRENDING_POSTS_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "FETCH_TRENDING_POSTS_REJECTED", payload: error })            
        })
    }
}