import React, { Component } from 'react'
import ReactDayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

class DayPicker extends Component {
    static defaultProps = {
        numberOfMonths: 1
    }

    constructor(props) {
        super(props)
        this.state = this.getInitialState()
    }

    getInitialState = () => ({
        from: undefined,
        to: undefined
    })

    handleDayClick = (day) => {
        const range = DateUtils.addDayToRange(day, this.state)
        this.setState(range)
    }

    handleResetClick = () => this.setState(this.getInitialState())

    render() {
        const { from, to } = this.state
        const modifiers = { start: from, end: to }
        return (
            <div>
                <p>
                    {!from && !to && 'Please select the first day.'}
                    {from && !to && 'Please select the last day.'}
                    {from && to && `Selected from ${from.toLocaleDateString()} to ${to.toLocaleDateString()}`}
                    {' '}
                    {from && to && <button onClick={this.handleResetClick}>Reset</button>}
                </p>
                <ReactDayPicker
                    numberOfMonths = {this.props.numberOfMonths}
                    selectedDays = {[from, { from, to }]}
                    modifiers = {modifiers}
                    onDayClick = {this.handleDayClick}
                />
            </div>
        )
    }
}

export default DayPicker