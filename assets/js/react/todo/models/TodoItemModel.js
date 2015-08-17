class TodoItemModel extends EventEmitter {
    constructor( text, id ){
        super();
        this.text = text;
        this.id = id;
    }

    update( text ){
        this.text = text;
        this.emit( "change" );
    }
}

module.exports = TodoItemModel;