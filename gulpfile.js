'use strict';

// 1. self copy to _dist0
// 2. gulp ugly1
// 3. gulp setbust
// 4. gulp copy1 


// gulp copy0 && gulp ugly1 && gulp setbust && gulp copy1 && gulp rmdist

const gulp = require('gulp');
// const javascriptObfuscator = require('gulp-javascript-obfuscator');
const uglify = require('gulp-uglify-es').default;
const replace = require('gulp-replace');
const clean = require('gulp-clean');
const sfdCacheBust = 'bust=' + (new Date()).getTime();

gulp.task('copy0', function() {
    return gulp.src([
        './**/*', '!./node_modules/**', '!./_*/**', '!./package*', '!./gulpfile.js'
    ]).pipe(gulp.dest('_dist0/'));
});

// gulp.src([
//     'src/**/*',         //select all files
//     '!src/**/_*/',      //exclude folders starting with '_'
//     '!src/**/_*/**/*',  //exclude files/subfolders in folders starting with '_'
//   ])

gulp.task('ugly1', function() {
    return gulp.src('_dist0/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('_dist0'));
});

gulp.task('setbust', function() {
    return gulp.src('_dist0/**/*.*')
        .pipe(replace('{{version}}', sfdCacheBust))
        .pipe(gulp.dest('_dist0'));
});


gulp.task('copy1', function() {
    return gulp.src(['_dist0/**/*']).pipe(gulp.dest('../kareui_fabe/public/'));
});

gulp.task('rmdist', function() {
    return gulp.src('_dist0/*', { read: false })
        .pipe(clean());
});



/*


// gulp 설치 
npm install gulp -g
npm install gulp --save-dev

*/