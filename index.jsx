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
      <div>
          <div className="page-header">
            <h1>  React Datatables with Bootstrap </h1>
          </div>
          <p className="lead"> 
            React datatable which has been created by taking a json object as input. Very useful in displaying JSON objects which are loaded from the server.
            Check out the <a href="https://github.com/iiit123/react-datatables-bootstrap"> source code </a>
          </p>  
          <br/>
          <DataTable 
                        tags= {['mp3_url', 'poster_url', 'transcript', "language"]} 
                        actions={[{'name': 'Edit', 'function': this.edit, 'btn_class':'btn btn-primary'}, {'name': 'Alert', 'function':  this.alert, 'btn_class':'btn btn-danger'}]} 
                        data = {this.state.json_object} />
      </div>
    );
  }
});

React.render(<HomePage />, document.getElementById('data-tables'));
