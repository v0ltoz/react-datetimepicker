import React from 'react';
import { findDOMNode } from 'react-dom';
import './style/DateTimeRange.css';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { DateTimeRangePicker } from './DateTimeRangePicker';
import { propValidation } from './utils/PropValidation';
import { darkTheme, lightTheme } from './utils/StyleUtils';
export const mobileBreakPoint = 680;

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
    this.resize = this.resize.bind(this);
    this.onClickContainerHandler = this.onClickContainerHandler.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.changeVisibleState = this.changeVisibleState.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    document.addEventListener('keydown', this.keyDown, false);
    this.resize();
  }

  componentWillMount() {
    window.removeEventListener('resize', this.resize);
    document.removeEventListener('keydown', this.keyDown, false);
  }

  componentDidUpdate(prevProps) {
    // If the left mode prop has been updated from the Parent treat it like a rezise
    // and adjust the layout accordingly
    if (prevProps.leftMode != this.props.leftMode) {
      this.resize();
    }
  }

  resize() {
    const domNode = findDOMNode(this).children[0];
    const mobileModeActive = !this.props.noMobileMode; // If no mobile mode prop not set then allow mobile mode
    const mobileModeForce = this.props.forceMobileMode; // If force mobile mode prop is set then force mobile mode
    let boundingClientRect = domNode.getBoundingClientRect();
    let widthRightOfThis = window.innerWidth - boundingClientRect.x;
    if ((widthRightOfThis < mobileBreakPoint && mobileModeActive) || mobileModeForce) {
      // If in small mode put picker in middle of child
      let childMiddle = boundingClientRect.width / 2;
      let containerMiddle = 144;
      let newY = childMiddle - containerMiddle;
      this.setState({
        x: boundingClientRect.height + 5,
        y: newY,
        screenWidthToTheRight: widthRightOfThis,
        containerClassName: 'daterangepicker',
      });
    } else if (this.props.leftMode) {
      this.setState({
        x: boundingClientRect.height + 5,
        y: -660,
        screenWidthToTheRight: widthRightOfThis,
        containerClassName: 'daterangepicker daterangepickerleft',
      });
    } else {
      this.setState({
        x: boundingClientRect.height + 5,
        y: 0,
        screenWidthToTheRight: widthRightOfThis,
        containerClassName: 'daterangepicker',
      });
    }
  }

  keyDown(e) {
    if (e.keyCode === 27) {
      this.setState({ visible: false });
      document.removeEventListener('keydown', this.keyDown, false);
    }
  }

  onClickContainerHandler(event) {
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
    this.setState(prevState => ({
      visible: !prevState.visible,
    }));
  }

  shouldShowPicker() {
    let mobileModeActive = !this.props.noMobileMode; // If no mobile mode prop not set then allow mobile mode
    let mobileModeForce = this.props.forceMobileMode; // If force mobile mode prop is set then force mobile mode
    if (
      this.state.visible &&
      ((this.state.screenWidthToTheRight < mobileBreakPoint && mobileModeActive) || mobileModeForce)
    ) {
      return 'block';
    } else if (this.state.visible) {
      return 'flex';
    } else {
      return 'none';
    }
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
      />
    );
  }

  render() {
    let showPicker = this.shouldShowPicker();
    let x = this.state.x;
    let y = this.state.y;
    let theme = this.props.darkMode ? darkTheme : lightTheme;

    // Special standalone render
    if (this.props.standalone && this.props.style && this.props.style.standaloneLayout) {
      return <div style={this.props.style.standaloneLayout}>{this.renderPicker()}</div>;
    }

    return (
      <div
        id="DateRangePickerContainer"
        className="daterangepickercontainer"
        onClick={this.onClickContainerHandler}
        ref={container => {
          this.container = container;
        }}
      >
        {this.props.children && <div id="DateRangePickerChildren">{this.props.children}</div>}
        <div>
          <div
            id="daterangepicker"
            className={this.state.containerClassName}
            style={{ top: x, left: y, display: showPicker, ...theme }}
          >
            {this.renderPicker()}
          </div>
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
  standalone: PropTypes.bool,
};

export default DateTimeRangeContainer;
