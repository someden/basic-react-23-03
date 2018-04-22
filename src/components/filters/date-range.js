import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DayPicker, { DateUtils } from 'react-day-picker'
import { connect } from 'react-redux'
import { changeDateRange } from '../../ac'
import { languageSelector } from '../../selectors'

import 'react-day-picker/lib/style.css'

class DateRange extends Component {
    static contextTypes = {
        l10n: PropTypes.object
    }

    handleDayClick = (day) => {
        const { changeDateRange, range } = this.props
        changeDateRange(DateUtils.addDayToRange(day, range))
    }

    render() {
        const { language, range: { from, to } } = this.props
        const { l10n } = this.context
        const selectedRange = from && to &&
            `${from.toLocaleDateString(language)} - ${to.toLocaleDateString(language)}`
        return (
            <div className="date-range">
                <DayPicker
                    locale={ language }
                    months={ l10n.months }
                    weekdaysLong={ l10n.weekdaysLong }
                    weekdaysShort={ l10n.weekdaysShort }
                    firstDayOfWeek={ l10n.firstDayOfWeek }
                    selectedDays={ day => DateUtils.isDayInRange(day, { from, to }) }
                    onDayClick={ this.handleDayClick }
                />
                {selectedRange}
            </div>
        )
    }

}

export default connect(state => ({
    language: languageSelector(state),
    range: state.filters.dateRange
}), { changeDateRange })(DateRange)