/** @jsx React.DOM */

'use strict'

var React = require('react')

module.exports = React.createClass({

	getInitialState: function(){
		return {hover: false}
	},

	hover: function() {
		this.setState({hover: !this.state.hover})
	
	},


	render: function() {

		var buttonStyle = {

			mozBoxShadow: 'inset -4px -19px 0px -36px #e67a73',
			webkitBoxShadow: 'inset -4px -19px 0px -36px #e67a73',
			boxShadow: 'inset -4px -19px 0px -36px #e67a73',
			backgroundColor: '#BD081C',
			display: 'inline-block',
			cursor: 'pointer',
			color: '#ffffff',
			fontSize: '12px',
			padding: '4px',
			textDecoration: 'none',	
			border: 'solid 1px #BD081C',
			width: '100%',
			height: '100%'
		}

		if(this.state.hover) {
			buttonStyle['backgroundImage'] = '-webkit-linear-gradient(#e3262e, #ab171e)';
			buttonStyle['backgroundColor'] = '#ab171e';
		}
	

		return (

			<button id={this.props.id} type={this.props.type} onMouseEnter={this.hover} onMouseLeave={this.hover} style={buttonStyle}> {this.props.text} </button>
		)
	}

});
