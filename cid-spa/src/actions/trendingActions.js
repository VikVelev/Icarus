import axios from 'axios'
import url from './backendUrl.js'
//import { getUserByID } from './getById.js'

export function fetchTrendingPosts(token){
    return function(dispatch) {
        dispatch({type: "FETCH_TRENDING_POSTS"})
        let saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'application/json',
            }
        })
        
        saxios.get(url + "/api/posts/").then((response) => {
            dispatch({ type: "FETCH_TRENDING_POSTS_FULFILLED", payload: response.data })      
        }).catch((error) => {
            dispatch({ type: "FETCH_TRENDING_POSTS_REJECTED", payload: error })            
        })
    }
}