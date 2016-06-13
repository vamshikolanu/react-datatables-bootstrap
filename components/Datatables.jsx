/** @jsx React.DOM */
/**
	this.props.data = coloums of the table to be displayed
	this.props.tags = headings of the table and key values in the json file
	this.props.actions = They are buttons which have to be displayed with [name: , action: , class-name] feature where name atrr referst to name on the button

**/


'use strict'

var React = require('react');
var InputField = require('./InputField');
var BasicPlayer = require('./BasicPlayer');
var EnlargeImageOnHover = require('./EnlargeImageOnHover');
var Pagination = require('./Pagination');


var actionButton = React.createClass({

	handleOnClick: function() { 
		this.props.action(this.props.data);
	},

	render: function() {
			return (

					<div onClick={this.handleOnClick} >
						<button className={this.props.btn_class} > {this.props.text} </button>
					</div>

				)
	}
});

var tdItem = React.createClass({

	/**
	 * creates td items for the given data
	 */
	render: function() {

			var trStyle = {
				textAlign: 'center'
			}

			if(this.props.data) {

				var image_formats = ['png', 'jpg', 'jpeg'];
				var audio_formats = ['opus', 'mp3', 'ogg'];

				var data = String(this.props.data);

				if(image_formats.indexOf(data.split('.').pop())!= -1){
						var data =  <EnlargeImageOnHover src={this.props.data} />
				}	
				else if(audio_formats.indexOf(data.split('.').pop())!= -1){
						var data =  <BasicPlayer src={this.props.data} />
				}	

				else{
						var data = this.props.data.toString();
				}
			}

			if(this.props.action){

				var data = React.createElement(actionButton, {data:this.props.data, text:this.props.name,  action:this.props.action, btn_class:this.props.btn_class})

			}

			return (
					<td style={trStyle}>
						{data}
					</td>
				)
	}

 });



var trItem = React.createClass({


	/**
	 * checks for tags and returns creates tr values of the given tags 
	 * @return {[none]}
	 */
	render: function() {
		
		var tdArray = [];

		if (this.props.tdData) {

				for (var tag in this.props.tags) {

					var tag_value = this.props.tags[tag];

					var attrValue = (this.props.tdData[tag_value] != null) ?  this.props.tdData[tag_value] : null;
			
					tdArray.push(React.createElement(tdItem, {data:attrValue, flag: this.props.flag} ));
				}

				if(this.props.actions) {

					for(var i in this.props.actions) { 		
				
						var action = this.props.actions[i];
						
						tdArray.push(React.createElement(tdItem, {data:this.props.tdData, flag:this.props.flag, name:action['name'], action:action['function'], btn_class: action['btn_class'] }));
					}
				}
		}

		return(
				<tr>
					{tdArray}
				</tr>
			)
	}

});


module.exports = React.createClass({	

	getInitialState: function() {
		return {search_value: '', sort_tag: '', sort_ascending: 'false', select_value: 10, current_page: 1}
	},

	/**
	 * sets the search_value state to input box value and the set state is passed to trItem 
	 * @param  {[input box search value]}
	 * @return {[none]}
	 */
	searchTags: function(e) {
		this.setState({search_value: e.target.value});
	},

	/**
	 * [thOnClick set the flag to ascending or desending using set state method]
	 * @param  {[type]} tag_value [key, listens etc which has to be sorted]
	 * @return {[null]}     
	 */
	thOnClick: function(tag_value) {
		this.setState({sort_tag: tag_value, sort_ascending: !this.state.sort_ascending});
	},

	/**
	 * on change of select change the value of the state to the selected value and change the current page to 1.
	 */
	selectChange: function(e) {
		this.setState({select_value: e.target.value, current_page:1});
	},

	handlePagination: function(page_number) {
		this.setState({current_page: page_number});
	},	

	/**
	 * check whether search box value is present in atleast on td element of tr.  
	 * @return {[boolean]}
	 */
	searchResult: function(data) {

		if(data) {

			for(var key in data) {	

				if(this.props.tags.indexOf(key) != -1) {

          			var attrValue = String(data[key]);

          			var regex = new RegExp(this.state.search_value, 'gi');

          			if(attrValue) {
        	  			if(attrValue.match(regex)){
          					return true;
          				}
          			}
         		}	
        	}
        	return false;
        }
	},

	/**
	 * renders view of datatable along with search box
	 * @return {[none]}
	 */
	render: function() {

		var start_index = 1, end_index;

		var tableStyle = {
			width: '100%', 
			marginTop:'10px'
		}

		var thStyle = {
			textAlign: 'center',
			cursor:'pointer'
		}

		var iconStyle = {
			float:'right', 
			color:'#CCCCCC',
		}
		
		if(this.props.buttons) {
			var voices = this.props.data;
		}

		if(this.props.data) {
			var _this = this;

			var json_length = this.props.data.length;
			/**
			 * sorting the json on click of th tag
			 */
			if(this.state.sort_tag) {
				this.props.data.sort(function(clip1,clip2){

					if(_this.state.sort_ascending){
						return (clip1[_this.state.sort_tag] > clip2[_this.state.sort_tag]) ? 1 : ((clip1[_this.state.sort_tag] < clip2[_this.state.sort_tag]) ? -1 : 0);
					}
					else {
						return (clip2[_this.state.sort_tag] > clip1[_this.state.sort_tag]) ? 1 : ((clip2[_this.state.sort_tag] < clip1[_this.state.sort_tag]) ? -1 : 0);
					} 
				});
			}

			var current_page = _this.state.current_page;
			var select_value = _this.state.select_value;
			var start_range =  select_value * (current_page - 1);
			var end_range = select_value * (current_page);	

			var searched_items = this.props.data;

			/**
			 * [if description: if user searches for some value]
			 * @param  {[string]} _this.state.search_value [value for which the user searches for]
			 */
			if(_this.state.search_value!=null) {
				searched_items = [];
				this.props.data.map(function(data, index){
					if(_this.searchResult(data)) {
						searched_items.push(data);
					}
				});
				json_length = searched_items.length;
			}

			start_index = start_range + 1;
			end_index = (end_range > json_length) ? json_length : end_range;


			/**
			 * [creating tr elements for displaying them in the table]
			 */
			var trItems = searched_items.map(function(data, index) {

				if( start_range <=index  && index < end_range) {

						return React.createElement(trItem, {actions:_this.props.actions, flag:_this.props.width_style, tdData:data, key:index, tags:_this.props.tags});
				}
			});
		}

		/**
		 * create heading elements in the table
		 */
		if(this.props.tags) {
			var _this = this;
			var faIcon = "fa fa-sort";

			if(this.state.sort_ascending && this.state.sort_tag) {
				faIcon = "fa fa-sort-asc";
			}
			else if(!this.state.sort_ascending && this.state.sort_tag) {
				faIcon = "fa fa-sort-desc";
			} 

			//th elements for selected fields in json
			var thItems = this.props.tags.map(function(data, index) {
				data = data.replace('_', ' ');
				var icon = (data == _this.state.sort_tag) ? faIcon : "fa fa-sort";
				return <th style={thStyle} onClick={_this.thOnClick.bind(_this,data)} >
						<span>{data.toUpperCase()}</span>
						<i style={iconStyle} className= {icon} aria-hidden="true"></i>
					</th>
			});


			//Creating extra th elements for action buttons
			$.each(this.props.actions, function( index, value ) {
				thItems.push(<th style={thStyle}></th>);
			});
		}	


		return (

			<div>
				<div className="row">
					<div className="col-md-1">
						<select onChange={this.selectChange} className="form-control">
							<option value="10">10</option>
							<option value="25">25</option>
							<option value="50">50</option>
							<option value="100">100</option>
						</select>
					</div>
					<div className="col-md-3 pull-right">
						<InputField placeholder="search" keyup={this.searchTags}/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<table className="table table-striped table-bordered dataTable no-footer" style={tableStyle}>
							<thead>
								<tr>{thItems}</tr>
							</thead>
							<tbody>
								{trItems}
							</tbody>
						</table>
					</div>
				</div>
			    <div className="row">
			    	<div className="col-md-6">
			    		Showing {start_index} to {end_index} of {json_length} entries
			    	</div>
			    	<div className="col-md-6">
			    		<Pagination current_page={this.state.current_page} action={this.handlePagination} length={json_length} elements_per_page={this.state.select_value}/>
			    	</div>
			    </div>

			</div>

			)
	}

});