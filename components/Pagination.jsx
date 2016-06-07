/** @jsx React.DOM */

'use strict'

var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {focus_flag: false};
  },

  handleOnClick: function(data) {
    this.props.action(data);
  },

  render: function() {

    var length = this.props.length;
    var elements_per_page = this.props.elements_per_page;
    var current_page = this.props.current_page;
    var number_of_pages;

    if(length && elements_per_page) {
      number_of_pages = parseInt(length/elements_per_page) + 1;
    }
    
    var pages_displayed = (number_of_pages > 5) ? 5: number_of_pages; 

    /*
      Creating array of numbers from [1 - number_of_pages]
     */
    var range_of_pages = Array.apply(0, Array(pages_displayed)).map(function(_,index) { return index + 1; });

    if(pages_displayed > 0) {
      var _this = this;
      var page_buttons = Array();

      page_buttons = range_of_pages.map(function(data,index) {
          var class_name = (data === current_page) ? "btn btn-primary" : "btn btn-default";
          return <button onClick={_this.handleOnClick.bind(_this, data)} type="button" className={class_name}>{data}</button>
      });

      if(this.props.current_page-1<=0) {
         page_buttons.unshift(<button type="button" onClick = {_this.handleOnClick.bind(this, this.props.current_page-1)} className="disabled btn btn-default" disabled>Previous</button>);
      }
      else {
        page_buttons.unshift(<button type="button" onClick = {_this.handleOnClick.bind(this, this.props.current_page-1)} className="btn btn-default">Previous</button>);
      }

      if((elements_per_page * current_page)  < length) {
        page_buttons.push(<button type="button" onClick = {_this.handleOnClick.bind(this, this.props.current_page+1)} className="btn btn-default">Next</button>);
      }
      else {
        page_buttons.push(<button type="button" onClick = {_this.handleOnClick.bind(this, this.props.current_page+1)} className="disabled btn btn-default" disabled>Next</button>);
      }
    }

    var paginationStyle = {
      cursor: 'pointer'
    }

		return (
			<div style={paginationStyle} className="btn-group pull-right">
        {page_buttons}
			</div>
		)
	}

});