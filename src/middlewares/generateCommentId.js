import uuidv4 from 'uuid/v4'
import {ADD_COMMENT} from '../constants'

export default () => next => action => {
    if (action.type === ADD_COMMENT) {
        const comment = {
            ...action.payload.comment,
            id: uuidv4()
        }
        return next({ ...action, payload: { ...action.payload, comment } })
    }

    return next(action)
}