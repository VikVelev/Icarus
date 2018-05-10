import axios from 'axios'
import url from './backendUrl.js'

export function fetchMyRevisions(token) {
    return function(dispatch) {
        dispatch({type: "FETCH_POSTED_REVISIONS"})
        axios.get(url + "/api/user/revisions/",{
            headers: {
                'Authorization': 'Token ' + token
            }
        }).then((response) => {
            dispatch({ type: "FETCH_POSTED_REVISIONS_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "FETCH_POSTED_REVISIONS_REJECTED", payload: error })            
        })

    }
}

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

export function approveRevision(id, revisionId, token) {
    return function(dispatch) {
        dispatch({type: "APPROVE_REVISION"})
        let saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
            },
        })

        saxios.patch(url + "/api/user/" + id + "/revisions/?rev_id=" + revisionId + "&deny=0",{ 
            "id": revisionId
        }).then((response) => {
            dispatch({ type: "APPROVE_REVISION_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "APPROVE_REVISION_REJECTED", payload: error })            
        })
    }
}


export function rejectRevision(id, revisionId, token) {
    return function(dispatch) {
        dispatch({type: "REJECT_REVISION"})
        let saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
            },
        })

        saxios.patch(url + "/api/user/" + id + "/revisions/?rev_id=" + revisionId + "&deny=1",{ 
            "id": revisionId
        }).then((response) => {
            dispatch({ type: "REJECT_REVISION_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "REJECT_REVISION_REJECTED", payload: error })            
        })
    }
}