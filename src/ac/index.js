import { INCREMENT, DELETE_ARTICLE, SELECT_ARTICLES, SELECT_DATE_RANGE } from '../constants'

export function increment() {
    return {
        type: INCREMENT
    }
}

export function deleteArticle(id) {
    return {
        type: DELETE_ARTICLE,
        payload: { id }
    }
}

export function selectArticles(ids) {
    return {
        type: SELECT_ARTICLES,
        payload: { ids }
    }
}

export function selectDateRange(dateRange) {
    return {
        type: SELECT_DATE_RANGE,
        payload: { dateRange }
    }
}