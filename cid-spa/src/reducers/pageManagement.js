const defaultState = {
    currentPage: "",
}

const pageManagement = (state=defaultState, action) => {
    switch (action.type) {
        case "CHANGE_PAGE":
            return {
                ...state,
                currentPage: action.payload
            }
        default: 
            return state
    }
}

export default pageManagement