import url from './backendUrl.js'
import axios from 'axios'

export function fetchViewingData(id, token) {
    return function(dispatch) {
        dispatch({ type: "FETCH_DATA" })
        var saxios = axios.create({
            headers: {
                'Authorization': 'Token ' + token,
            },
        })

        saxios.get(url + "/api/3d-models/?id=" + id).then((response) => {
            
            let counterOwners = 0;
            
            let responseRef = response

            for (let i = 0; i < responseRef.data[0].owners.length; i++) {
                saxios.get(url + "/api/user/" + responseRef.data[0].owners[i] + "/").then((response) => {
                    responseRef.data[0].owners[i] = response.data
                    counterOwners++

                    
                    if(counterOwners === responseRef.data[0].owners.length){
                        let responseRefRef = responseRef
                        saxios.get(url + "/api/posts/?posted_model=" + responseRef.data[0].id).then((response) => {
                            responseRefRef.data.mentions = []

                            for (let i = 0; i < response.data.length; i++) {
                                responseRefRef.data.mentions.push(response.data[i])
                            }
                            dispatch({ type: "FETCH_DATA_FULFILLED", payload: responseRefRef.data })
                        })
                    }
                })
            }


        }).catch((error) => {
            dispatch({ type: "FETCH_DATA_REJECTED", payload: error })            
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
