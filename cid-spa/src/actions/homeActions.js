import axios from 'axios'

var url = "http://localhost:8000"

export function fetchPersonalizedPosts(token){
    return function(dispatch) {
        dispatch({type: "FETCH_PERSONALIZED_POSTS"})
        axios.get(url + "/api/posts/", {
            headers: {
                'Authorization': 'Token ' + token,
            }
        }).then((response) => {
            dispatch({ type: "FETCH_PERSONALIZED_POSTS_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "FETCH_PERSONALIZED_POSTS_REJECTED", payload: error })            
        })
    }
}