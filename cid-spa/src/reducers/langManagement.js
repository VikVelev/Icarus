let defaultState = {
    lang: "bg"
}

const langManagement = (state=defaultState, action) => {
    switch(action.type) {
        case "CHANGE_LANG" :
            return {
                ...state,
                lang: action.payload,
            }
        default: 
            return {
                ...state
            }
    }
}

export default langManagement