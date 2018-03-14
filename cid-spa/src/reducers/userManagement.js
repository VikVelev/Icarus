let defaultState = {}

const myStorage = window.localStorage

if(myStorage.getItem("userManagement")){
    defaultState = JSON.parse(myStorage.getItem("userManagement"))
    defaultState = {
        ...defaultState, 
        fetching: false,
        fetchedUser: {},
        fetched: false,
        redirecting: false,
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
        error: {},
    }
}

const userManagement = (state=defaultState, action) => {
    switch (action.type) {
        case 'LOG_IN': case 'FETCH_USER': 
        case 'FETCH_ALL_USERS': case 'REGISTER_USER':
            return {
                ...state,
                fetching: true,
            }
        case 'FETCH_ALL_USERS_FULFILLED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                users: action.payload,
            }
        case 'FETCH_ALL_USERS_REJECTED':
            return {
                ...state,
                fetching: false,
                fetched: false,
                error: action.payload,
            }
        case 'LOG_IN_FULFILLED':
            myStorage.setItem("userManagement", JSON.stringify({
                ...state,
                currentlyLoggedUser: { username: action.payload },
                logged: true,
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
                fetching: false,
                fetched: false,
                error: action.payload
            }
        default: 
            return state
    }
}

export default userManagement