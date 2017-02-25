const gulp = require('gulp');
const concat = require('gulp-concat');
const changed = require('gulp-changed');
// 出错不中断gulp
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const series = require('stream-series');
// const rename = require('gulp-rename');
// const zipjs = require('gulp-uglify');
// const zipcss = require('gulp-minify-css');
// const htmlmin = require('gulp-htmlmin');
const watch = require('gulp-watch');
const flatten = require('gulp-flatten');
const runSequence = require('run-sequence');

const inject = require('gulp-inject');
const clean = require('gulp-clean');
const livereload = require('gulp-livereload')

const codebase = './build'

let files = {};

gulp.task('clean', function() {
  return gulp.src('./build', { read: false })
    .pipe(clean());
});

gulp.task('vendor', function() {
  gulp.src(['./vendor/**/fonts/**.*'])
    .pipe(flatten())
    .pipe(gulp.dest(codebase + '/vendor/fonts'));

  files.vendorScript =
    gulp.src(['./vendor/angular/angular.min.js', './vendor/jquery/jquery.min.js', './vendor/**/*.js'])
    .pipe(changed(codebase))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(codebase + '/vendor/js'));

  files.vendorStyle =
    gulp.src(['./vendor/**/*.css'])
    .pipe(changed(codebase))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(codebase + '/vendor/css'));

});

gulp.task('html', function() {
  gulp.src(['./src/**/*.html'])
    .pipe(plumber())
    .pipe(changed(codebase))
    .pipe(gulp.dest(codebase));
});

gulp.task('src-js', function() {
  files.js =
    gulp.src(['./src/**/*.js'])
    .pipe(changed(codebase))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(codebase));
});

gulp.task('src-css', function() {
  files.css =
    gulp.src(['./src/**/*.css'])
    .pipe(changed(codebase))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(codebase));
});

gulp.task('inject', function() {
  gulp.src('./src/index.html')
    .pipe(inject(files.vendorStyle, { name: 'vendor', ignorePath: 'build' }))
    .pipe(inject(files.vendorScript, { name: 'vendor', ignorePath: 'build' }))
    .pipe(inject(files.css, { name: 'css', ignorePath: 'build' }))
    .pipe(inject(files.js, { name: 'js', ignorePath: 'build' }))
    .pipe(gulp.dest(codebase));
})

// 开发时，使用watch监测变化并重新build
gulp.task('default', ['build'], function() {
  // livereload.listen();
  gulp.watch(['./src/**/*.html'], ['html']);
  gulp.watch(['./src/**/*.css'], ['src-css']);
  gulp.watch(['./src/**/*.js'], ['src-js']);
});

gulp.task('build', function() {
  runSequence('clean', 'html', 'vendor', 'src-css', 'src-js', 'inject')
})
