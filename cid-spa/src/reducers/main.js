import { combineReducers } from 'redux'
import userManagement from './userManagement.js'
import pageManagement from './pageManagement.js'
//import reducer1, reducer2 here

const cidReducers = combineReducers({
    userManagement,
    pageManagement
    //reducer1,
    //reducer2
})

export default cidReducers