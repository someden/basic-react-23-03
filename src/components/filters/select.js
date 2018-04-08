import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import { selectArticles } from '../../ac'

import 'react-select/dist/react-select.css'

class SelectFilter extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired,
        selected: PropTypes.array.isRequired,
        selectArticles: PropTypes.func.isRequired
    }

    handleChange = selected => this.props.selectArticles(selected.map(({ value }) => value))

    render() {
        const { articles, selected } = this.props
        const options = articles.map(article => ({
            label: article.title,
            value: article.id
        }))

        return <Select
            options={options}
            value={selected}
            onChange={this.handleChange}
            multi
        />
    }
}

export default connect(state => ({
    articles: state.articles,
    selected: state.filters.selectedArticles
}), { selectArticles })(SelectFilter)