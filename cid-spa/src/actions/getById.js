import axios from 'axios'
import url from './backendUrl.js'

export function getUserByID(id, token){
    return function(dispatch) {
        dispatch({ type: "GET_USER_BY_ID" })
        
        let saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'multipart/form-data',
            },
        })

        saxios.get(url + "/api/users?id=" + id).then((response) => {
            dispatch({ type: "GET_USER_BY_ID_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "GET_USER_BY_ID_REJECTED", payload: error })          
        })
        
    }
}