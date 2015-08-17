var TodoItem = React.createClass( {

    getInitialState: function(){
        return {
            editing: false,
            todoText: this.props.todo.text
        }
    },

    onEditStart: function(){
        this.setState( { editing: true } );
    },

    onEditEnd: function( ev ){
        if( ev ){ ev.preventDefault(); }
        this.props.todo.update( this.state.todoText );
        this.setState( { editing: false } );
    },

    editText: function( ev ){
        this.setState( { todoText: ev.target.value } );
    },

    render: function(){
        if( this.state.editing ){
            return (
                <li>
                    <form onSubmit={this.onEditEnd}>
                        <input type="text" value={this.state.todoText} onChange={this.editText} onBlur={this.onEditEnd} />
                    </form>
                </li>
            );
        }
        return <li onDoubleClick={this.onEditStart}>{this.state.todoText}</li>;
    }
} );

module.exports = TodoItem;