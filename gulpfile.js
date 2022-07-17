const { src, dest, task, series, watch} = require('gulp');
const rm = require( 'gulp-rm' );
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const styles = [
  "node_modules/normalize.css/normalize.css",
  "src/styles/main.scss"
];

const scripts = [
  "src/scripts/*.js",
  "!src/scripts/slider.js",
];

const scriptsCopy = [
  "src/scripts/jquery-3.6.0.min.js",
  "src/scripts/slider.js"
];

task('clean', () => {
  return src( 'dist/**/*', { read: false }).pipe(rm());
});

task('copy:html', () => {
  return src('src/*.html').pipe(dest('dist')).pipe(reload({stream:true}));
});

task('copy:img', () => {
  return src('src/img/*').pipe(dest('dist/img'));
});

task('copy:scripts', () => {
  return src(scriptsCopy).pipe(dest('dist/scripts'));
});

task('copy:svg', () => {
  return src('src/svg/sprite.svg').pipe(dest('dist/svg'));
});

task('styles', () => {
  return src(styles)
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(env === 'prod',gcmq()))
    .pipe(gulpif(env === 'prod',cleanCSS()))
    .pipe(gulpif(env === 'dev',sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(reload({stream:true}))
});



task('scripts',()=>{
  return src(scripts)
    .pipe(gulpif(env === 'dev',sourcemaps.init()))
    .pipe(concat('main.min.js', {newLine: ";"}))
    .pipe(gulpif(env === 'prod',uglify()))
    .pipe(gulpif(env === 'dev',sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(reload({stream:true}))
})

task('server', () => {
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
      open: false
  });
});

watch ("./src/styles/**/*.scss", series("styles"));
watch ("./src/*.html", series("copy:html"));
watch ("./src/scripts/*.js", series("scripts"));

task("default", series("clean", "copy:html", "copy:svg", "copy:scripts", "copy:img", "styles", "scripts", "server"));