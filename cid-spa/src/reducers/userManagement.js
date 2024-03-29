let defaultState = {}

const myStorage = window.localStorage

if(myStorage.getItem("userManagement") !== "undefined"){
    defaultState = JSON.parse(myStorage.getItem("userManagement"))
    defaultState = {
        ...defaultState, 
        fetching: false,
        fetchedUser: {},
        fetched: false,
        redirecting: false,
        allUsers: {},
        error: {},
    }
} else {
    defaultState = {
        currentlyLoggedUser: {},
        logged: false,
        fetching: false,
        fetched: false,
        fetchedUser: {},
        redirecting: false,
        allUsers: {},        
        error: {},
    }
}

const userManagement = (state=defaultState, action) => {
    switch (action.type) {
        case 'LOG_IN': case 'FETCH_USER': 
        case 'FETCH_ALL_USERS': case 'REGISTER_USER':
            return {
                ...state,
                allUsers: {},
                fetched: false,
                error: {},
                fetching: true,
            }
        case 'FETCH_ALL_USERS_FULFILLED':
            return {
                ...state,
                fetching: false,
                redirecting: false,                                
                fetched: true,
                allUsers: action.payload,
            }
        case 'FETCH_ALL_USERS_REJECTED':
            return {
                ...state,
                fetching: false,
                redirecting: false,                                                
                fetched: false,
                error: action.payload,
            }
        case 'LOG_IN_FULFILLED':
            myStorage.setItem("userManagement", JSON.stringify({
                ...state,
                currentlyLoggedUser: { username: action.payload },
                logged: true,
                redirecting: false,                
                fetching: false,
                fetched: true,
            }))
        
            return {
                ...state,
                currentlyLoggedUser: { username: action.payload },
                logged: true,
                fetching: false,
                fetched: true,
            }
        case 'LOG_IN_REJECTED': 
            return {
                ...state,
                logged: false,
                fetching: false,
                fetched: false,
                error: action.payload,
            }
        case 'LOG_OUT':
            window.localStorage.setItem("userManagement", 
            JSON.stringify({
                ...state,
                logged: false,
                currentlyLoggedUser: {},
            }))
            return {
                ...state,
                redirecting: false,                
                logged: false,
                currentlyLoggedUser: {},
                token: "",
            }
        case 'REGISTER_USER_FULFILLED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                redirecting: true,
            }
        case 'REGISTER_USER_REJECTED':
            return {
                ...state,
                logged: false,
                redirecting: false,                
                fetching: false,
                fetched: false,
                error: action.payload
            }
        default: 
            return state
    }
}

export default userManagement