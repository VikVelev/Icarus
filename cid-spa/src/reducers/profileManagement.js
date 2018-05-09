// I know this is a reaaaally bad structured file, but I decided that
// it's better to have 1 bad file which I will never touch probably, since all the actions are separated
// than have unnecessary abstractions that will make the use of the profileReducer harder.

let defaultState = {}

defaultState = {
    userData: {},
    models: {},
    allModels: {},
    posts: {},
    favorites: {},
    contributions: {},
    error: {},
    commitError: {},
    postFetched: false,
    commitFetched: false,
    deletedModel: false,
    deletedPost: false,
    contributionsFetched: false,
    modelFetched: false,
    userDataSet: false,
    fetching: false,
    fetched: false,
    editing: true,
    edited: false,
}

const profileManagement = (state=defaultState, action) => {
    switch (action.type) {
        case "FETCH_MODELS": case "FETCH_POSTS":
        case "ADD_POST": case "DELETE_POST":
        case "ADD_MODEL": case "DELETE_MODEL":
        case "ADD_COMMIT": case "FETCH_USER_DATA":
        case "FETCH_FAVORITES": case "FETCH_ALL_MODELS":
        case "EDIT_POST":// DO the same thing for all these cases
            return {
                ...state,
                error: {},
                postFetched: false,
                userDataSet: false,
                commitFetched: false,
                deletedModel: false,
                edited: false,
                commitError: {},
                contributionsFetched: false,
                modelFetched: false,
                fetching: true,
                fetched: false,
            }
        case "FETCH_CONTRIBUTIONS":
            return {
                ...state,
                contributionsFetched: false,
                fetching:true,
                fetched:false,
            }

        case "SET_USER_DATA":
            return {
                ...state,
                fetching:true,
                fetched: false,
                userDataSet: false,
            }
        case "FETCH_MODELS_FULFILLED":
            return {
                ...state,
                models: action.payload,
                fetching: false,
                fetched: true,                
            }
        case "FETCH_ALL_MODELS_FULFILLED":
            return {
                ...state,
                allModels: action.payload,
                fetching: false,
                fetched: true,                
            }
        case "FETCH_ALL_MODELS_REJECTED":
            return {
                ...state,
                error: action.payload,
                fetching: false,   
                fetched: false, 
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
                contributionsFetched: true,
                fetched: true,                
                fetching: false, 
            }      
        case "FETCH_CONTRIBUTIONS_REJECTED":
            return {
                ...state,
                error: action.payload,
                contributionsFetched: false,                
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
                userDataSet: true,  
                fetching: false, 
            } 
        case "SET_USER_DATA_REJECTED":
            return {
                ...state,
                error: action.payload,
                postFetched: false,
                userDataSet: false,                
                fetching: false,  
                fetched: false,
            } 
        case "ADD_POST_FULFILLED":                             
            return {
                ...state,
                postFetched: true,
                fetched: true,                
                fetching: false, 
            } 
        case "ADD_POST_REJECTED":
            return {
                ...state,
                error: action.payload,
                postFetched: false,
                fetching: false,  
                fetched: false,
            } 
        case "EDIT_POST_FULFILLED":
            return {
                ...state,
                edited: true,
                fetched: true,
                fetching: false,
            }
        case "EDIT_POST_REJECTED":
            return {
                ...state,
                edited: false,
                error: action.payload,
                fetched: false,
                fetching: false,
            }
        case "EDIT_REFRESH":
            return {
                ...state,
                edited: false,
                editing: false,
            }
        case "DELETE_POST_FULFILLED":                                
            return {
                ...state,
                fetched: true,    
                deletedPost: true,                            
                fetching: false, 
            } 
        case "DELETE_POST_REJECTED":
            return {
                ...state,
                error: action.payload,
                deletedPost: false,
                fetched: false,
                fetching: false, 
            } 
        case "ADD_MODEL_FULFILLED":               
            return {
                ...state,
                modelFetched: true,
                fetched: false,    
                fetching: false, 
            } 
        case "ADD_MODEL_REJECTED":
            return {
                ...state,
                error: action.payload,
                modelFetched: false, 
                fetching: false,
                fetched: false,
            } 
        case "DELETE_MODEL_FULFILLED":               
            return {
                ...state,
                deletedModel: true,
                fetched: true,                
                fetching: false, 
            }
        case "DELETE_REFRESH":
            return {
                ...state,
                deletedModel: false,
                deletedPost: false,
                deletedCommit: false,
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
                commitFetched: true,               
                fetching: false, 
            } 
        case "ADD_COMMIT_REJECTED":
            return {
                ...state,
                commitError: action.payload,
                commitFetched: false,                
                fetching: false, 
                fetched: false,    
            }
        default:
            return state;                       
    }
}

export default profileManagement