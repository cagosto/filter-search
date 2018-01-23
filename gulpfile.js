var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  browserify = require('browserify'),
  babelify = require('babelify'),
  buffer = require('vinyl-buffer'),
  source = require('vinyl-source-stream'),
  plugins = require('gulp-load-plugins'),
  uglify = require('gulp-uglify'),
  gulpif = require('gulp-if'),
  gutil = require('gulp-util'),
  gulpSequence = require('gulp-sequence'),
  babel = require('gulp-babel-compile'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass');

var config = {
  production: !!gutil.env.prod
};

gulp.task('browserSync', ['scripts'], function() {
  browserSync.init({
    server: {
      baseDir: "./demo"
    }
  });
  gulp.watch("./js/**/**.js", ['scripts']);
  gulp.watch("./scss/**/**.scss", ['sass']);
  gulp.watch("./demo/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: [
        'last 1 versions',
      ],
      cascade: false
    }))
    .pipe(gulp.dest('./demo/css'));
});

var srcFile = './js/index.js';

gulp.task('scripts', () => {
  browserify({
    'entries': [srcFile],
    'debug': true,
    'paths': ['./js/'],
    'transform': [
      babelify.configure({
        'presets': ['env', 'react', 'stage-2']
      })
    ]
  })
  .bundle()
  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
  .pipe(source('index.js'))
  .pipe(buffer())
  .pipe(plugins().sourcemaps.init({
    'loadMaps': true
  }))
  .pipe(plugins().sourcemaps.write('.'))
  .pipe(gulp.dest('./demo/js/'))
  .pipe(browserSync.stream());
});

gulp.task('scripts-cjs', () => {
  gulp.src('js/active-scroll.js')
    .pipe(babel({
      presets: ['env', 'react', 'stage-2'],
      plugins: ["transform-es2015-modules-commonjs"]
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', gulpSequence('browserSync'));
gulp.task('build', gulpSequence('scripts-cjs'));
