import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectLanguage } from '../../ac'
import { languageSelector } from '../../selectors'
import l10n from './l10n'

class LanguageSwitch extends Component {
    static propTypes = {
        language: PropTypes.string,
        selectLanguage: PropTypes.func.isRequired,
    }

    handleSelectLanguage = (language) => (e) => {
        e.preventDefault()
        this.props.selectLanguage(language)
    }

    render() {
        const languages = Object.keys(l10n);

        return (
            <ul>
                {languages.map(language => (
                    <li key={language}>
                        <a
                            href='/'
                            onClick={this.handleSelectLanguage(language)}
                            style={this.props.language === language
                                ? { color: 'red' }
                                : {}
                            }
                        >
                            {l10n[language].name}
                        </a>
                    </li>
                ))}
            </ul>
        )
    }
}

export default connect(state => ({
    language: languageSelector(state)
}), { selectLanguage })(LanguageSwitch)
