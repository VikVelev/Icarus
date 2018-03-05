

const defaultState = {

}

const userManagement = (state=defaultState, action) => {
    switch (action.type) {
        case 'FETCH_ALL_USERS':
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
        default: 
            return state
    }
}

export default userManagement