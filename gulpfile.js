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