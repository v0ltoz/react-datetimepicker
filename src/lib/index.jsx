import DateTimeRangeContainer from './DateTimeRangeContainer';

if (Date.daysBetween == null) {
	Date.daysBetween = function(date1, date2) {
		if (date1._isAMomentObject === true) date1 = date1.toDate();
		if (date2._isAMomentObject === true) date2 = date2.toDate();

		//Get 1 day in milliseconds
		var one_day = 1000 * 60 * 60 * 24;

		// Convert both dates to milliseconds
		var date1_ms = date1.getTime();
		var date2_ms = date2.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = date2_ms - date1_ms;

		// Convert back to days and return
		return Math.round(difference_ms / one_day);
	};
}
export default DateTimeRangeContainer;
