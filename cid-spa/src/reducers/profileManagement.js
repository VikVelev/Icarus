let defaultState = {}

const myStorage = window.localStorage

// if(myStorage.getItem("profileManagement")){
//     defaultState = JSON.parse(myStorage.getItem("profileManagement"))
// } else {
    defaultState = {
        loggedUser: {}, //some kind of a way to identify
        userData: {},
        models: {},
        posts: {},
        favorites: {},
        contributions: {},
        error: {},
        fetching: false,
        fetched: true,
    }
// }

const profileManagement = (state=defaultState, action) => {
    switch (action.type) {
        case "FETCH_MODELS": case "FETCH_POSTS":
        case "FETCH_CONTRIBUTIONS": case "FETCH_FAVORITES":
        case "SET_DESCRIPTION": case "SET_PROFILE_PIC": 
        case "SET_FIRST_NAME": case "SET_LAST_NAME":
        case "SET_EMAIL": case "SET_NEW_PASSWORD":
        case "ADD_POST": case "DELETE_POST":
        case "ADD_MODEL": case "DELETE_MODEL":
        case "ADD_COMMIT":
            return {
                ...state,
                fetching: true
            }              
        case "FETCH_MODELS_FULFILLED":
        case "FETCH_MODELS_REJECTED":
        case "FETCH_POSTS_FULFILLED":
        case "FETCH_POSTS_REJECTED":
        case "FETCH_CONTRIBUTIONS_FULFILLED":        
        case "FETCH_CONTRIBUTIONS_REJECTED":
        case "FETCH_FAVORITES_FULFILLED":        
        case "FETCH_FAVORITES_REJECTED":
        case "SET_DESCRIPTION_FULFILLED":                         
        case "SET_DESCRIPTION_REJECTED":
        case "SET_PROFILE_PIC_FULFILLED":
        case "SET_PROFILE_PIC_REJECTED":
        case "SET_FIRST_NAME_FULFILLED":        
        case "SET_FIRST_NAME_REJCETED":
        case "SET_LAST_NAME_FULFILLED":                
        case "SET_LAST_NAME_REJECTED":
        case "SET_EMAIL_FULFILLED":                        
        case "SET_EMAIL_REJECTED":
        case "SET_NEW_PASSWORD_FULFILLED":                       
        case "SET_NEW_PASSWORD_FULFILLED":
        case "ADD_POST_FULFILLED":                                
        case "ADD_POST_REJECTED":
        case "DELETE_POST_FULFILLED":                                
        case "DELETE_POST_REJECTED":
        case "ADD_MODEL_FULFILLED":               
        case "ADD_MODEL_REJECTED":
        case "DELETE_MODEL_FULFILLED":               
        case "DELETE_MODEL_REJECTED":
        case "ADD_COMMIT_FULFILLED":                       
        case "ADD_COMMIT_REJECTED":
        default:
            return state;                       
    }
}

export default profileManagement