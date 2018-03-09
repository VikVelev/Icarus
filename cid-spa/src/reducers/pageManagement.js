let defaultState = {
    currentPage: "",
    subPage: "",
    canvasRendering: false,
    currentModel: {},
}

//const myStorage = window.localStorage

const pageManagement = (state=defaultState, action) => {
    switch (action.type) {
        case "CHANGE_PAGE":
            return {
                ...state,
                currentPage: action.payload
            }
        case "CHANGE_SUB_PAGE":
            return {
                ...state,
                subPage: action.payload
            }
        case "RENDERING_CANVAS3D":
            return {
                ...state,
                canvasRendering: true,
            }
        case "STOPPING_CANVAS3D":
            return {
                ...state,
                canvasRendering: false,
                //currentModel: {},
            }
        case "GET_MODEL_BY_ID_FULFILLED":
            return {
                ...state,
                currentModel: action.payload,
                fetching: false, 
                fetched: false,    
            }
        case "GET_MODEL_BY_ID_REJECTED":
            return {
                ...state,
                error: action.payload,
                fetching: false, 
                fetched: false,    
            }
        default: 
            return state
    }
}

export default pageManagement