import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
//import {findDOMNode} from 'react-dom'
import Article from '../article'
import accordion from '../../decorators/accordion'

export class ArticleList extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired,

        //from accordion decorator
        openItemId: PropTypes.string,
        toggleItem: PropTypes.func
    };

    componentDidMount() {
        const { fetchData } = this.props
        if (fetchData) fetchData()
    }

    render() {
        return (
            <ul>
                {this.getArticles()}
            </ul>
        )
    }

    getArticles() {
        const { articles, openItemId, toggleItem } = this.props
        return articles.map(article => (
            <li key = {article.id} className = "test--article-list__item">
                <Article article = {article}
                         isOpen = {article.id === openItemId}
                         toggleOpen = {toggleItem}
                         ref = {this.setListElementRef}
                />
            </li>
        ))
    }

    setListElementRef = _ => {
        //console.log('---', listElement, findDOMNode(listElement))
    }
}

const getFilteredArticles = (articles, { selectedArticles, dateRange }) => {
    const filterBySelected = selectedArticles.length
        ? (article) => selectedArticles.includes(article.id)
        : () => true

    const from = moment(dateRange.from).startOf('day')
    const to = moment(dateRange.to).endOf('day')

    const filterByDateRange = from.isValid() && to.isValid()
        ? (article) => {
            const date = moment(article.date)
            return date.isSameOrAfter(from) && date.isSameOrBefore(to)
        }
        : () => true

    return articles.filter(article => filterBySelected(article) && filterByDateRange(article))
}

export default connect(state => ({
    articles: getFilteredArticles(state.articles, state.filters),
}))(accordion(ArticleList))