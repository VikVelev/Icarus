let defaultState = {
    model: {},
    comparing: [],
    mentions: [],
    diffMode: false,
    addModelCallback: { 
        called: false,
        query: "" 
    },
    removeModelCallback: { 
        called: false,
        query: "" 
    },
    rendering: false,
    fetching: false,
    fetched: false,
    locked: false,
    viewModelFetched: false,
    forking: false,
    forkData: {},
    forked: false,
    checkingFork: false,
    error: {},
}

const model3DManagement = (state=defaultState, action) => {
    switch(action.type) {
        case "FETCH_DATA":
            return {
                ...state,
                comparing: [],
                rendering: false,
                viewModelFetched: false,              
                diffMode: false,
                fetching: true,
                fetched: false,
                error: {},
            }
        case "FETCH_DATA_FULFILLED":
            return {
                ...state,
                model: action.payload,
                fetching: false,
                viewModelFetched: true,                
                fetched: true,
            }
        case "FETCH_DATA_REJECTED":
            return {
                ...state,
                fetching: false,
                fetched: false,
                viewModelFetched: false,                
                error: action.payload,
            }
        case "FETCH_MENTIONS":
            return {
                ...state,
                fetching: true,
                fetched: false,
            }
        case "FETCH_MENTIONS_FULFILLED":
            return {
                ...state,
                fetching: false,
                fetched: true,
                mentions: action.payload,
            }
        case "FETCH_MENTIONS_REJECTED":
            return {
                ...state,
                fetching: false,
                fetched: false,
                error: action.payload,
            }
        case "ENTER_DIFF_MODE":
            return {
                ...state,
                diffMode: true
            }
        case "EXIT_DIFF_MODE": 
            return {
                ...state,
                comparing: [],
                diffMode: false
            }
        case "ADD_TO_COMPARE":
            let returnState = {
                ...state, 
                addModelCallback: {
                    called: true,
                    query: action.payload,
                }
            }

            returnState.comparing.push(action.payload)

            return returnState
        case "STOP_ADD_TO_COMPARE":
            return {
                ...state,
                addModelCallback: {
                    called: false,
                    query: {}
                },
            }
        case "REMOVE_FROM_COMPARE":
            let newState = {
                ...state,
                removeModelCallback: {
                    called: true,
                    query: action.payload,
                }
            }
            
            newState.comparing.forEach((element) => {
                if (element.mesh === action.payload.mesh) {
                    newState.comparing.splice(newState.comparing.indexOf(element), 1)
                }
            })
            return newState
        case "STOP_REMOVE_FROM_COMPARE":
            return {
                ...state,
                removeModelCallback: {
                    called: false,
                    query: {}
                }
            }
        case "FORKING":
            return {
                ...state,
                checkingFork: true,                
                forking: true,
            }
        case "FORKING_FULFILLED":
            return {
                ...state,
                checkingFork: false,                
                forking: false,
                forkData: action.payload,
                forked: true,
            }
        case "FORKING_REJECTED":
            return {
                ...state,
                checkingFork: false,                
                forking: false,
                error: action.payload,
                forked: false,
            }
        case "IS_FORKED":
            return {
                ...state,
                checkingFork: true,
                forked: false,
            }
        case "IS_FORKED_FULFILLED":
            return {
                ...state,
                checkingFork: false,                
                forked: action.payload.is_forked_by_you,
            }
        case "IS_FORKED_REJECTED":
            return {
                ...state,
                checkingFork: false,                
                error: action.payload,
            }
        case "RENDERING":
            return {
                ...state,
                rendering: true,
            }
        case "STOPPING":
            return {
                ...state,
                rendering: false,
            }
        case "LOCK_UP":
            return {
                ...state,
                locked: true
            }
        case "UNLOCK":
            return {
                ...state,
                locked: false,
            }
        default: 
            return state
    }
}

export default model3DManagement;