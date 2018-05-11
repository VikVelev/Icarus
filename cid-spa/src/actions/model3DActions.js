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
            dispatch({ type: "FETCH_DATA_FULFILLED", payload: response.data.results })
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
            dispatch({ type: "FETCH_MENTIONS_FULFILLED", payload: response.data.results })
        }).catch((error) => {
            dispatch({ type: "FETCH_MENTIONS_REJECTED", payload: error })            
        })
    }
}

export function fork(modelId, token) {
    return function(dispatch) {
        dispatch({ type: "FORKING" })
        let saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
            },
        })

        saxios.post(url + "/api/3d-models/fork?model_id=" + modelId).then((response) => {
            dispatch({ type: "FORKING_FULFILLED", payload: response.data })   
        }).catch((error) => {
            dispatch({ type: "FORKING_REJECTED", payload: error })   
        })
    }
}


export function alreadyForked(modelId, token) {
    return function(dispatch) {
        dispatch({ type: "IS_FORKED" })
        let saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
            },
        })

        saxios.get(url + "/api/3d-models/fork?model_id=" + modelId).then((response) => {
            dispatch({ type: "IS_FORKED_FULFILLED", payload: response.data })   
        }).catch((error) => {
            dispatch({ type: "IS_FORKED_REJECTED", payload: error })   
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

export function viewModel(modelId, token) {
    return function(dispatch) {
        let saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
            },
        })

        saxios.patch(url + "/api/3d-models/view?model_id=" + modelId, {
            id: modelId,
            viewcount: 0
        }).then((response) => {
            dispatch({ type: "VIEWED_MODEL", payload: response.data})
        }).catch((error) => {
            dispatch({ type: "VIEWING_MODEL_ERROR", payload: error.data})            
        })
    }
}