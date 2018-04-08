import { combineReducers } from 'redux'
import { SELECT_ARTICLES, SELECT_DATE_RANGE } from '../constants'

const selectedArticles = (selectedArticles = [], action) => {
    const { type, payload } = action

    switch (type) {
        case SELECT_ARTICLES:
            return payload.ids

        default:
            return selectedArticles
    }
}

const dateRange = (dateRange = { from: null, to: null }, action) => {
    const { type, payload } = action

    switch (type) {
        case SELECT_DATE_RANGE:
            return payload.dateRange

        default:
            return dateRange
    }
}

export default combineReducers({
    selectedArticles,
    dateRange
})