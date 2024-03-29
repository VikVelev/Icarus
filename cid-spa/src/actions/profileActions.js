import axios from 'axios'
import url from './backendUrl.js'


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

export function fetchAll3DModels(token){
    return function(dispatch) {
        dispatch({type: "FETCH_ALL_MODELS"})
        axios.get(url + "/api/3d-models/",{
            headers: {
                'Authorization': 'Token ' + token
            }
        }).then((response) => {
            dispatch({ type: "FETCH_ALL_MODELS_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "FETCH_ALL_MODELS_REJECTED", payload: error })            
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
            dispatch({ type: "FETCH_CONTRIBUTIONS_FULFILLED", payload: response.data.results })
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
        let saxios = axios.create({
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
        let saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'multipart/form-data',
            },
        })
        saxios.post(url + "/api/posts/", userData).then((response) => {
            dispatch({ type: "ADD_POST_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "ADD_POST_REJECTED", payload: error.response })          
        })
        
    }
}

export function getModelbyID(id, token){
    return function(dispatch) {
        dispatch({ type: "GET_MODEL_BY_ID" })
        let saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
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
        let saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'multipart/form-data',
            },
        })

        saxios.post(url + "/api/user/" + id + "/3d-models/", modelData).then((response) => {
            
            if (initialCommit) {
                commitData.append("belongs_to_model", response.data.id)
                dispatch(addCommit(id, commitData, token, response.data))
            } else {
                dispatch({ type: "ADD_MODEL_FULFILLED", payload: response.data })
            }

        
        }).catch((error) => {
            dispatch({ type: "ADD_MODEL_REJECTED", payload: error })          
        })
        
    }
}

export function addCommit(id, commitData, token, initData) {
    return function(dispatch) {
        dispatch({ type: "ADD_COMMIT" })
        let saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'multipart/form-data',                
            },
        })

        saxios.post(url + "/api/user/" + id + "/contributions/", commitData).then((response) => {
            
            if (initData !== undefined) {
                dispatch({ type: "ADD_MODEL_FULFILLED", payload: initData })                
            }

            dispatch({ type: "ADD_COMMIT_FULFILLED", payload: response.data })

        }).catch((error) => {
            dispatch({ type: "ADD_COMMIT_REJECTED", payload: error })      
        })
    }
}

export function deleteModel(id, token, deleteId) {
    return function(dispatch) {
        dispatch({ type: "DELETE_MODEL" })
        let saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
            },
        })
        saxios.delete(url + "/api/user/" + id + "/3d-models/?id=" + deleteId).then((response) => {
            dispatch({ type: "DELETE_MODEL_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "DELETE_MODEL_REJECTED", payload: error })          
        })
    }
}

export function editModel(owner, editId, modelData, token) {
    return function(dispatch) {
        dispatch({ type: "EDIT_MODEL" })
        let saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
            },
        })

        saxios.patch(url + "/api/user/" + owner + "/3d-models/?id=" + editId, modelData).then((response) => {
            dispatch({ type: "EDIT_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "EDIT_REJECTED", payload: error })          
        })
    }
}

export function deleteCommit(owner, commitId, token) {
    return function(dispatch) {
        dispatch({ type: "DELETE_COMMIT" })
        let saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
            },
        })
        
        saxios.delete(url + "/api/user/" + owner + "/contributions/?id=" + commitId).then((response) => {
            dispatch({ type: "DELETE_COMMIT_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "DELETE_COMMIT_REJECTED", payload: error })          
        })
    }
}

export function fetchUserPosts(id, token){
    return function(dispatch) {

        dispatch({type: "FETCH_POSTS"})

        let saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
            },
        })

        saxios.get(url + "/api/posts/?posted_by=" + id).then((response) => {
            dispatch({ type: "FETCH_POSTS_FULFILLED", payload: response.data.results })                                 
        }).catch((error) => {
            dispatch({ type: "FETCH_POSTS_REJECTED", payload: error})
        })
    }
}

export function deletePost(deleteId,  token) {
    return function(dispatch) {
        dispatch({ type: "DELETE_POST" })
        let saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
            },
        })

        saxios.delete(url + "/api/posts/" + deleteId).then((response) => {
            dispatch({ type: "DELETE_POST_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "DELETE_POST_REJECTED", payload: error })          
        })
    }
}

export function editPost(postId, postData, token){
    return function(dispatch) {
        let saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
            },
        })
        dispatch({ type: "EDIT" })

        saxios.patch(url + "/api/posts/" + postId, postData).then((response) => {
            dispatch({ type: "EDIT_FULFILLED", payload: response.data })
        }).catch((error) => {
            dispatch({ type: "EDIT_REJECTED", payload: error })
        })
    }
}