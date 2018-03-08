import axios from 'axios'

var url = "http://cid-platform.myddns.me:8000"

export function fetchTrendingPosts(token){
    return function(dispatch) {
        dispatch({type: "FETCH_TRENDING_POSTS"})
    
        axios.get(url + "/api/posts/", {
            headers: {
                'Authorization': 'Token ' + token
            }
        }).then((response) => {
            dispatch({ type: "FETCH_TRENDING_POSTS_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "FETCH_TRENDING_POSTS_REJECTED", payload: error })            
        })
    }
}