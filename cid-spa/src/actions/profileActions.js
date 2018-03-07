import axios from 'axios'

var url = "http://localhost:8000"

export function fetch3DModels(id){
    return function(dispatch) {
        dispatch({type: "FETCH_MODELS"})
        axios.get(url + "/api/user/" + id + "/3d-models/").then((response) => {
            dispatch({ type: "FETCH_MODELS_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "FETCH_MODELS_REJECTED", payload: error })            
        })
    }
}

export function fetchContributions(id){
    return function(dispatch) {
        dispatch({type: "FETCH_CONTRIBUTIONS"})
        axios.get(url + "/api/user/" + id + "/contributions/").then((response) => {
            dispatch({ type: "FETCH_CONTRIBUTIONS_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "FETCH_CONTRIBUTIONS_REJECTED", payload: error })            
        })
    }
}

export function fetchFavorites(id){
    // FIXME:
    // This gets the favorites from the user, instead of another place not sure 
    // how consistent is this.
    return function(dispatch) {
        dispatch({type: "FETCH_FAVORITES"})
        axios.get(url + "/api/user/" + id + "/").then((response) => {
            dispatch({ type: "FETCH_FAVORITES_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "FETCH_FAVORITES_REJECTED", payload: error })            
        })
    }
}

export function fetchUserData(id) {
    return function(dispatch) {
        dispatch({type: "FETCH_USER_DATA"})
        axios.get(url + "/api/user/" + id + "/").then((response) => {
            dispatch({ type: "FETCH_USER_DATA_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "FETCH_USER_DATA_REJECTED", payload: error })          
        })
    }
}