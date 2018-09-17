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

export function fetchDemoData(){
    return function(dispatch){
        dispatch({ type: "FETCH_DATA" })

        let dummyData = [{
            commits: [{
                belongs_to_model: 1,
                committed_by: {
                    email: "yaskata@abv.bg",
                    first_name: "",
                    id: 1,
                    last_name: "",
                    profile: { 
                        country: "", 
                        birth_date: "2018-09-06", 
                        profile_picture: "http://172.24.0.2:9000/media/16195797_550978245107579_768123003936312725_n.jpg", 
                        description: "", 
                        software: ""
                    },
                    username: "VikVelev",
                },
                date: "2018-09-15T01:57:46.477429+03:00",
                details: "Uploaded model5",
                id: 3,
                new_textures: "http://172.24.0.2:9000/media/SpaceShipModeling2.mtl",
                new_version: "http://172.24.0.2:9000/media/SpaceShipModeling2.obj",
                title: "Initial Commit",
                version_number: 3,
            }],
            date_uploaded: "2018-09-14T23:43:16.699713+03:00",
            description: "A High polygon spaceship for a client, I am happy about how it turned out!",
            favorited_by: [],
            fork_of: null,
            forkcount: 0,
            id: 123123123,
            is_fork: false,
            nth_commit: 0,
            owners: [{
                id: 1,
                username: "Admin",
                email: "admin@admin.com",
                first_name: "",
                last_name: ""
            }],
            title: "Nice",
            viewcount: 29
        }]

        dispatch({ type: "FETCH_DATA_FULFILLED", payload: dummyData })
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