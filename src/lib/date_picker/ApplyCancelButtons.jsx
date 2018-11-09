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

    render(){
        return(
            <div id="buttonContainer" className="buttonContainer">
                <div 
                    className="buttonSeperator applyButton"
                    onMouseEnter={this.mouseEnterApply} 
                    onMouseLeave={this.mouseLeaveApply}
                    style={{backgroundColor:this.state.hoverColourApply}}
                    tabIndex={0}
                >
                    Apply
                </div>
                <div 
                    className="buttonSeperator cancelButton"
                    onMouseEnter={this.mouseEnterCancel} 
                    onMouseLeave={this.mouseLeaveCancel}
                    style={{backgroundColor:this.state.hoverColourCancel}}
                    tabIndex={0}
                >
                    Cancel
                </div>
            </div>
        );
    }
}
export default ApplyCancelButtons