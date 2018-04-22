import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { increment } from '../ac'

class Counter extends Component {
    static propTypes = {
        count: PropTypes.number,
        handleIncrement: PropTypes.func
    }

    static contextTypes = {
        l10n: PropTypes.object
    }

    render() {
        const { l10n } = this.context
        return (
            <div>
                <h2>{this.props.count}</h2>
                <button onClick = {this.handleIncrement}>{l10n.increment}</button>
            </div>
        )
    }

    handleIncrement = () => {
        this.props.handleIncrement()
    }
}

const mapStateToProps = state => ({
    count: state.counter
})

export default connect(mapStateToProps, {
    handleIncrement: increment
})(Counter)