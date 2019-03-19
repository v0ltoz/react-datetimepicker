import React, { Component } from 'react';
import './SmallGlyphicon.css';

export default class SmallGlyphicon extends Component {
	render() {
		return <div className={'glyphicon glyphicon-' + this.props.glyph + (this.props.className != null ? ' '+this.props.className:'')} />;
	}
}
