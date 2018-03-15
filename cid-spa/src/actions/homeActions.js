import axios from 'axios'
import url from './backendUrl.js'
import { getUserByID } from './getById.js'

export function fetchPersonalizedPosts(token){
    return function(dispatch) {
        dispatch({type: "FETCH_PERSONALIZED_POSTS"})
        axios.get(url + "/api/posts/", {
            headers: {
                'Authorization': 'Token ' + token,
            }
        }).then((response) => {
            let arrayRes = response.data;
            let counter = 0;
            let counter2 = 0;
            
            // TODO: Fix this giant bullshit in the backend

            ///#################################################
            arrayRes.forEach(element => {
                axios.get(url + "/api/users?id=" + element.posted_by , {
                    headers: {
                        'Authorization': 'Token ' + token,
                    }
                }).then((response) => {
                    element.posted_by = response.data[0].username
                    counter++;
                    
                    if(counter === arrayRes.length && counter2 === arrayRes.length) {
                        dispatch({ type: "FETCH_PERSONALIZED_POSTS_FULFILLED", payload: arrayRes })
                        counter++       
                    }
                })
            })

            arrayRes.forEach(element => {
                axios.get(url + "/api/3d-models?id=" + element.content , {
                    headers: {
                        'Authorization': 'Token ' + token,
                    }
                }).then((response) => {
                    element.content = response.data[0].commits[response.data[0].commits.length - 1].new_version
                    counter2++;
                    
                    if(counter2 === arrayRes.length && counter === arrayRes.length ) {
                        dispatch({ type: "FETCH_PERSONALIZED_POSTS_FULFILLED", payload: arrayRes })
                        counter++                                   
                    }
                })
            })
            ///#################################################            
            
        }).catch((error) => {
            dispatch({ type: "FETCH_PERSONALIZED_POSTS_REJECTED", payload: error })            
        })
    }
}