// NEED: Usemin, standard, imagemin, sbgmin, htmlmin, ngmin, karma
const path = require('path')
const wiredep = require('wiredep').stream
const gulp = require('gulp')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const useref = require('gulp-useref')
const gulpIf = require('gulp-if')
const uglify = require('gulp-uglify')
const cssnano = require('gulp-cssnano')
const stylus = require('gulp-stylus')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const del = require('del')
const dist = '../dist/'
const build = '../build/'

// delete the already existing dist folder
gulp.task('clean:dist', () => {
  return del.sync(dist, {force: true})
})

gulp.task('clean:build', () => {
  return del.sync(build, {force: true})
})

// move bower_components directory
gulp.task('copyApp', () => {
  return gulp.src(['app/**/*'])
    .pipe(gulp.dest(build))
})

// move bower_components directory
gulp.task('copyBower', () => {
  return gulp.src(['bower_components/**/*'])
    .pipe(gulp.dest(path.join(build, '..', 'bower_components')))
})

// keep dependencies up to date with bower.json by filling in <!--build:--> blocks
gulp.task('wiredep', () => {
  return gulp.src('app/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest(build))
})

// transpile stylus, prefix and place css file
gulp.task('stylus', () => {
  return gulp.src('app/styles/source.styl')
    .pipe(stylus())
    .pipe(autoprefixer({
      browsers: ['last 5 versions']
    }))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('app/styles/'))
  //  .pipe(gulp.dest(path.join(build, 'styles')))
})

// transpile js
gulp.task('babel', () => {
  return gulp.src('app/scripts/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(path.join(build, 'scripts')))
})

// go through the <!--build:--> blocks and concat and update references
gulp.task('useref', () => {
  return gulp.src(path.join(build, 'index.html'))
    .pipe(useref({searchPath: ['client', 'client/app']}))
    .pipe(gulp.dest(build))
})

/*
TODO: Minify
gulp.task('useref', () => {
  return gulp.src('app/index.html')
    .pipe(useref())
    .pipe(sourcemaps.init())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest(dist))
})
*/

gulp.task('default', ['wiredep'])
gulp.task('build', ['clean:build', 'copyApp', 'copyBower', 'wiredep', 'stylus', 'babel'])
