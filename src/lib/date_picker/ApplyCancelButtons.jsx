import React from 'react';
import '../style/DateTimeRange.css'
import "../style/DateTimeRange.css"

class ApplyCancelButtons extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hoverColourApply: "#5cb85c",
            hoverColourCancel: "#fff"
        }

        this.mouseEnterApply = this.mouseEnterApply.bind(this);
        this.mouseLeaveApply = this.mouseLeaveApply.bind(this);
        this.mouseEnterCancel = this.mouseEnterCancel.bind(this);
        this.mouseLeaveCancel = this.mouseLeaveCancel.bind(this);
        this.cancelPressed = this.cancelPressed.bind(this);
        this.applyPressed = this.applyPressed.bind(this);
        this.applyOnKeyPress = this.applyOnKeyPress.bind(this);
        this.cancelOnKeyPress = this.cancelOnKeyPress.bind(this);
    }
    mouseEnterApply(e){
        this.setState({hoverColourApply: "#3e8e41"})
    }

    mouseLeaveApply(e){
        this.setState({hoverColourApply: "#5cb85c"})
    }

    mouseEnterCancel(e){
        this.setState({hoverColourCancel: "rgb(192, 185, 185)"})
    }

    mouseLeaveCancel(e){
        this.setState({hoverColourCancel: "#fff"})
    }

    cancelPressed(e){
        this.props.changeVisibleState();
    }

    applyPressed(e){
        this.props.applyCallback();
    }

    isSpaceBarPressed(e){
        if(e.keyCode === 32){
            return true;
        }
        return false;
    }

    applyOnKeyPress(e){
        if(this.isSpaceBarPressed(e)){
            this.props.applyCallback();
        }
    }

    cancelOnKeyPress(e){
        if(this.isSpaceBarPressed(e)){
            this.props.changeVisibleState();
        }
    }

    renderButton(className, onMouseEnter, onMouseLeave, onClick, style, onKeyDown, text){
        return(
            <div 
                className={className}
                onMouseEnter={onMouseEnter} 
                onMouseLeave={onMouseLeave}
                onClick={onClick}
                style={style}
                onKeyDown={onKeyDown}
                tabIndex={0}
            >
                {text}
            </div>
        );
    }

    render(){
        return(
            <div id="buttonContainer" className="buttonContainer">
                {
                    this.renderButton("buttonSeperator applyButton", 
                    this.mouseEnterApply,
                    this.mouseLeaveApply,
                    this.applyPressed,
                    {backgroundColor:this.state.hoverColourApply},
                    this.applyOnKeyPress,
                    "Apply")
                }

                {
                    this.renderButton("buttonSeperator cancelButton", 
                    this.mouseEnterCancel,
                    this.mouseLeaveCancel,
                    this.cancelPressed,
                    {backgroundColor:this.state.hoverColourCancel},
                    this.cancelOnKeyPress,
                    "Cancel")
                }
            </div>
        );
    }
}
export default ApplyCancelButtons