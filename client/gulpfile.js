const wiredep = require('wiredep').stream
const gulp = require('gulp')
const useref = require('gulp-useref')
const gulpIf = require('gulp-if')
const uglify = require('gulp-uglify')
const stylus = require('gulp-stylus')
const cssnano = require('gulp-cssnano')
const rename = require('gulp-rename')
const del = require('del')
const nib = require('nib')
const dist = '../server/dist'

gulp.task('bower', () => {
  return gulp.src('app/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('app'))
})

gulp.task('stylus', () => {
  del('app/styles/main.css').then(() => gulp.src('app/styles/source.styl')
    .pipe(stylus({use: [nib()]}))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('app/styles/'))
  )
})

gulp.task('clean:dist', () => {
  return del.sync(dist)
})

// this will go through the <!--build: blocks and concat and update references
gulp.task('useref', () => {
  return gulp.src('app/index.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest(dist))
})

gulp.task('default', ['bower'])
