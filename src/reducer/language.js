import { SELECT_LANGUAGE } from '../constants'

export default (state = 'en-US', action) => {
    switch (action.type) {
        case SELECT_LANGUAGE:
            return action.payload.language

        default:
            return state
    }
}