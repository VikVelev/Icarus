import axios from "axios"

export function fetchAllUsers() {
    return function(dispatch) {
            dispatch({ type: "FETCH_ALL_USERS" })
        axios.get("http://localhost:8000/api/users/").then((response) => {
            dispatch({type: "FETCH_ALL_USERS_FULFILLED", payload: response.data})
        }).catch((error) => {
            dispatch({type: "FETCH_ALL_USERS_REJECTED", payload: error})
        })
    }
}