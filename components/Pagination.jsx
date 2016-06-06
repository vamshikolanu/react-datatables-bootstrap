/** @jsx React.DOM */

'use strict'

var React = require('react');

module.exports = React.createClass({

  getDefaultProps: function(){
  		return {keyUp: null }
  },

  getInitialState: function() {
    return {focus_flag: false};
  },


  keyUp: function(e) {
  	if(this.props.keyup) {
  		  	this.props.keyup(e);
  	}
  },

render: function() {

		return (
			<div className="btn-group pull-right">
 				<button type="button" className="btn btn-default">Left</button>
 				<button type="button" className="btn btn-default">Middle</button>
 				<button type="button" className="btn btn-default">Right</button>
			</div>
		)
	}

});