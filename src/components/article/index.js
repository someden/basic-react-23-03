import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentList from '../comment-list'
import CSSTransition from 'react-addons-css-transition-group'
import { deleteArticle, loadArticleById } from '../../ac'
import Loader from '../common/loader'
import { articleSelector } from '../../selectors'
import './style.css'

class Article extends Component {
    static contextTypes = {
        l10n: PropTypes.object
    }

    state = {
        error: null
    }

    componentDidCatch(error) {
        this.setState({ error })
    }

    componentDidMount() {
        const { article, loadArticleById, id } = this.props
        if (!article || (!article.text && !article.loading)) loadArticleById(id)
    }

    render() {
        const { article, isOpen, toggleOpen } = this.props
        const { l10n } = this.context
        if (!article) return null
        console.log('---', 3)

        return (
            <div>
                <h2>{article.title}</h2>
                <button className = "test--article__btn"
                        onClick = {() => toggleOpen(article.id)}
                >
                    {isOpen ? l10n.close : l10n.open}
                </button>
                <button onClick = {this.handleDelete}>{l10n.delete}</button>
                <CSSTransition
                    transitionName = "article"
                    transitionEnterTimeout = {500}
                    transitionLeaveTimeout = {300}
                    transitionAppearTimeout = {1000}
                    transitionAppear
                    component = 'div'
                >
                    {this.getBody()}
                </CSSTransition>
            </div>
        )
    }

    handleDelete = () => {
        const { deleteArticle, article } = this.props
        deleteArticle(article.id)
    }

    getBody() {
        const { article, isOpen } = this.props
        if (this.state.error) return <h2>{this.context.l10n.someError}</h2>
        if (!isOpen) return null

        if (article.loading) return <Loader />
        return (
            <section className = "test--article__body">
                {article.text}
                <CommentList article = {article}/>
            </section>
        )
    }
}

Article.propTypes = {
    id: PropTypes.string,

    isOpen: PropTypes.bool,
    article: PropTypes.shape({
        title: PropTypes.string,
        text: PropTypes.string
    }),
    toggleOpen: PropTypes.func,
    deleteArticle: PropTypes.func
}


export default connect((state, props) => ({
    article: articleSelector(state, props)
}), { deleteArticle, loadArticleById }, null, { pure: false })(Article)