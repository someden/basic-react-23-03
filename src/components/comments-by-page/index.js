import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CommentList from '../comment-list'
import { commentsByPageSelector, commentPageLoadingSelector, commentPageLoadedSelector } from '../../selectors'
import {loadCommentsByPage} from '../../ac'
import Loader from '../common/loader'

class CommentsByPage extends Component {
    static propTypes = {
        comments: PropTypes.array,
        page: PropTypes.number,
        loading: PropTypes.bool,
        loaded: PropTypes.bool,
        loadCommentsByPage: PropTypes.func
    }

    componentDidMount() {
        if (!this.props.loaded) {
            this.props.loadCommentsByPage(this.props.page)
        }
    }

    render() {
        const { comments = [], loading } = this.props
        if (loading) return <Loader />
        return (
            comments.length
                ? <CommentList comments={comments} />
                : <h3>No comments yet</h3>
        )
    }
}

export default connect((state, ownProps) => ({
    comments: commentsByPageSelector(state, ownProps),
    loading: commentPageLoadingSelector(state, ownProps),
    loaded: commentPageLoadedSelector(state, ownProps),
}), { loadCommentsByPage })(CommentsByPage)