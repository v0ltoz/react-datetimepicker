import React from 'react';
import '../style/DateTimeRange.css'
import "../style/DateTimeRange.css"

class RangeButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            style : "rangebuttonstyle",
            focused: false
        }

        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    componentWillReceiveProps(nextProps){
        // If select set to hover style 
        if(nextProps.index === nextProps.selectedRange){
            this.setState({style:"rangeButtonSelectedStyle"})
        }else{
            this.setState({style:"rangebuttonstyle"})
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
        this.mouseEnter(true);
    }

    onBlur(){
        this.setState({focused: false});
        this.mouseLeave(false);
    }

    render(){
        return(
            <div className={this.state.style} 
                onMouseEnter={this.mouseEnter} 
                onMouseLeave={this.mouseLeave}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                tabIndex={0}
            > 
                <div className="rangebuttontextstyle" onClick={() => this.props.rangeSelectedCallback(this.props.index, this.props.label)}>
                    {this.props.label}
                </div>
            </div>
        )
    }
}
export default RangeButton