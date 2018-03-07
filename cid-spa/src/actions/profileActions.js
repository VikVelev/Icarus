import axios from 'axios'

var url = "http://localhost:8000"

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

export function setUserData(id, userData){
    return function(dispatch) {
        dispatch({ type: "SET_USER_DATA" })
        axios.post(url + "/api/user/" + id + "/").then((response) => {
            dispatch({ type: "SET_USER_DATA_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "SET_USER_DATA_REJECTED", payload: error })          
        })
    }
} 