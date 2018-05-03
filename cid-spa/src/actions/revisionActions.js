import axios from 'axios'
import url from './backendUrl.js'

export function fetchUserRevisions(id, token){
    return function(dispatch) {
        dispatch({type: "FETCH_REVISIONS"})
        axios.get(url + "/api/user/" + id + "/revisions/",{
            headers: {
                'Authorization': 'Token ' + token
            }
        }).then((response) => {
            dispatch({ type: "FETCH_REVISIONS_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "FETCH_REVISIONS_REJECTED", payload: error })            
        })
    }
}