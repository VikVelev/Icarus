import { combineReducers } from 'redux'
import userManagement from './userManagement.js'
import pageManagement from './pageManagement.js'
import homeManagement from './homeManagement.js'
import trendingManagement from './trendingManagement.js'
import profileManagement from './profileManagement.js'
import model3DManagement from './model3DManagement.js'
import revisionManagement from './revisionManagement.js'
import langManagement from './langManagement.js'
//import reducer1, reducer2 here

const cidReducers = combineReducers({
    userManagement,
    pageManagement,
    homeManagement,
    trendingManagement,
    profileManagement,
    model3DManagement,
    revisionManagement,
    langManagement
})

export default cidReducers