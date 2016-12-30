const wiredep = require('wiredep').stream
const gulp = require('gulp')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const useref = require('gulp-useref')
const gulpIf = require('gulp-if')
const uglify = require('gulp-uglify')
const stylus = require('gulp-stylus')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const rename = require('gulp-rename')
const del = require('del')
const dist = '../dist/'
const build = '../build/'

// keep dependencies up to date with bower.json
gulp.task('wiredep', () => {
  return gulp.src('app/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest(build))
})

// transpile stylus, prefix and place css
// TODO: Add sourcemaps
gulp.task('stylus', () => {
  return gulp.src('app/styles/source.styl')
    .pipe(stylus())
    .pipe(autoprefixer({
      browsers: ['last 5 versions']
    }))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('app/styles/'))
})

// transpile js into 2015
gulp.task('babel', () => {
  return gulp.src('app/scripts/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('build/'))
})

// go through the <!--build: blocks and concat then minify and update references
// TODO: Make this move from build to production
gulp.task('useref', () => {
  return gulp.src('app/index.html')
    .pipe(useref())
    .pipe(sourcemaps.init())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest(dist))
})

// delete the already existing dist folder
gulp.task('clean:dist', () => {
  return del.sync(dist)
})

gulp.task('default', ['wiredep'])
