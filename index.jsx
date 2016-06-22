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
          _this.setState({json_object: response.voices});
       }, 'json');
    },

    /**
     * The parameter 'data' is the column of the JSON file on which the user clicks. 
     * @param  {JSON}
     */
    edit: function(data) {
      alert(data);
    },

    /**
     * The parameter 'data' is the column of the JSON file on which the user clicks. 
     * @param  {JSON}
     */
    alert: function(data) {
      alert(data);
    },

   render: function() {
    return (
          <DataTable 
                        tags= {['mp3_url', 'poster_url', 'transcript', "language"]} 
                        actions={[{'name': 'Edit', 'function': this.edit, 'btn_class':'btn btn-primary'}, {'name': 'Alert', 'function':  this.alert, 'btn_class':'btn btn-danger'}]} 
                        data = {this.state.json_object} />
    );
  }
});

React.render(<HomePage />, document.getElementById('data-tables'));
