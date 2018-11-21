import React from 'react';
import { findDOMNode } from "react-dom";
import './style/DateTimeRange.css'
import { DateTimeRangePicker } from './DateTimeRangePicker';

class DateTimeRangeContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            x : 0,
            y : 0
        }
        this.resize = this.resize.bind(this);
        this.onClickContainerHandler= this.onClickContainerHandler.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.changeVisibleState = this.changeVisibleState.bind(this);
    }

    componentDidMount(){
        window.addEventListener('resize', this.resize)
        this.resize();
    }

    componentWillMount(){
        window.removeEventListener('resize', this.resize)
    }

    resize(){
        const domNode = findDOMNode(this).children[0];
        let boundingClientRect = domNode.getBoundingClientRect();
        let x = boundingClientRect.top + boundingClientRect.height + 2;
        let y = boundingClientRect.left + 2;        
        this.setState({x:x, y:y});
    }

    onClickContainerHandler(event){
        if(!this.state.visible){
            document.addEventListener('click', this.handleOutsideClick, false);
            this.changeVisibleState();
        }
    }

    handleOutsideClick(e) {
        // ignore clicks on the component itself
        if (this.container.contains(e.target)) {
          return;
        }
        document.removeEventListener('click', this.handleOutsideClick, false);
        this.changeVisibleState();
    }

    changeVisibleState(){
        this.setState(prevState => ({
            visible: !prevState.visible,
         }));
    }

    shouldShowPicker(){
        if(this.state.visible){
            return "flex"
        }else{
            return "none"
        }
    }
    
    render(){
        let showPicker = this.shouldShowPicker();   
        let x = this.state.x;
        let y = this.state.y;
        return (
                <div id="container" onClick={this.onClickContainerHandler} ref={container => { this.container = container; }}>
                    <div id="children">
                        {this.props.children}
                    </div>
                    <div id="daterangepicker" className="daterangepicker" style={{top:x, left:y, display:showPicker}}>
                        <DateTimeRangePicker 
                            ranges={this.props.ranges}
                            start={this.props.start}
                            end={this.props.end}
                            local={this.props.local}
                            changeVisibleState={this.changeVisibleState}
                        />
                    </div>
                </div>
        )
    }
}
export {DateTimeRangeContainer};