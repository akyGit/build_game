var gulp    = require('gulp'),
    bower   = require('gulp-bower'),
    concat  = require('gulp-concat'),
    rename  = require('gulp-rename'),
    uglify  = require('gulp-uglify'),
    changed = require('gulp-changed'),
    maps    = require('gulp-sourcemaps'),
    clean   = require( 'gulp-clean' ),
    requirejsOptimize = require('gulp-requirejs-optimize');

var SRC         = "./js/src/**/*.js",
    DEST        = "./js/build",
    DEST_BIN    = DEST + "/bin",
    CONCAT_NAME = "build_game.js",
    MINIFY_NAME = "build_game.min.js";

gulp.task('bower', function() {
    return bower();
});

gulp.task('concat:js', function(){
    return gulp.src(SRC)
        .pipe(requirejsOptimize())
        .pipe(concat(CONCAT_NAME))
        .pipe(gulp.dest(DEST_BIN));
});

gulp.task('minify:js', ['concat:js'], function() {
    return gulp.src(DEST_BIN + '/' + CONCAT_NAME)
        .pipe(maps.init())
        .pipe(rename(MINIFY_NAME))
        .pipe(uglify())
        .pipe(maps.write("./"))
        .pipe(gulp.dest(DEST_BIN));
});

gulp.task('clean', function() {
   return gulp.src(DEST, { read: false })
    .pipe(clean());
});

gulp.task('watch', function(){
   return gulp.watch(SRC, ['minify:js'],function(event){
   });
});

gulp.task('default', ['clean','bower','minify:js'], function() {

});