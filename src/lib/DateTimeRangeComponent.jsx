import React, { Component } from "react";
import DateTimeRangeContainer from "./DateTimeRangeContainer";
import moment from "moment";
import PropTypes from "prop-types";

import "./DateTimeRangeComponent.css";

class DateRangeComponent extends Component {
    componentWillMount() {
        let now = new Date();

        let start = this.props.start != null ? this.props.start : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

        let end = this.props.end
            ? moment(this.props.end)
            : moment(start)
                  .add(1, "days")
                  .subtract(1, "seconds");

        let maxDays = this.props.maxDays == null ? 366 : this.props.maxDays;

        let rangesStr = this.props.translations != null ? this.props.translations.DefaultRanges : null;
        if (rangesStr != null && rangesStr.length < 9) {
            console.log("Invalid RangesDescriptors in translations! ");
            rangesStr = null;
        }

        if (rangesStr == null) rangesStr = DefaultRangesDescriptors;

        let ranges = {};
        if (this.props.ranges == null) {
            ranges[rangesStr[0]] = [moment(start), moment(end)];
            ranges[rangesStr[1]] = [moment(start).subtract(1, "days"), moment(end).subtract(1, "days")];

            if (maxDays === 1) ranges[rangesStr[2]] = [moment(start).subtract(2, "days"), moment(end).subtract(2, "days")];

            if (maxDays > 3) ranges[rangesStr[3]] = [moment(start).subtract(3, "days"), moment(end)];
            if (maxDays > 5) ranges[rangesStr[4]] = [moment(start).subtract(5, "days"), moment(end)];
            if (maxDays > 7) ranges[rangesStr[5]] = [moment(start).subtract(7, "days"), moment(end)];
            if (maxDays > 14) ranges[rangesStr[6]] = [moment(start).subtract(14, "days"), moment(end)];
            if (maxDays > 30) ranges[rangesStr[7]] = [moment(start).subtract(1, "months"), moment(end)];
            if (maxDays > 90) ranges[rangesStr[8]] = [moment(start).subtract(3, "months"), moment(end)];
            if (maxDays > 365) ranges[rangesStr[9]] = [moment(start).subtract(1, "years"), moment(end)];
        } else {
            ranges = this.props.ranges;

            Object.keys(ranges).forEach(e => {
                let cur = ranges[e];
                if (cur[0]._isAMomentObject == null) cur[0] = moment(cur[0]);
                if (cur[1]._isAMomentObject == null) cur[1] = moment(cur[1]);
            });
        }

        this.setState({
            start: start,
            end: end.toDate(),
            ranges
        });

        this.applyCallback = this.applyCallback.bind(this);
    }

    componentDidMount() {
        this.applyCallback(this.state.start, this.state.end);
    }

    getDateString(date) {
        let options = {
            year: "numeric",
            month: "long",
            day: "numeric"
        };

        var locale = window.navigator.userLanguage || window.navigator.language;

        if (date._isAMomentObject === true) date = date.toDate();

        return (
            date.toLocaleDateString(locale, options) +
            (this.props.enableTime
                ? " " +
                  date
                      .getHours()
                      .toString()
                      .padStart(2, 0) +
                  ":" +
                  date
                      .getMinutes()
                      .toString()
                      .padStart(2, 0)
                : "")
        );
    }

    applyCallback(startDate, endDate) {
        //console.log(`applyCallback ${startDate} > ${endDate}`);
        let selectedTextFrom = this.getDateString(startDate);
        let selectedTextTo = this.getDateString(endDate);

        if (startDate._isAMomentObject) startDate = startDate.toDate();
        if (endDate._isAMomentObject) endDate = endDate.toDate();

        this.setState({
            selectedTextFrom: selectedTextFrom,
            selectedTextTo: selectedTextTo,
            start: startDate,
            end: endDate
        });

        let returnValue = {};
        returnValue.from = startDate;
        returnValue.to = endDate;

        if (!this.props.enableTime || startDate === endDate) {
            returnValue.from.setHours(0);
            returnValue.from.setMinutes(0);
            returnValue.to.setHours(23);
            returnValue.to.setMinutes(59);
        }
        returnValue.from.setSeconds(0);
        returnValue.to.setSeconds(59);

        returnValue.fromH = returnValue.from.getHours();

        returnValue.from_str = moment(returnValue.from).format("YYYY-MM-DD HH:mm:ss");
        returnValue.to_str = moment(returnValue.to).format("YYYY-MM-DD HH:mm:ss");

        if (this.props.onChange) {
            this.props.onChange(returnValue);
        }
    }

    render() {
        let minYear = this.props.minYear == null ? 2010 : this.props.minYear;
        let maxYear = this.props.maxYear == null ? new Date().getFullYear() + 1 : this.props.maxYear;

        let start = moment(this.state.start);
        let end = moment(this.state.end);

        let ranges = this.state.ranges;

        let local = {
            format: "DD-MM-YYYY", // + (this.props.enableTime ? ' HH:mm' : ''),
            sundayFirst: false
        };

        return (
            <div className={`date-range-selector ${this.props.className != null ? this.props.className : ""} ${this.props.disabled ? "disabled" : ""} ${this.props.maxDays === 1 ? "single" : ""}`}>
                <DateTimeRangeContainer
                    calendarStyles={this.props.calendarStyles}
                    maxDays={this.props.maxDays}
                    ranges={ranges}
                    start={start}
                    end={end}
                    local={local}
                    applyCallback={this.applyCallback}
                    disableTime={this.props.enableTime == null || this.props.enableTime === false}
                    disabled={this.props.disabled}
                    minYear={minYear}
                    maxYear={maxYear}
                    translations={this.props.translations}
                    rangeCallback={this.props.rangeCallback}
                    showCurrentState={this.props.showCurrentState}
                    autoCloseOnSelection={this.props.autoCloseOnSelection}
                    useVirtualSelection={this.props.useVirtualSelection}
                >
                    <div className="period-selector">
                        <div className="glyphicon glyphicon-calendar" />
                        <input readOnly="readonly" className="period-f" type="text" label="Text" value={this.state.selectedTextFrom} />
                        {this.props.maxDays === 1 ? "" : <input readOnly="readonly" className="period-t" type="text" label="Text" value={this.state.selectedTextTo} />}
                    </div>
                </DateTimeRangeContainer>
            </div>
        );
    }
}

export default DateRangeComponent;

const DefaultRangesDescriptors = ["Today", "Yesterday", "Two days ago", "3 days", "5 days", "Last week", "Last two week", "Last month", "Last 3 months", "Last year"];

DateTimeRangeContainer.propTypes = {
    start: PropTypes.object,
    end: PropTypes.object,
    ranges: PropTypes.object,
    enableTime: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    maxDays: PropTypes.number.isRequired,
    minYear: PropTypes.number,
    maxYear: PropTypes.number,
    translations: PropTypes.object,
    calendarStyles: PropTypes.object,
    rangeCallback: PropTypes.func,
    showCurrentState: PropTypes.bool,
    autoCloseOnSelection: PropTypes.bool,
    useVirtualSelection: PropTypes.bool
};

DateTimeRangeContainer.defaultProps = {
    useVirtualSelection: false,
    maxDays: 366,
    enableTime: false,
    disabled: false,
    minYear: 2010,
    maxYear: new Date().getFullYear() + 1,
    showCurrentState: false,
    autoCloseOnSelection: true
};
