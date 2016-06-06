/** @jsx React.DOM */

'use strict'

var React = require('react')

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
			<input type="text" className="form-control"  value={this.props.value} onKeyUp={this.keyUp}  name={this.props.name} ref={this.props.ref} placeholder={this.props.placeholder} />
		)
	}

});