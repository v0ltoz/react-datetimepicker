import React from 'react';
import ReactDOM from "react-dom";
import '../style/DateTimeRange.css'
import "../style/DateTimeRange.css"

class RangeButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            style : "rangebuttonstyle",
        }

        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.keyDown = this.keyDown.bind(this);
    }

    componentWillReceiveProps(nextProps){
        let focused = nextProps.focused[nextProps.index];
        // If select set to hover style 
        if(nextProps.index === nextProps.selectedRange || focused){
            this.setState({style:"rangeButtonSelectedStyle"})
        }else{
            this.setState({style:"rangebuttonstyle"})
        }
    }

    componentDidUpdate(prevProps, prevState){
        let isComponentViewing = this.props.index === this.props.viewingIndex;
        let focused = this.props.focused;
        let focusedOnARange = false
        for(let i = 0; i < focused.length; i++){
            if(focused[i] === true){
                focusedOnARange = true;
                break;
            }
        }
        // If the component we are currently on is the selected viewing component
        // and we are focused on it according to our focused matrix.
        // Then add an event listener for this button and set it as focused
        if(isComponentViewing && focusedOnARange){
            document.addEventListener("keydown", this.keyDown, false);
            this.button.tabIndex = 0;
            this.button.focus();
        }
    }

    mouseEnter(){
        // Set hover style
        this.setState({style:"rangeButtonSelectedStyle"})
    }

    mouseLeave(focused){
        let isFocused;
        if (typeof focused === 'boolean'){
            isFocused = focused;
        }else{
            isFocused = this.state.focused;
        }
        let isSelected = this.props.index === this.props.selectedRange;
        // If not selected and not focused then on mouse leave set to normal style
        if(!isSelected && !isFocused){
            this.setState({style:"rangebuttonstyle"})
        }
    }

    onFocus(){
        this.setState({focused: true});
        this.props.setFocusedCallback(this.props.index, true);
        this.mouseEnter(true);
    }

    onBlur(){
        this.setState({focused: false});
        this.props.setFocusedCallback(this.props.index, false);
        this.mouseLeave(false);
        document.removeEventListener("keydown", this.keyDown, false);
    }

    keyDown(e){
        let componentFocused =  document.activeElement === ReactDOM.findDOMNode(this.button);
        // Up Key
        if (e.keyCode === 38 && componentFocused) {
            e.preventDefault();
            this.props.viewingIndexChangeCallback(this.props.index - 1);
        }
        // Down Key
        else if (e.keyCode === 40 && componentFocused) {
            e.preventDefault();
            this.props.viewingIndexChangeCallback(this.props.index + 1);
        }
        // Space Bar and Enter
        else if(e.keyCode === 32 || e.keyCode === 13){
            this.props.rangeSelectedCallback(this.props.index, this.props.label);
        }
    }

    render(){
        let isViewingIndex = this.props.viewingIndex === this.props.index;

        let tabIndex;
        if(isViewingIndex){
            tabIndex = 0;
        }else{
            tabIndex = -1;
        }
        return(
            <div 
                ref={button => { this.button = button; }}
                className={this.state.style} 
                onMouseEnter={this.mouseEnter} 
                onMouseLeave={this.mouseLeave}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                tabIndex={tabIndex}
            > 
                <div className="rangebuttontextstyle" onClick={() => this.props.rangeSelectedCallback(this.props.index, this.props.label)}>
                    {this.props.label}
                </div>
            </div>
        )
    }
}
export default RangeButton