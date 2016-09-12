import { combineReducers } from 'redux'

import * as nav from './Navigation'
import * as lt from './LeagueTable'

export default combineReducers({...nav, ...lt})
