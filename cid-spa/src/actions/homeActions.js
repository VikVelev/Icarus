import axios from 'axios'
import url from './backendUrl.js'
//import { getUserByID } from './getById.js'

export function fetchPersonalizedPosts(token){
    return function(dispatch) {
        dispatch({type: "FETCH_PERSONALIZED_POSTS"})

        let saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'application/json',
            }
        })
                
        saxios.get(url + "/api/posts/").then((response) => {
            dispatch({ type: "FETCH_PERSONALIZED_POSTS_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "FETCH_PERSONALIZED_POSTS_REJECTED", payload: error })            
        })
    }
}

export function fetchNextBatch(from, token){
    return function(dispatch) {
        dispatch({type: "FETCH_NEXT_BATCH"})

        let saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'application/json',
            }
        })

        saxios.get(url + "/api/posts/?from=" + from + "&to=" + (from + 8)).then((response) => {
            dispatch({ type: "FETCH_NEXT_BATCH_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "FETCH_NEXT_BATCH_REJECTED", payload: error })            
        })
    }
}