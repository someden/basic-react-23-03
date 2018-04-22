import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { languageSelector } from '../../selectors'
import l10n from './l10n'

class Localization extends Component {
    static propTypes = {
        language: PropTypes.string,
    }

    static childContextTypes = {
        l10n: PropTypes.object,
    }

    getChildContext() {
        return {
            l10n: l10n[this.props.language].translations
        }
    }

    render() {
        return this.props.children
    }
}

export default connect(state => ({
    language: languageSelector(state)
}))(Localization)