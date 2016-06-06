/** @jsx React.DOM */

'use strict'

var React = require('react');

module.exports = React.createClass({

	componentDidUpdate: function(prevProps, prevState){
		this.refs.audio.getDOMNode().load();
	},

	render: function() {

		return (
		
			<audio ref="audio" className="audio" controls>
			  <source src={this.props.src} />
			  Your browser does not support the audio element.
			</audio>

		)
	}

});