// NEED: Usemin, imagemin, svgmin, htmlmin, ngmin, karma
const path = require('path')
const gulp = require('gulp')
const del = require('del')
const standard = require('gulp-standard')
const wiredep = require('wiredep').stream
const stylus = require('gulp-stylus')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const useref = require('gulp-useref')
const googlecdn = require('gulp-google-cdn')
const cssnano = require('gulp-cssnano')
const htmlmin = require('gulp-htmlmin')
const uglify = require('gulp-uglify')
const dist = '../dist/'

// delete the already existing dist folder
gulp.task('clean:dist', () => {
  return del.sync(dist, {force: true})
})

// copy app directory
// gulp.task('copyApp', () => {
//  return gulp.src(['app/**/*'])
//    .pipe(gulp.dest(dist))
// })
//
// copy bower_components directory
// gulp.task('copyBower', () => {
//  return gulp.src(['bower_components/**/*'])
//    .pipe(gulp.dest(path.join(dist, '..', 'bower_components')))
// })

// check js
gulp.task('standard', () => {
  return gulp.src(['app/**/*.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
})

// keep dependencies up to date with bower.json by filling in <!--bower:--> blocks
gulp.task('wiredep', () => {
  return gulp.src('app/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest(dist))
})

// make all bower references to google cdn
gulp.task('cdn', () => {
  return gulp.src('app/index.html')
    .pipe(googlecdn(require('./bower.json')))
    .pipe(gulp.des('dist'))
})

// transpile stylus, prefix and move css file
gulp.task('stylus', () => {
  return gulp.src('app/styles/source.styl')
    .pipe(stylus())
    .pipe(autoprefixer({
      browsers: ['last 5 versions']
    }))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('app/styles/'))
    .pipe(gulp.dest(path.join(dist, 'styles')))
})

// transpile js
gulp.task('babel', () => {
  return gulp.src('app/scripts/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(path.join(dist, 'scripts')))
})

// go through the <!--build:--> blocks and concat and update references
gulp.task('useref', () => {
  return gulp.src(path.join(dist, 'index.html'))
    .pipe(useref({searchPath: ['client', 'client/app']}))
    .pipe(gulp.dest(dist))
})

// minifiers
gulp.task('minify:css', () => {
  return gulp.src('app/styles/main.css')
    .pipe(sourcemaps.init())
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist))
})

gulp.task('minify:html', () => {
  return gulp.src('app/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
})

gulp.task('default', ['wiredep'])
gulp.task('prep', ['clean:dist', 'standard', 'wiredep', 'stylus', 'useref'])
gulp.task('minPrep', ['clean:dist', 'standard', 'wiredep', 'stylus', 'useref', 'minify:css'])
gulp.task('final', ['clean:dist', 'standard', 'wiredep', 'stylus', 'useref'])
