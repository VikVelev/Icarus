import axios from 'axios'
import url from './backendUrl.js'
import { getUserByID } from './getById.js'

export function fetchTrendingPosts(token){
    return function(dispatch) {
        dispatch({type: "FETCH_TRENDING_POSTS"})

        let saxios = axios.create(axios.create({
            headers: {
                'Authorization': 'Token ' + token,
            }
        }))                   
        // TODO: Fix this giant bullshit in the backend

        ///#################################################

        saxios.get(url + "/api/posts/").then((response) => {
            
            let arrayRes = response.data;
            let counterPostedBy = 0;
            let counterContent = 0;
            
            arrayRes.forEach(element => {
                saxios.get(url + "/api/users?id=" + element.posted_by).then((response) => {
                    
                    element.posted_by = response.data[0].username
                    counterPostedBy++;
                    
                    if(counterPostedBy === arrayRes.length && counterContent === arrayRes.length) {
                        dispatch({ type: "FETCH_TRENDING_POSTS_FULFILLED", payload: arrayRes })   
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
                    counterContent++;
                    
                    if(counterContent === arrayRes.length && counterPostedBy === arrayRes.length ) {
                        dispatch({ type: "FETCH_TRENDING_POSTS_FULFILLED", payload: arrayRes })                                 
                    }
                })
            })
            ///#################################################            
            
        }).catch((error) => {
            dispatch({ type: "FETCH_TRENDING_POSTS_REJECTED", payload: error })            
        })
    }
}