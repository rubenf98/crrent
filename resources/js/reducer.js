import { combineReducers } from 'redux'

import auth from './redux/auth'
import application from './redux/application'
import globalParameter from './redux/globalParameter'

import reservation from './redux/reservation'
import car from './redux/car'
import carCategory from './redux/carCategory'
import extra from './redux/extra'
import promotion from './redux/promotion'
import block from './redux/block'
import blockPeriod from './redux/blockPeriod'
import blockCar from './redux/blockCar'
import price from './redux/price'
import level from './redux/level'

const reducer = combineReducers({
    auth,
    application,
    globalParameter,
    car,
    carCategory,
    reservation,
    extra,
    promotion,
    block,
    blockPeriod,
    blockCar,
    price,
    level
})

export default reducer