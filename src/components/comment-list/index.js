import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CSSTransition from 'react-addons-css-transition-group'
import {connect} from 'react-redux'
import Comment from '../comment'
import CommentForm from '../comment-form'
import Loader from '../common/loader'
import toggleOpen from '../../decorators/toggleOpen'
import {loadArticleComments} from '../../ac'
import { languageSelector } from '../../selectors'
import './style.css'

class CommentList extends Component {
    static propTypes = {
        article: PropTypes.object.isRequired,
        //from toggleOpen decorator
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    }

    static contextTypes = {
        username: PropTypes.string,
        l10n: PropTypes.object
    }

    componentWillReceiveProps({ isOpen, article, loadArticleComments }) {
        if (!this.props.isOpen && isOpen && !article.commentsLoading && !article.commentsLoaded) {
            loadArticleComments(article.id)
        }
    }

    render() {
        const {isOpen, toggleOpen} = this.props
        const { l10n } = this.context
        const text = isOpen ? l10n.hideComments : l10n.showComments
        console.log('---', 4)
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
        const { l10n } = this.context
        if (!isOpen) return null
        if (commentsLoading) return <Loader />
        if (!commentsLoaded) return null

        return (
            <div className="test__comment-list--body">
                <h3>{this.context.username}</h3>
                {
                    comments.length
                        ? this.getComments()
                        : <h3 className="test__comment-list--empty">{l10n.noComments}</h3>
                }
                <CommentForm articleId = {id} />
            </div>
        )
    }

    getComments() {
        return (
            <ul>
                {
                    this.props.article.comments.map(id =>
                        <li key = {id} className = "test__comment-list--item">
                            <Comment id = {id}/>
                        </li>)
                }
            </ul>
        )
    }
}


export default connect(state => ({
    language: languageSelector(state),
}), { loadArticleComments })(toggleOpen(CommentList))