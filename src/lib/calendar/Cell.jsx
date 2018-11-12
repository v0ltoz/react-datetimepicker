import React from 'react';
import '../style/DateTimeRange.css'

class Cell extends React.Component {
    constructor(props){
        super(props);
        this.state = {style:{}};

        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
    }

    mouseEnter(){
        let style = {
            borderRadius:"4px 0 0 4px",
            borderColour:"transparent",
            color:"#fff",
            backgroundColor:"#357abd",
            cursor:"pointer"
        };
        this.setState({"style": style});
    }

    mouseLeave(){
        let style = {
            borderRadius:"0 0 0 0",
            borderColour:"transparent",
            color:"black",
            backgroundColor:""
        };
        this.setState({"style": style});
    }

    render(){
        let dateFormatted = this.props.day.format("D");
        return(
            <div 
                className="calendarCell"
                style={this.state.style}
                onMouseEnter={this.mouseEnter} 
                onMouseLeave={this.mouseLeave}
            >
                {dateFormatted}
            </div>
        );
    }
}
export default Cell