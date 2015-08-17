var TodoItem = require( "./TodoItemModel.js" );

class TodoItemCollection extends EventEmitter {
    constructor(){
        super();
        this.models = [];
        this.idCount = 1;
    }

    emitChange(){
        this.emit( "change" );
    }

    add( text ){
        var todoItem = new TodoItem( text, this.idCount++ );
        todoItem.on( "change", this.emitChange.bind( this ) );

        this.models.push( todoItem );
        this.emitChange();
    }
}

module.exports = TodoItemCollection;