let defaultState = {
    model: {},
    comparing: [],
    diffMode: false,
    addModelCallback: { 
        called: false,
        query: "" 
    },
    removeModelCallback: { 
        called: false,
        query: "" 
    },
    fetching: false,
    fetched: false,
    error: {},
}

const model3DManagement = (state=defaultState, action) => {
    switch(action.type) {
        case "FETCH_DATA":
            return {
                ...state,
                comparing: [],
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
                fetched: true,
            }
        case "FETCH_DATA_REJECTED":
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
                    console.log(element)
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
        default: 
            return state
    }
}

export default model3DManagement;