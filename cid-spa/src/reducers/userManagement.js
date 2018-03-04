const defaultState = {

}

const userManagement = (state=defaultState, action) => {
    switch (action.type) {
        case 'FETCH_USERS':
            //do something
            return state //something
        default: 
            return state
    }
}

export default userManagement