import axios from 'axios'
import url from './backendUrl.js'


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