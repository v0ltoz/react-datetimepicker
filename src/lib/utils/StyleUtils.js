export const addFocusStyle = (focused, currentStyle) => {
	let style = JSON.parse(JSON.stringify(currentStyle));
	if (focused) {
		style.outline = 'cornflowerblue';
		style.outlineStyle = 'auto';
	} else {
		style.outlineStyle = '';
	}
	return style;
};

export const calendarStyles = {
	startDateStyle: () => {
		return {};
	},

	endDateStyle: () => {
		return {};
	},

	inBetweenStyle: () => {
		return {};
	},

	normalCellStyle: () => {
		return {};
	},

	hoverCellStyle: between => {
		return {};
	},

	greyCellStyle: () => {
		return {};
	},

	invalidStyle: () => {
		return {};
	}
};

export const rangesStyles = {
	normalRangeStyle: () => {
		return {};
	},
	selectedRangeStyle: () => {
		return {};
	}
};
