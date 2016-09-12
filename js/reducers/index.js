import { combineReducers } from 'redux'

import * as nav from './Navigation'
import * as fix from './Fixtures'
import * as res from './Results'
import * as lt from './LeagueTable'

export default combineReducers({...nav, ...fix, ...res, ...lt})
