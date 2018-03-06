import axios from "axios"

var url = "http://localhost:8000"

export function fetchAllUsers() {
    return function(dispatch) {
            dispatch({ type: "FETCH_ALL_USERS" })
        axios.get(url + "/api/users/").then((response) => {
            dispatch({type: "FETCH_ALL_USERS_FULFILLED", payload: response.data})
        }).catch((error) => {
            dispatch({type: "FETCH_ALL_USERS_REJECTED", payload: error})
        })
    }
}

export function login(username, password,) {
    return function(dispatch) {
        dispatch({ type: "LOG_IN" })
        axios.post(url + "/api/accounts/login/", {
            username: username,
            password: password
        }).then((response) => {
            let sendResponse = {
                ...response.data,
                username: username,
            }
            dispatch({ type: "LOG_IN_FULFILLED", payload: sendResponse })
        }).catch((error) => {
            dispatch({ type: "LOG_IN_REJECTED", payload: error.response.data })
        })
    }
}

export function logout() {
    return function(dispatch) {
        dispatch({ type: "LOG_OUT" })
    }
}

export function register(username, email, password, password2) {
    return function(dispatch) {
        dispatch({ type: "REGISTER_USER" })
        axios.post(url + "/api/accounts/register/", {
            username: username,
            email: email,
            password: password,
            password_confirm: password2
        }).then((response) => {
            dispatch({ type: "REGISTER_USER_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "REGISTER_USER_REJECTED", payload: error.response })
        })
    }

}