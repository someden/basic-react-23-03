import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../ac'

class CommentForm extends Component {
    static propTypes = {
        articleId: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired
    }

    state = {
        text: ''
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea
                    value={this.state.text}
                    onChange={this.handleChange}
                />
                <button type='submit'>add comment</button>
            </form>
        )
    }

    handleChange = ({ target: { value } }) => this.setState({ text: value })

    handleSubmit = (e) => {
        e.preventDefault()
        const { articleId, onSubmit } = this.props
        const { text } = this.state
        if (text) {
            onSubmit({ articleId, text })
            this.setState({ text: '' })
        }
    }
}

export default connect(null, { onSubmit: addComment })(CommentForm)