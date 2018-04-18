import { ADD_COMMENT, LOAD_ARTICLE_COMMENTS, LOAD_COMMENTS_BY_PAGE, START, SUCCESS } from '../constants'
import { Record, OrderedMap } from 'immutable'
import { arrToMap } from './utils'

const CommentRecord = Record({
    id: null,
    text: null,
    user: null
})

const PageRecord = Record({
    loading: false,
    loaded: false,
    comments: [],
})

const ReducerRecord = Record({
    entities: new OrderedMap(),
    pages: new OrderedMap(),
    totalPages: null,
})

export default (state = new ReducerRecord(), action) => {
    const { type, payload, randomId, response, page, limit } = action

    switch (type) {
        case ADD_COMMENT:
            return state.setIn(['entities', randomId], new CommentRecord({
                ...payload.comment,
                id: randomId
            }))

        case LOAD_ARTICLE_COMMENTS + SUCCESS:
            return state.mergeIn(['entities'], arrToMap(response, CommentRecord))

        case LOAD_COMMENTS_BY_PAGE + START:
            return state.setIn(['pages', page], new PageRecord({ loading: true }))

        case LOAD_COMMENTS_BY_PAGE + SUCCESS:
            return state
                .mergeIn(['entities'], arrToMap(response.records, CommentRecord))
                .setIn(['pages', page, 'loading'], false)
                .setIn(['pages', page, 'loaded'], true)
                .setIn(['pages', page, 'comments'], response.records.map(({ id }) => id))
                .set('totalPages', Math.ceil(response.total / limit))

        default:
            return state
    }
}