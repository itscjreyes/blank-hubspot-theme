var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('styles', function () {
  return gulp.src('./custom/dev/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(concat('hs_default_custom_style.css'))
    .pipe(gulp.dest('./custom/styles/default/'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', function() {
  return gulp.src('./custom/dev/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('./custom/styles/default/'))
    .pipe(reload({stream: true}));
});

gulp.task('watch', function() {
  gulp.watch('./custom/dev/**/*.scss', ['styles']);
  gulp.watch('./custom/dev/*.js', ['scripts']);
  gulp.watch('./custom/**/**/*.html', reload);
});

gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: '127.0.0.1:8080'
  })
});

gulp.task('default', ['browser-sync','styles','scripts','watch']);