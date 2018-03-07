export function changePages(page){
    return function(dispatch) {
        dispatch({ type: "CHANGE_PAGE", payload: page })
    }
}

export function changeSubpage(page) {
    return function(dispatch) {
        dispatch({ type:"CHANGE_SUB_PAGE", payload: page })
    }
}