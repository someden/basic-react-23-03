import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { connect } from 'react-redux'
import { changeSelection } from '../../ac'
import { articleListSelector, filtersSelectionSelector, languageSelector } from '../../selectors'

import 'react-select/dist/react-select.css'

class SelectFilter extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired
    };

    static contextTypes = {
        l10n: PropTypes.object
    }

    handleChange = selected => this.props.changeSelection(selected.map(option => option.value))

    render() {
        const { articles, selected } = this.props
        const { l10n } = this.context
        const options = articles.map(article => ({
            label: article.title,
            value: article.id
        }))

        return <Select
            placeholder={`${l10n.select}...`}
            options={options}
            value={selected}
            onChange={this.handleChange}
            multi
        />
    }
}

export default connect(state => ({
    language: languageSelector(state),
    selected: filtersSelectionSelector(state),
    articles: articleListSelector(state)
}), { changeSelection })(SelectFilter)