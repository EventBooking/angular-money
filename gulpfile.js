var gulp = require('gulp'),
    concat = require('gulp-concat'),
    dest = 'dist';

gulp.task('clean', clean);
gulp.task('postTsc', postTsc);

function clean(cb) {
    var del = require('del');
    del(dest, function () {
        del('test/**/*.js', cb);
    });
}

function stripRefs(src, dest, name) {
    var strip = require("gulp-strip-comments");

    return gulp.src(src)
        .pipe(strip())
        .pipe(concat(name))
        .pipe(gulp.dest(dest));
}

function postTsc() {
    var project = require('./package.json');
    stripRefs(dest + '/' + project.name + '.debug.d.ts', dest, '/' + project.name + '.d.ts');
    stripRefs(dest + '/' + project.name + '.debug.js', dest, '/' + project.name + '.js');
}