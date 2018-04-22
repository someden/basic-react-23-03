import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createCommentSelector, languageSelector } from '../selectors'

function Comment({comment}, {l10n}) {
    return (
        <div>
            {comment.text} <b>{l10n.by} {comment.user}</b>
        </div>
    )
}

Comment.propTypes = {
    id: PropTypes.string.isRequired,
    //from connect
    comment: PropTypes.shape({
        text: PropTypes.string.isRequired,
        user: PropTypes.string
    }).isRequired
}

Comment.contextTypes = {
    l10n: PropTypes.object
}

const createMapStateToProps = () => {
    const commentSelector = createCommentSelector()

    return (state, ownProps) => ({
        language: languageSelector(state),
        comment: commentSelector(state, ownProps)
    })
}

export default connect(createMapStateToProps)(Comment)