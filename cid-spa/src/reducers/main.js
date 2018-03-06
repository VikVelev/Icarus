import { combineReducers } from 'redux'
import userManagement from './userManagement.js'
import pageManagement from './pageManagement.js'
import homeManagement from './homeManagement.js'
import trendingManagement from './trendingManagement.js'
import profileManagement from './profileManagement.js'
//import reducer1, reducer2 here

const cidReducers = combineReducers({
    userManagement,
    pageManagement,
    homeManagement,
    trendingManagement,
    profileManagement,
    //reducer1,
    //reducer2,
})

export default cidReducers