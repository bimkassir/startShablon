var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    babel = require('gulp-babel'),
    plumber = require('gulp-plumber'),
    // imagemin = require('gulp-imagemin'),
    // pngquant  = require('imagemin-pngquant'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    csscomb = require('gulp-csscomb');

var paths = {
  html:['./src/index.html'],
  css:['./src/css/main.less'],
  script:['./src/js/main.js'],
  images:['./src/images/*']
};

gulp.task('html', function(){
  gulp.src(paths.html)
  .pipe(gulp.dest('./build'))
  .pipe(reload({stream:true}));
});

gulp.task('css', function(){
  return gulp.src(paths.css)
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(csscomb())
    .pipe(gulp.dest('./build/css'))
    .pipe(gulp.dest('./src/css'))
    .pipe(reload({stream:true}));
});

gulp.task('scripts', function(){
  return gulp.src(paths.script)
    .pipe(plumber())
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('./build/js'))
    .pipe(reload({stream:true}));
});

gulp.task('images', function() {
  return gulp.src(paths.images)
    // .pipe(imagemin({
    //   progressive: true,
    //   svgoPlugins: [{removeViewBox: false}],
    //   use: [pngquant()],
    //   interlaced: true
    // }))
    .pipe(gulp.dest('./build/images/'))
    .pipe(reload({stream:true}));
});

gulp.task('watcher',function(){
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.script, ['scripts']);
});

gulp.task('build', [
    'html',
    'css',
    'images',
    'scripts'
]);

gulp.task('browserSync', function() {
  browserSync({
    server: { baseDir: "./src/" },
    port: 3000,
    open: true,
    notify: false
  });
});


gulp.task('default', ['watcher', 'browserSync']);