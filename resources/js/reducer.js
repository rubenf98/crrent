import { combineReducers } from 'redux'

import auth from './redux/auth'
import application from './redux/application'

import car from './redux/car'

const reducer = combineReducers({
    auth,
    application,
    car
})

export default reducer