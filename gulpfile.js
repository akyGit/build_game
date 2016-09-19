var fs      = require('fs-extra'),
    gulp    = require('gulp'),
    bower   = require('gulp-bower'),
    concat  = require('gulp-concat'),
    rename  = require('gulp-rename'),
    uglify  = require('gulp-uglify'),
    changed = require('gulp-changed'),
    maps    = require('gulp-sourcemaps'),
    clean   = require('gulp-clean'),
    requirejsOptimize = require('gulp-requirejs-optimize');

var SRC         = "js/src/**/*.js",
    DEST        = "js/build/",
    DEST_BIN    = DEST + "/bin/",
    CONCAT_NAME = "build_game.js",
    MINIFY_NAME = "build_game.min.js",
    MUSIC_PATH  = "music/",
    WWW_PATH    = "www/",
    LIBS_PATH   = "js/libs/";

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
    return gulp.src([DEST, WWW_PATH], { read: false })
        .pipe(clean());
});

gulp.task('watch', function(){
    return gulp.watch(SRC, ['minify:js'],function(event){
    });
});

gulp.task('default', ['clean','bower','minify:js'], function() {

});

gulp.task('build:deploy', ['clean', 'bower', 'minify:js'], function() {

    fs.mkdirs(WWW_PATH, function (error) {
        if(error) return console.error(error);
        fs.copy("index.html", WWW_PATH + "index.html", function (error) {
            if(error) return console.error(error);
            console.log("Success copy " + "index.html" + " to " + WWW_PATH);
        });
    });

    fs.mkdirs(WWW_PATH + MUSIC_PATH, function (error) {
        if(error) return console.error(error);
        fs.copy(MUSIC_PATH, WWW_PATH + MUSIC_PATH, function(error) {
            if(error) return console.error(error);
            console.log("Success copy " + MUSIC_PATH + " directory to " + WWW_PATH + MUSIC_PATH);
        });
    });

    fs.mkdirs(WWW_PATH + DEST_BIN, function (error) {
        if(error) return console.error(error);
        fs.copy(DEST_BIN, WWW_PATH + DEST_BIN, function(error){
            if(error) return console.error(error);
            console.log("Success copy " + DEST_BIN + " directory to " + WWW_PATH + DEST_BIN);
        });
    });

    fs.mkdirs(WWW_PATH + "/js/libs", function (error) {
        if(error) return console.error(error);
        fs.copy(LIBS_PATH, WWW_PATH + "/js/libs", function(error){
            if(error) return console.error(error);
            console.log("Success copy " + LIBS_PATH + " directory to " + WWW_PATH + "/js");
        });
    });

});