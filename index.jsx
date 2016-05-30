'use strict'

var React = require('react');
var DataTable = require('./components/Datatables.jsx');


var HomePage = React.createClass({

    getInitialState: function() {
		  return({json_object: null})
    },

    componentDidMount: function(){
       var _this = this;

       $.get('./test.json', function(response){
          _this.setState({json_object: response.employees});
       }, 'json');
    },

    edit: function() {
      alert('clicked on edit')
    },

    alert: function() {
      alert('clicked on alert');
    },

   render: function() {
    return (
      <div>
          <DataTable 
                        tags= {['firstName', 'lastName']} 
                        actions={[{'name': 'Edit', 'function': this.edit}, {'name': 'Alert', 'function':  this.alert}]} 
                        data = {this.state.json_object} />
      </div>
    );
  }
});

React.render(<HomePage />, document.getElementById('data-tables'));
