import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { DateTimeRangePicker } from './DateTimeRangePicker';
import { propValidation } from './utils/PropValidation';
import { darkTheme, lightTheme } from './utils/StyleUtils';
import clsx from 'clsx';

class DateTimeRangeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      x: 0,
      y: 0,
      screenWidthToTheRight: 0,
      containerClassName: '',
    };
    let propValidationReturn = propValidation(this.props);
    if (propValidationReturn !== true) {
      alert(propValidationReturn);
    }
    this.onClickContainerHandler = this.onClickContainerHandler.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.changeVisibleState = this.changeVisibleState.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDown, false);
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  keyDown(e) {
    if (e.keyCode === 27) {
      this.setState({ visible: false });
      document.removeEventListener('keydown', this.keyDown, false);
    }
  }

  onClickContainerHandler() {
    if (!this.state.visible) {
      document.addEventListener('click', this.handleOutsideClick, false);
      document.addEventListener('keydown', this.keyDown, false);
      this.changeVisibleState();
    }
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.state.visible) {
      if (this.container.contains(e.target)) {
        return;
      }
      document.removeEventListener('click', this.handleOutsideClick, false);
      this.changeVisibleState();
    }
  }

  changeVisibleState() {
    this.setState((prevState) => ({
      visible: !prevState.visible,
    }));
  }

  renderPicker() {
    return (
      <DateTimeRangePicker
        ranges={this.props.ranges}
        start={this.props.start}
        end={this.props.end}
        local={this.props.local}
        applyCallback={this.props.applyCallback}
        rangeCallback={this.props.rangeCallback}
        autoApply={this.props.autoApply}
        changeVisibleState={this.changeVisibleState}
        screenWidthToTheRight={this.state.screenWidthToTheRight}
        maxDate={this.props.maxDate}
        descendingYears={this.props.descendingYears}
        years={this.props.years}
        pastSearchFriendly={this.props.pastSearchFriendly}
        smartMode={this.props.smartMode}
        style={this.props.style}
        darkMode={this.props.darkMode}
        noMobileMode={this.props.noMobileMode}
        forceMobileMode={this.props.forceMobileMode}
        standalone={this.props.standalone}
        twelveHoursClock={this.props.twelveHoursClock == true}
      />
    );
  }

  render() {
    let theme = this.props.darkMode ? darkTheme : lightTheme;

    // Special standalone render
    if (
      this.props.standalone &&
      this.props.style &&
      this.props.style.standaloneLayout
    ) {
      return (
        <div
          className={clsx(
            'mt-[1px] flex max-w-2xl flex-col rounded border border-gray-100 bg-white p-1 text-inherit shadow-lg',
            {
              '!flex-col': this.props.forceMobileMode,
              '!flex-row': this.props.noMobileMode,
            }
          )}
          style={this.props.style.standaloneLayout}
        >
          {this.renderPicker()}
        </div>
      );
    }

    return (
      <div
        id="DateRangePickerContainer"
        className="relative"
        onClick={this.onClickContainerHandler}
        ref={(container) => {
          this.container = container;
        }}
      >
        {this.props.children && (
          <div id="DateRangePickerChildren" className="pointer-events-none">{this.props.children}</div>
        )}
        <div
          id="daterangepicker"
          className={clsx(
            'absolute top-10 z-20 mt-[1px] max-w-2xl rounded border border-gray-100 bg-white text-inherit shadow-lg',
            {
              'right-0': this.props.leftMode,
              'left-1/2': this.props.centerMode,
              'flex flex-col': this.state.visible,
              '!flex-col': this.props.forceMobileMode,
              '!flex-row': this.props.noMobileMode, // If no mobile mode prop not set then allow mobile mode
              hidden: !this.state.visible,
            }
          )}
          style={{ ...theme }}
        >
          {this.renderPicker()}
        </div>
      </div>
    );
  }
}

DateTimeRangeContainer.propTypes = {
  ranges: PropTypes.object.isRequired,
  start: momentPropTypes.momentObj,
  end: momentPropTypes.momentObj,
  local: PropTypes.object.isRequired,
  applyCallback: PropTypes.func.isRequired,
  rangeCallback: PropTypes.func,
  autoApply: PropTypes.bool,
  maxDate: momentPropTypes.momentObj,
  descendingYears: PropTypes.bool,
  pastSearchFriendly: PropTypes.bool,
  years: PropTypes.array,
  smartMode: PropTypes.bool,
  darkMode: PropTypes.bool,
  noMobileMode: PropTypes.bool,
  forceMobileMode: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.any,
  leftMode: PropTypes.bool,
  centerMode: PropTypes.bool,
  standalone: PropTypes.bool,
  twelveHoursClock: PropTypes.bool,
};

export default DateTimeRangeContainer;
