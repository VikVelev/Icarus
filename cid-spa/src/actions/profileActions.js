import axios from 'axios'

var url = "http://cid-platform.myddns.me:8000"

//TODO Find a smarter way to get Headers in there.


export function fetch3DModels(id, token){
    return function(dispatch) {
        dispatch({type: "FETCH_MODELS"})
        axios.get(url + "/api/user/" + id + "/3d-models/",{
            headers: {
                'Authorization': 'Token ' + token
            }
        }).then((response) => {
            dispatch({ type: "FETCH_MODELS_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "FETCH_MODELS_REJECTED", payload: error })            
        })
    }
}

export function fetchContributions(id, token){
    return function(dispatch) {
        dispatch({type: "FETCH_CONTRIBUTIONS"})
        axios.get(url + "/api/user/" + id + "/contributions/",{
            headers: {
                'Authorization': 'Token ' + token
            }
        }).then((response) => {
            dispatch({ type: "FETCH_CONTRIBUTIONS_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "FETCH_CONTRIBUTIONS_REJECTED", payload: error })            
        })
    }
}

export function fetchFavorites(id, token){
    // FIXME:
    // This gets the favorites from the user, instead of another place not sure 
    // how consistent is this.
    return function(dispatch) {
        dispatch({type: "FETCH_FAVORITES"})
        axios.get(url + "/api/user/" + id + "/", {
            headers: {
                'Authorization': 'Token ' + token
            }
        }).then((response) => {
            dispatch({ type: "FETCH_FAVORITES_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "FETCH_FAVORITES_REJECTED", payload: error })            
        })
    }
}

export function fetchUserData(id, token) {
    return function(dispatch) {
        dispatch({type: "FETCH_USER_DATA"})
        axios.get(url + "/api/user/" + id + "/", {
            headers: {
                'Authorization': 'Token ' + token
            }
        }).then((response) => {
            dispatch({ type: "FETCH_USER_DATA_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "FETCH_USER_DATA_REJECTED", payload: error })          
        })
    }
}

//FIXME COMPLETE BULSHIT FIX PLS
export function setUserData(id, userData, token){
    return function(dispatch) {
        dispatch({ type: "SET_USER_DATA" })
        var saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'multipart/form-data'
            },
        })
        saxios.patch(url + "/api/user/" + id + "/", userData).then((response) => {
            dispatch({ type: "SET_USER_DATA_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "SET_USER_DATA_REJECTED", payload: error.response })          
        })
    }
} 

export function addPost(id, userData, token) {
    return function(dispatch) {
        dispatch({ type: "ADD_POST" })
        var saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'multipart/form-data',
            },
        })
        saxios.patch(url + "/api/user/" + id + "/", userData).then((response) => {
            dispatch({ type: "ADD_POST_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "ADD_POST_REJECTED", payload: error.response })          
        })
        
    }
}

export function getModelbyID(id, token){
    return function(dispatch) {
        dispatch({ type: "GET_MODEL_BY_ID" })
        var saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'multipart/form-data',
            },
        })
        saxios.get(url + "/api/3d-models/?id=" + id).then((response) => {
            dispatch({ type: "GET_MODEL_BY_ID_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "GET_MODEL_BY_ID_REJECTED", payload: error })          
        })
        
    }
}

export function add3DModel(id, token, modelData, initialCommit, commitData) {
    return function(dispatch) {
        dispatch({ type: "ADD_MODEL" })
        var saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'multipart/form-data',
            },
        })
        saxios.post(url + "/api/user/" + id + "/3d-models/", modelData).then((response) => {
            dispatch({ type: "ADD_MODEL_FULFILLED", payload: response.data })
            if (initialCommit) {
                commitData.append("belongs_to_model", response.data.id)
                dispatch(addCommit(id, commitData, token))
            }
        }).catch((error) => {
            dispatch({ type: "ADD_MODEL_REJECTED", payload: error })          
        })
        
    }
}

export function addCommit(id, commitData, token) {
    return function(dispatch) {
        dispatch({ type: "ADD_COMMIT" })
        var saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'multipart/form-data',
            },
        })
        saxios.post(url + "/api/user/" + id + "/contributions/", commitData).then((response) => {
            dispatch({ type: "ADD_COMMIT_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "ADD_COMMIT_REJECTED", payload: error })          
        })
    }
}