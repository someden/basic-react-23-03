import React, { Component } from 'react'
import PropTypes from 'prop-types'

class UserForm extends Component {
    static contextTypes = {
        l10n: PropTypes.object
    }

    render() {
        const { l10n } = this.context
        return (
            <div>
                {l10n.user}: <input value = {this.props.value} onChange = {this.handleChange}/>
            </div>
        )
    }

    handleChange = ev => {
        this.props.onChange(ev.target.value)
    }
}

export default UserForm