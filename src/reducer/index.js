import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counterReducer from './counter'
import articles from './articles'
import comments from './comments'
import filters from './filters'
import language from './language'

export default combineReducers({
    counter: counterReducer,
    articles, comments, filters, router, language
})