import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CSSTransition from 'react-addons-css-transition-group'
import {connect} from 'react-redux'
import CommentList from '../comment-list'
import CommentForm from '../comment-form'
import Loader from '../common/loader'
import toggleOpen from '../../decorators/toggleOpen'
import {loadArticleComments} from '../../ac'
import './style.css'

class CommentsByArticle extends Component {
    static propTypes = {
        article: PropTypes.object.isRequired,
        //from toggleOpen decorator
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    }

    componentWillReceiveProps({ isOpen, article, loadArticleComments }) {
        if (!this.props.isOpen && isOpen && !article.commentsLoading && !article.commentsLoaded) {
            loadArticleComments(article.id)
        }
    }

    render() {
        const {isOpen, toggleOpen} = this.props
        const text = isOpen ? 'hide comments' : 'show comments'
        return (
            <div>
                <button onClick={toggleOpen} className="test__comment-list--btn">{text}</button>
                <CSSTransition
                    transitionName="comments"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {this.getBody()}
                </CSSTransition>
            </div>
        )
    }

    getBody() {
        const {article: { comments, id, commentsLoading, commentsLoaded }, isOpen} = this.props
        if (!isOpen) return null
        if (commentsLoading) return <Loader />
        if (!commentsLoaded) return null

        return (
            <div className="test__comment-list--body">
                {
                    comments.length
                        ? <CommentList comments={comments} />
                        : <h3 className="test__comment-list--empty">No comments yet</h3>
                }
                <CommentForm articleId = {id} />
            </div>
        )
    }
}


export default connect(null, { loadArticleComments })(toggleOpen(CommentsByArticle))