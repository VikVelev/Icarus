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
        
        saxios.get(url + "/api/trending/").then((response) => {
            dispatch({ type: "FETCH_TRENDING_POSTS_FULFILLED", payload: response.data })      
        }).catch((error) => {
            dispatch({ type: "FETCH_TRENDING_POSTS_REJECTED", payload: error })            
        })
    }
}

export function fetchNextTrendingBatch(from, token){
    return function(dispatch) {
        dispatch({type: "FETCH_NEXT_TRENDING_BATCH"})

        let saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
            }
        })

        saxios.get(url + "/api/trending/" + (from !== 0 ? "?offset=" + from : "")).then((response) => {
            dispatch({ type: "FETCH_NEXT_TRENDING_BATCH_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "FETCH_NEXT_TRENDING_BATCH_REJECTED", payload: error })            
        })
    }
}