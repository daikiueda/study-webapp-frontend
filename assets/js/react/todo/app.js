var TodoItemCollection = require( "./models/TodoItemCollection.js" ),
    TodoApp = require( "./views/TodoApp.js" ),

    todos = new TodoItemCollection();

todos.add( "hoge" );
todos.add( "fuga" );

function render(){
    React.render( <TodoApp todos={todos} />, document.getElementById( "app" ) );
}

todos.on( "change", render );

render();