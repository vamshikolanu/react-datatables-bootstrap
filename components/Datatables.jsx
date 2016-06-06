/** @jsx React.DOM */
/**
	this.props.data = coloums of the table to be displayed
	this.props.tags = headings of the table and key values in the json file
	this.props.actions = They are buttons which have to be displayed with [name: , action: ] feature where name atrr referst to name on the button

**/


'use strict'

var React = require('react')
var InputField = require('./InputField');
var BasicPlayer = require('./BasicPlayer');


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
})

/**
* Enlarges image when hovers on it 
*/
var EnlargeImageOnHover = React.createClass({
	getInitialState: function(){
		return {hover: false};
	},

	mouseEnter: function(){
		this.setState({hover: true});
	},

	mouseOut: function(){
		this.setState({hover: false});
	},

	/**
	* OnClick: This method will make sure it becomes small on click
	*/
	imgOnClick: function(){
		if(!this.state.hover) { 
			this.setState({hover: true});
		}
		else {
			this.setState({hover: false});
		}
	},

	render: function(){
		var Effectfront = {
  			border: 'none',
  			margin: '0 auto',
  			cursor: 'pointer',
  			zIndex: '1000'
		}
 		
		if(this.state.hover) {
			Effectfront['transform'] = 'scale(6)',
			Effectfront['transition'] = 'all 0.6s'
		}

		return(
			<img width="60" height="60" style={Effectfront} onClick={this.imgOnClick} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseOut} src={this.props.src} />
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
	 * check whether search box value is present in atleast on td element of tr.  
	 * @return {[boolean]}
	 */
	searchResult: function() {

		if(this.props.tdData) {

		 for(var key in this.props.tdData) {	

				if(this.props.tags.indexOf(key) != -1) {

          			var attrValue = String(this.props.tdData[key]);

          			var regex = new RegExp(this.props.search_value, 'gi');

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
	 * checks for tags and returns creates tr values of the given tags 
	 * @return {[none]}
	 */
	render: function() {
		
		var tdArray = [];

		if (this.props.tdData) {

			if (this.searchResult() || this.props.search_value == '') {

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
		return {search_value: '', sort_tag: '',sort_ascending: 'false'}
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
	 * renders view of datatable along with search box
	 * @return {[none]}
	 */
	render: function() {

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

			var _this = this

			/**
			 * sorting the json on click of th tag
			 */
			if(this.state.sort_tag) {

				this.props.data.sort(function(clip1,clip2){
					return (_this.state.sort_ascending) ? clip1[_this.state.sort_tag] - clip2[_this.state.sort_tag] : clip2[_this.state.sort_tag] - clip1[_this.state.sort_tag]
				})
			}

			var trItems = this.props.data.map(function(data, index) {

				return React.createElement(trItem, {actions:_this.props.actions, flag:_this.props.width_style, search_value:_this.state.search_value, tdData:data, key:index, tags:_this.props.tags});

			});
		}

		/**
		 * create heading elements in the table
		 */
		if(this.props.tags) {
			var _this = this;

			//th elements for selected fields in json
			var thItems = this.props.tags.map(function(data, index) {
				return <th style={thStyle} onClick={_this.thOnClick.bind(_this,data)} >
						<span>{data}</span>
						<i style={iconStyle} className="fa fa-sort" aria-hidden="true"></i>
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
						<select className="form-control">
							<option value="5">5</option>
							<option value="20">20</option>
							<option value="50">50</option>
						</select>
					</div>
					<div className="col-md-3 pull-right">
						<InputField placeholder="search" keyup={this.searchTags}/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<table className="table table-bordered" style={tableStyle}>
							<thead>
								<tr>{thItems}</tr>
							</thead>
							<tbody>
								{trItems}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			)
	}

});