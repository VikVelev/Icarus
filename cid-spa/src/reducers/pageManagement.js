let defaultState = {
    currentPage: "",
    subPage: "",
    canvasRendering: false,
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
                currentPage: action.payload
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
            }
        default: 
            return state
    }
}

export default pageManagement