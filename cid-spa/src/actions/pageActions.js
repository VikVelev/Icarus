export function changePages(page){
    return function(dispatch) {
        dispatch({ type: "CHANGE_PAGE", payload: page })
    }
}
