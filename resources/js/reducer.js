import { combineReducers } from 'redux'

import auth from './redux/auth'
import application from './redux/application'

import reservation from './redux/reservation'
import car from './redux/car'
import extra from './redux/extra'
import promotion from './redux/promotion'
import block from './redux/block'
import blockPeriod from './redux/blockPeriod'
import blockCar from './redux/blockCar'
import price from './redux/price'

const reducer = combineReducers({
    auth,
    application,
    car,
    reservation,
    extra,
    promotion,
    block,
    blockPeriod,
    blockCar,
    price
})

export default reducer