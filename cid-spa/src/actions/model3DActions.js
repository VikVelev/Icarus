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
            
            let counter = 0;
            let responseRef = response
            console.log(responseRef)
            for (let i = 0; i < responseRef.data[0].owners.length; i++) {
                saxios.get(url + "/api/user/" + responseRef.data[0].owners[i] + "/").then((response) => {
                    responseRef.data[0].owners[i] = response.data        
                    counter++

                    if(counter === responseRef.data[0].owners.length){
                        dispatch({ type: "FETCH_DATA_FULFILLED", payload: responseRef.data })
                    }
                })
            }


        }).catch((error) => {
            dispatch({ type: "FETCH_DATA_REJECTED", payload: error })            
        })
    }
}