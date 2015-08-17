var EntryToDo = React.createClass( {

    onEditEnd: function( ev ){
        ev.preventDefault();
        var todoTextField = React.findDOMNode( this.refs.todoText );
        this.props.todos.add( todoTextField.value );
        todoTextField.value = "";
    },

    render: function(){
        return (
            <form onSubmit={this.onEditEnd}>
                <input type="text" ref="todoText" />
            </form>
        );
    }
} );

module.exports = EntryToDo;