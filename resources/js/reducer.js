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
import client from './redux/client'
import agency from './redux/agency'
import comission from './redux/comission'
import localization from './redux/localization'
import insurance from './redux/insurance'

import logRecord from './redux/logRecord'

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
    level,
    client,
    agency,
    comission,
    localization,
    insurance,
    logRecord
})

export default reducer