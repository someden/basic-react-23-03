import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../ac'
import { languageSelector } from '../../selectors'
import './style.css'

class CommentForm extends Component {
    static propTypes = {
    };

    static contextTypes = {
        l10n: PropTypes.object
    }

    state = {
        user: '',
        text: ''
    }

    render() {
        const { l10n } = this.context
        return (
            <form onSubmit = {this.handleSubmit}>
                {l10n.user}: <input value = {this.state.user}
                             onChange = {this.handleChange('user')}
                             className = {this.getClassName('user')} />
                {l10n.comment}: <input value = {this.state.text}
                                onChange = {this.handleChange('text')}
                                className = {this.getClassName('text')} />
                <input type = "submit" value = {l10n.submit} disabled = {!this.isValidForm()}/>
            </form>
        )
    }

    handleSubmit = ev => {
        ev.preventDefault()
        this.props.addComment(this.state)
        this.setState({
            user: '',
            text: ''
        })
    }

    isValidForm = () => ['user', 'text'].every(this.isValidField)

    isValidField = type => this.state[type].length >= limits[type].min

    getClassName = type => this.isValidField(type) ? '' : 'form-input__error'

    handleChange = type => ev => {
        const {value} = ev.target
        if (value.length > limits[type].max) return
        this.setState({
            [type]: value
        })
    }
}

const limits = {
    user: {
        min: 10,
        max: 50
    },
    text: {
        min: 10,
        max: 50
    }
}

export default connect(state => ({
    language: languageSelector(state),
}), (dispatch, ownProps) => ({
    addComment: (comment) => dispatch(addComment(comment, ownProps.articleId))
}))(CommentForm)