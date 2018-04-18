import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Comment from '../comment'

class CommentList extends Component {
    static propTypes = {
        comments: PropTypes.array
    }

    render() {
        const { comments = [] } = this.props
        return comments.length ? this.getComments() : null
    }

    getComments() {
        return (
            <ul>
                {
                    this.props.comments.map(id =>
                        <li key = {id} className = "test__comment-list--item">
                            <Comment id = {id}/>
                        </li>)
                }
            </ul>
        )
    }
}

export default CommentList