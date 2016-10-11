const gulp         = require('gulp'),
      babel        = require('gulp-babel'),
      sass         = require('gulp-sass'),
      concat       = require('gulp-concat'),
      uglifyjs     = require('gulp-uglifyjs'),
      autoprefixer = require('gulp-autoprefixer'),
      uglifycss    = require('gulp-uglifycss'),
      imagemin     = require('gulp-imagemin'),
      pngquant     = require('imagemin-pngquant'),
      cache        = require('gulp-cache'),
      webserver    = require('gulp-webserver'),
      refresh      = require('gulp-refresh');

gulp.task('start', () => {
    gulp.src('./client/')
        .pipe(webserver({
            livereload: true,
            directoryListning: true,
            open: true
        }));
});

gulp.task('babel', () => {
    return gulp.src(['client/js/app.js',
                     'client/js/controllers/*.js',
                     'client/js/services/*.js',
                     'client/directives/**/*.js',
                     'client/js/appConfig.js'])
        .pipe(concat('bundle.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('client/js/build'));
});

gulp.task('scripts', () => {
    return gulp.src(['client/libraries/angular.js',
                     'client/libraries/angular-route.js',
                     'client/libraries/*.js'])
            .pipe(concat('libs.min.js'))
            .pipe(uglifyjs())
            .pipe(gulp.dest('client/libraries/build'));
});

gulp.task('styles', () => {
    return gulp.src(['client/libraries/reset/css',
                     'client/libraries/bootstrap-theme.css',
                     'client/libraries/bootstrap.css',
        ])
        .pipe(concat('libs.min.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('client/libraries/build'));
});

gulp.task('sass', () => {
    return gulp.src(['client/styles/sass/*.scss'])
        .pipe(concat('build.scss'))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%', 'ie 9']
        }))
        .pipe(uglifycss())
        .pipe(gulp.dest('client/styles/css/build'));
});

gulp.task('img', () => {
  return gulp.src(['client/resources/graphic/*.png',
                   'client/resources/graphic/*.gif',
                   'client/resources/graphic/*.jpg'])
        .pipe(cache(imagemin({
          interlaced: true,
          pogressive: true,
          svgoPlugins: [{removeViewBox: false}],
          une: [pngquant()]
        })))
        .pipe(gulp.dest('resources/min'));
});

gulp.task('refresh', () => {
    refresh();
});

gulp.task('clean', () => {
    return cache.clearAll;
});

gulp.task('watch', () => {
    gulp.watch('client/styles/css/fonts.css', ['refresh']);
    gulp.watch('client/styles/sass/*.scss', ['sass']);
    gulp.watch('client/js/**/*.js', ['babel']);
    gulp.watch('client/libraries/*.js', ['scripts']);
    gulp.watch('client/libraries/*css', ['styles']);
    gulp.watch('client/resources/*', ['img']);
});

gulp.task('default', ['babel', 'scripts', 'styles', 'sass', 'img']);