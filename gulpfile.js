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
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListning: true,
            open: true
        }));
});

gulp.task('babel', () => {
    return gulp.src(['js/app.js',
                     'js/controllers/*.js',
                     'js/services/*.js',
                     'directives/**/*.js',
                     'js/appConfig.js'])
        .pipe(concat('bundle.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('js/build'));
});

gulp.task('scripts', () => {
    return gulp.src('libraries/*.js')
            .pipe(concat('libs.min.js'))
            .pipe(uglifyjs())
            .pipe(gulp.dest('libraries/build'));
});

gulp.task('styles', () => {
    return gulp.src(['libraries/reset/css',
                     'libraries/bootstrap-theme.css',
                     'libraries/bootstrap.css',
        ])
        .pipe(concat('libs.min.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('libraries/build'));
});

gulp.task('sass', () => {
    return gulp.src(['styles/sass/*.scss'])
        .pipe(concat('build.scss'))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%', 'ie 9']
        }))
        .pipe(uglifycss())
        .pipe(gulp.dest('styles/css/build'));
});

gulp.task('img', () => {
  return gulp.src(['resources/graphic/*.png',
                   'resources/graphic/*.gif',
                   'resources/graphic/*.jpg'])
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
    gulp.watch('styles/css/fonts.css', ['refresh']);
    gulp.watch('styles/sass/*.scss', ['sass']);
    gulp.watch('js/**/*.js', ['babel']);
    gulp.watch('libraries/*.js', ['scripts']);
    gulp.watch('libraries/*css', ['styles']);
    gulp.watch('resources/*', ['img']);
});

gulp.task('default', ['babel', 'scripts', 'styles', 'sass', 'img']);