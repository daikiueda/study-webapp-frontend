const SETTINGS = {
    JS_LIBS: {
        SRC: [
            "./bower_components/eventemitter3/index.js",
            "./bower_components/react/react.js"
        ],
        DEST: "../public/react/js"
    },
    JS: { SRC: "./js/react/todo/app.js", DEST: "../public/react/js/todo" }

    //JS: { SRC: "./js/*.js", DEST: "../public/js" }
};


var gulp = require( "gulp" ),
    runSequence = require('run-sequence' ),
    buffer = require( "vinyl-buffer" ),
    babel = require( "babelify" ),
    concat = require( "gulp-concat" ),
    uglify = require( "gulp-uglify" ),
    watchify = require( "gulp-watchify" ),
    browserSync = require( "browser-sync" ).create();

gulp.task( "build", function( callback ){
    // ToDo: clean
    runSequence( [ "build:jsLibs", "build:js" ], callback  );
} );


gulp.task( "build:jsLibs", function(){
    gulp.src( SETTINGS.JS_LIBS.SRC )
        .pipe( uglify() )
        .pipe( concat( "libs.js" ) )
        .pipe( gulp.dest( SETTINGS.JS_LIBS.DEST ) );
} );


// Hack to enable configurable watchify watching
var watching = false;
gulp.task( "enable-watch-mode", function(){ watching = true } );

// Browserify js files
gulp.task( "build:js", watchify( function( watchify ){
    return gulp.src( SETTINGS.JS.SRC )
        .pipe( watchify( { watch: watching, transform: babel } ) )
        .pipe( buffer() )
        .pipe( uglify() )
        .pipe( gulp.dest( SETTINGS.JS.DEST ) );
} ) );

gulp.task( "watchify", [ "enable-watch-mode", "build:js" ] );


gulp.task( "browserSync", function(){
    browserSync.init( {
        server: {
            baseDir: "../public/"
        }
    } );

    return gulp.watch( "../public/**/*.*" ).on( "change", browserSync.reload );
} );


// Rerun tasks when a file changes
gulp.task( "server", function( callback ){
    runSequence( "build", "watchify", "browserSync", callback  );
} );


// The default task (called when you run `gulp` from cli)
gulp.task( "default", [ "build:js" ] );