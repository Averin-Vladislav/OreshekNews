const gulp   = require('gulp'),
      babel  = require('gulp-babel'),
      sass   = require('gulp-sass'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglifyjs');
 
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
            .pipe(uglify())
            .pipe(gulp.dest('libraries/build'));
});

gulp.task('sass', () => {
    return gulp.src('sass/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

gulp.task('watch', () => {
    gulp.watch('sass/style.scss', ['sass']);
    gulp.watch('js/app.js', ['babel']);
    gulp.watch('libraries/*.js', ['scripts']);
});