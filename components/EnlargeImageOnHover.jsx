/** @jsx React.DOM */

'use strict'

var React = require('react');

module.exports = React.createClass({
	getInitialState: function(){
		return {hover: false};
	},

	mouseEnter: function(){
		this.setState({hover: true});
	},

	mouseOut: function(){
		this.setState({hover: false});
	},

	/**
	* OnClick: This method will make sure it becomes small on click
	*/
	imgOnClick: function(){
		if(!this.state.hover) { 
			this.setState({hover: true});
		}
		else {
			this.setState({hover: false});
		}
	},

	render: function(){
		var Effectfront = {
  			border: 'none',
  			margin: '0 auto',
  			cursor: 'pointer',
  			zIndex: '10000'
		}
 		
		if(this.state.hover) {
			Effectfront['transform'] = 'scale(6)',
			Effectfront['transition'] = 'all 0.6s'
		}

		return(
			<img width="60" height="60" style={Effectfront} onClick={this.imgOnClick} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseOut} src={this.props.src} />
		)		
	}
});
