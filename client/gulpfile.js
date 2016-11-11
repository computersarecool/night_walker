const wiredep = require('wiredep').stream
const gulp = require('gulp')
const useref = require('gulp-useref')
const gulpIf = require('gulp-if')
const uglify = require('gulp-uglify')
const stylus = require('gulp-stylus')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const rename = require('gulp-rename')
const del = require('del')
const dist = '../server/dist'

// keep dependencies up to date with bower.json
gulp.task('bower', () => {
  return gulp.src('app/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('app/'))
})

// update stylus
gulp.task('stylus', () => {
  del('app/styles/main.css').then(() => gulp.src('app/styles/source.styl')
    .pipe(stylus())
    .pipe(autoprefixer({
      browsers: ['last 5 versions']
    }))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('app/styles/'))
  )
})

// go through the <!--build: blocks and concat / minify and update references
gulp.task('useref', () => {
  return gulp.src('app/index.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest(dist))
})

// delete the already existing dist folder
gulp.task('clean:dist', () => {
  return del.sync(dist)
})

gulp.task('default', ['bower'])
