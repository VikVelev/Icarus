// I know this is a reaaaally bad structured file, but I decided that
// it's better to have 1 bad file which I will never touch probably, since all the actions are separated
// than have unnecessary abstractions that will make the use of the profileReducer harder.

let defaultState = {}

//const myStorage = window.localStorage

// if(myStorage.getItem("profileManagement")){
//     defaultState = JSON.parse(myStorage.getItem("profileManagement"))
// } else {
    defaultState = {
        loggedUser: {}, //some kind of a way to identify, maybe store this only from the localstorage
        userData: {},
        models: {},
        posts: {},
        favorites: {},
        contributions: {},
        error: {},
        fetching: false,
        fetched: false,
    }
// }

const profileManagement = (state=defaultState, action) => {
    switch (action.type) {
        case "FETCH_MODELS": case "FETCH_POSTS":
        case "FETCH_CONTRIBUTIONS": case "FETCH_FAVORITES":
        case "ADD_POST": case "DELETE_POST":
        case "ADD_MODEL": case "DELETE_MODEL":
        case "ADD_COMMIT": case "SET_USER_DATA": //do the same thing for all these cases
        case "FETCH_USER_DATA":
            return {
                ...state,
                fetching: true, 
                fetched: false,
            }
        case "FETCH_MODELS_FULFILLED":
            return {
                ...state,
                models: action.payload,
                fetching: false,
                fetched: true,                
            }
        case "FETCH_MODELS_REJECTED":
            return {
                ...state,
                error: action.payload,
                fetching: false,   
                fetched: false, 
            }
        case "FETCH_POSTS_FULFILLED":
            return {
                ...state,
                posts: action.payload,
                fetched: true,                
                fetching: false, 
            }
        case "FETCH_POSTS_REJECTED":
            return {
                ...state,
                error: action.payload,
                fetching: false,  
                fetched: false,
            }
        case "FETCH_CONTRIBUTIONS_FULFILLED":
            return {
                ...state,
                contributions: action.payload,
                fetched: true,                
                fetching: false, 
            }      
        case "FETCH_CONTRIBUTIONS_REJECTED":
            return {
                ...state,
                error: action.payload,
                fetching: false,  
                fetched: false,
            }
        case "FETCH_FAVORITES_FULFILLED":      
            return {
                ...state,
                favorites: action.payload,
                fetched: true,                
                fetching: false, 
            } 
        case "FETCH_FAVORITES_REJECTED":
            return {
                ...state,
                error: action.payload,
                fetching: false,  
                fetched: false,
            }         
        case "FETCH_USER_DATA_FULFILLED":
            return {
                ...state,
                userData: action.payload,
                fetched: true, 
                fetching: false, 
            } 
        case "FETCH_USER_DATA_REJECTED":
            return {
                ...state,
                error: action.payload,
                fetching: false,  
                fetched: false,
            } 
        case "SET_USER_DATA_FULFILLED":
            return {
                ...state,
                userData: action.payload,
                fetched: true, 
                fetching: false, 
            } 
        case "SET_USER_DATA_REJECTED":
            return {
                ...state,
                error: action.payload,
                fetching: false,  
                fetched: false,
            } 
        case "ADD_POST_FULFILLED":                                
            return {
                ...state,
                fetched: true,                
                fetching: false, 
            } 
        case "ADD_POST_REJECTED":
            return {
                ...state,
                error: action.payload,
                fetching: false,  
                fetched: false,
            } 
        case "DELETE_POST_FULFILLED":                                
            return {
                ...state,
                fetched: true,                
                fetching: false, 
            } 
        case "DELETE_POST_REJECTED":
            return {
                ...state,
                error: action.payload,
                fetched: false,
                fetching: false, 
            } 
        case "ADD_MODEL_FULFILLED":               
            return {
                ...state,
                fetched: true,            
                fetching: false, 
            } 
        case "ADD_MODEL_REJECTED":
            return {
                ...state,
                error: action.payload,
                fetching: false,  
                fetched: false,
            } 
        case "DELETE_MODEL_FULFILLED":               
            return {
                ...state,
                fetched: true,                
                fetching: false, 
            } 
        case "DELETE_MODEL_REJECTED":
            return {
                ...state,
                error: action.payload,
                fetching: false,  
                fetched: false,
            } 
        case "ADD_COMMIT_FULFILLED":                       
            return {
                ...state,
                fetched: false,                
                fetching: false, 
            } 
        case "ADD_COMMIT_REJECTED":
            return {
                ...state,
                error: action.payload,
                fetching: false, 
                fetched: false,    
            } 
        default:
            return state;                       
    }
}

export default profileManagement