import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import ArticleList from '../article-list'
import Article from '../article'

class ArticlesPage extends Component {
    static propTypes = {

    }

    static contextTypes = {
        l10n: PropTypes.object
    }

    render() {
        console.log('---', 2)
        return (
            <Fragment>
                <ArticleList />
                <Route path = {`${this.props.match.path}/:id`} children = {this.getArticle} />
            </Fragment>
        )
    }

    getArticle = ({ match }) => {
        if (!match) return <h1>{this.context.l10n.selectAnArticle}</h1>
        return <Article id = {match.params.id} isOpen key = {match.params.id} />
    }
}

export default ArticlesPage