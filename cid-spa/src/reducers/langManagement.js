let defaultState = {
    lang: "en"
}

const myStorage = window.localStorage

if (myStorage.getItem("lang")) {
    defaultState = JSON.parse(myStorage.getItem("lang"))
}

const langManagement = (state=defaultState, action) => {
    switch(action.type) {
        case "CHANGE_LANG" :
            myStorage.setItem('lang', JSON.stringify({ lang: action.payload }))
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