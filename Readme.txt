React Datatables using bootstrap.

1. Datatable component has been developed with React.js which is very easy to integrate with your react code.
2. Styling has been done with bootstrap.

Example: 

<DataTable 
    tags= {['mp3_url', 'poster_url', 'transcript', "language"]} 
    actions={[{'name': 'Edit', 'function': this.edit, 'btn_class':'btn btn-primary'}, {'name': 'Alert', 'function':  this.alert, 'btn_class':'btn btn-danger'}]} 
    data = {this.state.json_object} />

Features.
1. Takes JSON and column names which have to displayed in the json as the input
2. Has search as well as sort functionalities
3. Pagination has been implemented for the users to view the data in a friendly manner.
4. External functions can also be called from the data-table. Action buttons have been implemented for using the external functions.
5. Data table is compatible with images, text and audio files.


Run the code:
1. clone the project
2. npm install
3. npm run and open localhost:2222 in your local system.


Still working on it. Happy coding :) ! 