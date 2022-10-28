import { combineReducers } from 'redux'

import auth from './redux/auth'
import application from './redux/application'

import reservation from './redux/reservation'
import car from './redux/car'
import extra from './redux/extra'

const reducer = combineReducers({
    auth,
    application,
    car,
    reservation,
    extra
})

export default reducer