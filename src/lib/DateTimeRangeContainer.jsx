import React from 'react';
import { findDOMNode } from "react-dom";
import './style/DateTimeRange.css'
import "./style/DateTimeRange.css"
import Ranges from "./ranges/Ranges"
import DatePicker from "./date_picker/DatePicker"

class DateTimeRangeContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            x : 0,
            y : 0,
            selectedRange: 0
        }
        this.resize = this.resize.bind(this);
        this.rangeSelectedCallback = this.rangeSelectedCallback.bind(this);
    }

    componentDidMount(){
        window.addEventListener('resize', this.resize)
        this.resize();
    }

    componentWillMount(){
        window.removeEventListener('resize', this.resize)
    }

    rangeSelectedCallback(index){
        this.setState({selectedRange:index})
    }

    resize(){
        const domNode = findDOMNode(this).children[0];
        let boundingClientRect = domNode.getBoundingClientRect();
        let x = boundingClientRect.top + boundingClientRect.height + 2;
        let y = boundingClientRect.left + 2;        
        this.setState({x:x, y:y});
    }
    
    render(){
       let x = this.state.x;
       let y = this.state.y;
       return (
            <div id="container">
                <div id="children">
                    {this.props.children}
                </div>
                <div id="daterangepicker" className="daterangepicker" style={{top:x, left:y}}>
                    <Ranges 
                        ranges={this.props.ranges}
                        selectedRange={this.state.selectedRange}
                        rangeSelectedCallback={this.rangeSelectedCallback}
                    />
                    <DatePicker 
                        label="From Date"
                    />
                    <DatePicker 
                        label="To Date"
                        enableButtons={true}
                    />
                </div>
            </div>
        )
    }
}
export {DateTimeRangeContainer};