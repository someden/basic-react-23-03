import { combineReducers } from 'redux'
import counterReducer from './counter'
import filters from './filters'
import articles from './articles'

export default combineReducers({
    counter: counterReducer,
    filters,
    articles
})