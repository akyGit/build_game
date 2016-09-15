/**
 * Created by Aky on 15.09.2016.
 */
var gulp = require('gulp');
var bower = require('gulp-bower');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var requirejsOptimize = require('gulp-requirejs-optimize');

gulp.task('bower', function() {
    return bower();
});

gulp.task('default', ['bower'], function() {
    gulp.src("./js/src/**/*.js").
        pipe(requirejsOptimize()).
        pipe(gulp.dest("./js/build")).
        pipe(concat("build_game.js")).
        pipe(gulp.dest("./js/build")).
        pipe(rename("build_game.min.js")).
        pipe(uglify()).
        pipe(gulp.dest("./js/build"));
});