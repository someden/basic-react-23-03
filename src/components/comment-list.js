import React, { Component } from 'react'
import Comment from './comment'
import toggle from '../decorators/toggle'

class CommentList extends Component {
    render() {
        const { isOpen, onToggle } = this.props
        return (
            <div>
                <button onClick = {onToggle}>{isOpen ? 'close comments' : 'open comments'}</button>
                {isOpen ? <ul>{this.getComments()}</ul> : null}
            </div>
        )
    }

    getComments() {
        const { comments } = this.props
        return comments.map(comment => (
            <li key = {comment.id}>
                <Comment comment = {comment} />
            </li>
        ))
    }
}

export default toggle(CommentList)