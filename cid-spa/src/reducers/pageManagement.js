let defaultState = {
    currentPage: "",
    subPage: "",
    currentModel: {},
    safeLimit: 3, //TOOD Implement a way to detect GPU and scale this accordingly
    renderingModelsId: [],
    stopSignal: false,
    lastRemoved: {},
}

//const myStorage = window.localStorage

const pageManagement = (state=defaultState, action) => {
    switch (action.type) {
        case "CHANGE_PAGE":
            return {
                ...state,
                currentPage: action.payload
            }
        case "START_CANVAS":
            let ma_id = action.payload.id
            state.renderingModelsId.push(ma_id)
            return {
                ...state,               
            }
        case "STOP_CANVAS":
            let mr_id = action.payload.id
            state.renderingModelsId.splice(state.renderingModelsId.indexOf(mr_id), 1)

            return {
                ...state,            
            }
        case "STOP_SIGNAL": 
            return {
                ...state,
                lastRemoved: action.payload,
                stopSignal: true,
            }
        case "CHANGE_SUB_PAGE":
            return {
                ...state,
                subPage: action.payload
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