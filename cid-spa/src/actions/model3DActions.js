import url from './backendUrl.js'
import axios from 'axios'

export function fetchViewingData(id, token) {
    return function(dispatch) {
        dispatch({ type: "FETCH_DATA" })
        let saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
            },
        })

        saxios.get(url + "/api/3d-models/?id=" + id).then((response) => {
            dispatch({ type: "FETCH_DATA_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "FETCH_DATA_REJECTED", payload: error })            
        })
    }
}

export function fetchModelMentions(id, token){
    return function(dispatch) {
        dispatch({ type: "FETCH_MENTIONS" })
        let saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
            },
        })

        saxios.get(url + "/api/posts/?posted_model=" + id).then((response) => {
            dispatch({ type: "FETCH_MENTIONS_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "FETCH_MENTIONS_REJECTED", payload: error })            
        })
    }
}

export function addToCompare(commit) {
    return function(dispatch) {
        dispatch({ type: "ADD_TO_COMPARE", payload: commit })
    }
}

export function removeFromCompare(commit) {
    return function(dispatch) {
        dispatch({ type: "REMOVE_FROM_COMPARE", payload: commit })
    }
}

export function DiffMode(value) {
    return function(dispatch) {
        if(value) {
            dispatch({ type: "ENTER_DIFF_MODE", payload: value  })
        } else {
            dispatch({ type: "EXIT_DIFF_MODE", payload: value  })            
        }
    }
}
