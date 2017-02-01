const path = require('path')
const gulp = require('gulp')
const del = require('del')
const standard = require('gulp-standard')
const wiredep = require('wiredep').stream
const ngAnnotate = require('gulp-ng-annotate')
const stylus = require('gulp-stylus')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const useref = require('gulp-useref')
const googlecdn = require('gulp-google-cdn')
const cssnano = require('gulp-cssnano')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const pump = require('pump')
const uglify = require('gulp-uglify')
const dist = '../dist/'

// delete the already existing dist folder
gulp.task('clean:dist', () => {
  return del.sync(dist, {force: true})
})

// check js
gulp.task('standard', () => {
  return gulp.src(['app/*.js, app/**/*.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
})

gulp.task('ngAnnotate', () => {
  return gulp.src(['app/*.js', 'app/**/*.js'])
    .pipe(ngAnnotate())
    .pipe(gulp.dest(dist))
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
gulp.task('minify:iamges', () => {
  gulp.src('app/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(path.join(dist, 'images')))
})

gulp.task('minify:html', () => {
  return gulp.src(path.join(dist, '**/*.html'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(dist))
})

gulp.task('minify:js', callback => {
  pump([
    gulp.src(path.join(dist, '/**/.js')),
    uglify(),
    gulp.dest(dist)
  ], callback)
})

gulp.task('minify:css', () => {
  return gulp.src(path.join(dist, '/**/main.css'))
    .pipe(sourcemaps.init())
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist))
})

gulp.task('default', ['wiredep'])
gulp.task('prep', ['clean:dist', 'standard', 'ngMin', 'wiredep', 'stylus', 'useref'])
gulp.task('minPrep', ['prep', 'minify:images', 'minify:html', 'minify:js', 'minify:css'])
gulp.task('final', ['minPrep'])
