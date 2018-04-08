import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DayPicker, { DateUtils } from 'react-day-picker'
import { selectDateRange } from '../../ac'

import 'react-day-picker/lib/style.css'

class DateRange extends Component {
    static propTypes = {
        dateRange: PropTypes.object.isRequired,
        selectDateRange: PropTypes.func.isRequired
    }

    handleDayClick = (day) =>
        this.props.selectDateRange(DateUtils.addDayToRange(day, this.props.dateRange))

    render() {
        const { from, to } = this.props.dateRange
        const selectedRange = from && to && `${from.toDateString()} - ${to.toDateString()}`
        return (
            <div className="date-range">
                <DayPicker
                    selectedDays={ day => DateUtils.isDayInRange(day, { from, to }) }
                    onDayClick={ this.handleDayClick }
                />
                {selectedRange}
            </div>
        )
    }

}

export default connect(state => ({
    dateRange: state.filters.dateRange
}), { selectDateRange })(DateRange)