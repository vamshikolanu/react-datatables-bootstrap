/** @jsx React.DOM */

'use strict'

var React = require('react')

module.exports = React.createClass({

	render: function() {

		return (

			<a href=''>	
				<img width={this.props.width} height={this.props.height} src={this.props.src}/>
			</a>
		)
	}

});
