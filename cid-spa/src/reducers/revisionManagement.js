let defaultState = {
    revisions: [],
    error: {},
    approving: false,
    rejecting: false,
    fetching: false,
    fetched: false,
    modified: false,
}

const revisionManagement = (state=defaultState, action) => {
    switch (action.type) {
        case "FETCH_REVISIONS":
            return {
                ...state,
                fetched: false, 
                fetching: true
            }
        case "FETCH_REVISIONS_FULFILLED":
            return {
                ...state,
                revisions: action.payload,
                fetching: false,
                fetched: true,
            }
        case "FETCH_REVISIONS_REJECTED":
            return {
                ...state,
                error: action.payload,
                fetching: false,
                fetched: false,
            }
        case "APPROVE_REVISION":
            return {
                ...state,
                approving: true,
            }
        case "APPROVE_REVISION_FULFILLED":
            return {
                ...state,
                approving: false,
                modified: true,
            }
        case "APPROVE_REVISION_REJECTED":
            return {
                ...state,
                approving: false,
                error: action.payload,
                modified: false,
            }
        case "REJECT_REVISION":
            return {
                ...state,
                rejecting: true,
            }
        case "REJECT_REVISION_FULFILLED":
            return {
                ...state,
                rejecting: false,
                modified: true,
            }
        case "REJECT_REVISION_REJECTED":
            return {
                ...state,
                rejecting: false,
                error: action.payload,
                modified: false,
            }
        default:
            return state
    }
}

export default revisionManagement