import { combineReducers } from 'redux'

import auth from './redux/auth'
import application from './redux/application'

const reducer = combineReducers({
    auth,
    application
})

export default reducer