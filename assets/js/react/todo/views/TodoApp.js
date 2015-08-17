var TodoItem = require( "./TodoItem.js" ),
    EntryTodo = require( "./EntryTodo.js" );

var TodoApp = React.createClass( {

    render: function(){

        var items = this.props.todos.models.map( function( todo ){
            return <TodoItem todo={todo} key={todo.id} />;
        }, this );

        return (
            <div>
                <ul>
                    {items}
                </ul>
                <EntryTodo todos={this.props.todos} />
            </div>
        );
    }
} );

module.exports = TodoApp;