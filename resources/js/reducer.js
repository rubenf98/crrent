import { combineReducers } from 'redux'

import auth from './redux/auth'
import application from './redux/application'

import reservation from './redux/reservation'
import car from './redux/car'
import extra from './redux/extra'
import promotion from './redux/promotion'
import block from './redux/block'
import blockPeriod from './redux/blockPeriod'

const reducer = combineReducers({
    auth,
    application,
    car,
    reservation,
    extra,
    promotion,
    block,
    blockPeriod
})

export default reducer