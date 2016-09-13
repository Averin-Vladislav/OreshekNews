const gulp         = require('gulp'),
      babel        = require('gulp-babel'),
      sass         = require('gulp-sass'),
      concat       = require('gulp-concat'),
      uglifyjs     = require('gulp-uglifyjs'),
      autoprefixer = require('gulp-autoprefixer'),
      uglifycss    = require('gulp-uglifycss');

 
gulp.task('babel', () => {
    return gulp.src('js/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('js/build'));
});

gulp.task('scripts', () => {
    return gulp.src(['libraries/angular.min.js',
                     'libraries/jquery-3.1.0.min.js'])
            .pipe(concat('libs.min.js'))
            .pipe(uglifyjs())
            .pipe(gulp.dest('libraries/build'));
});

gulp.task('styles', () => {
    return gulp.src(['libraries/reset/css',
                     'libraries/bootstrap-theme.css',
                     'libraries/bootstrap.css',])
        .pipe(concat('libs.min.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('libraries/build'));
});

gulp.task('sass', () => {
    return gulp.src('sass/style.scss')
        .pipe(sass())
        .pipe(gulp.src('css/style.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(uglifycss())
        .pipe(gulp.dest('css/build'));
});

gulp.task('watch', () => {
    gulp.watch('sass/style.scss', ['sass']);
    gulp.watch('js/app.js', ['babel']);
    gulp.watch('libraries/*.js', ['scripts']);
    gulp.watch('libraries/*css', ['styles']);
});