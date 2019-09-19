import React from 'react';
import '../style/DateTimeRange.css';
import PropTypes from 'prop-types';
import RangeButton from './RangeButton';
import { mobileBreakPoint } from '../DateTimeRangeContainer';
class Ranges extends React.Component {
  constructor(props) {
    super(props);

    let focused = [];
    let ranges = Object.keys(this.props.ranges).map(
      key => this.props.ranges[key],
    );
    for (let i = 0; i < ranges.length; i++) {
      focused.push(false);
    }

    this.state = {
      viewingIndex: this.props.selectedRange,
      focused: focused,
    };

    this.viewingIndexChangeCallback = this.viewingIndexChangeCallback.bind(
      this,
    );
    this.setFocusedCallback = this.setFocusedCallback.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // On Change of Selected Range reset viewing index to be the range index
    if (this.props.selectedRange !== nextProps.selectedRange) {
      this.setState({
        viewingIndex: nextProps.selectedRange,
      });
    }
  }

  viewingIndexChangeCallback(newIndex) {
    // Allow a new item selected to be made
    let length = this.state.focused.length;
    if (newIndex >= 0 && newIndex < length) {
      this.setState({
        viewingIndex: newIndex,
      });
    }
  }

  setFocusedCallback(index, focusedInput) {
    // Set the focus value of indexed item, focusedInput is true or false
    let focused = this.state.focused;
    focused[index] = focusedInput;
    this.setState({
      focused: focused,
    });
  }

  render() {
    let mobileModeActive = !this.props.noMobileMode; // If no mobile mode prop not set then allow mobile mode
    let mobileModeForce = this.props.forceMobileMode; // If force mobile mode prop is set then force mobile mode
    let displayI = '';
    if ((this.props.screenWidthToTheRight < mobileBreakPoint && mobileModeActive) || mobileModeForce) {
      displayI = 'contents';
    }
    // Map the range index and object name and value to a range button
    return (
      <div className="rangecontainer" style={{ display: displayI }}>
        {Object.keys(this.props.ranges).map((range, i) => (
          <RangeButton
            key={i}
            index={i}
            label={range}
            value={this.props.ranges[range]}
            selectedRange={this.props.selectedRange}
            rangeSelectedCallback={this.props.rangeSelectedCallback}
            viewingIndex={this.state.viewingIndex}
            viewingIndexChangeCallback={this.viewingIndexChangeCallback}
            focused={this.state.focused}
            setFocusedCallback={this.setFocusedCallback}
            style={this.props.style}
          />
        ))}
      </div>
    );
  }
}

Ranges.propTypes = {
  ranges: PropTypes.object.isRequired,
  screenWidthToTheRight: PropTypes.number.isRequired,
  selectedRange: PropTypes.number.isRequired,
  rangeSelectedCallback: PropTypes.func.isRequired,
  style: PropTypes.object,
  noMobileMode: PropTypes.bool,
  forceMobileMode: PropTypes.bool,
};
export default Ranges;
