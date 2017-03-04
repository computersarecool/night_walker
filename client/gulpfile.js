const path = require('path')
const gulp = require('gulp')
const replace = require('gulp-string-replace')
const awspublish = require('gulp-awspublish')
const accessKeyId = require('../credentials').aws_access_key_id
const secretAccessKey = require('../credentials').aws_secret_access_key
const region = 'us-west-2'
const del = require('del')
const runSequence = require('run-sequence')
const standard = require('gulp-standard')
const wiredep = require('wiredep').stream
const ngAnnotate = require('gulp-ng-annotate')
const stylus = require('gulp-stylus')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const useref = require('gulp-useref')
const cdnizer = require('gulp-cdnizer')
const cleanCSS = require('gulp-clean-css')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const pump = require('pump')
const uglify = require('gulp-uglify')
const dist = '../dist/'

// delete the already existing dist folder
gulp.task('clean:dist', () => {
  return del.sync(dist, {force: true})
})

gulp.task('replace', () => {
  gulp.src([path.join(dist, 'scripts', 'scripts.js')])
    .pipe(replace('https://api.optonox.com', 'https://api.nightwalker.clothing'))
    .pipe(gulp.dest(path.join(dist, 'scripts')))
})

// check js
gulp.task('standard', () => {
  return gulp.src(['app/**/*.js', '!app/bower_components/**'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: false
    }))
})

gulp.task('copyBower', () => {
  return gulp.src(['app/bower_components/**/*'])
    .pipe(gulp.dest(path.join(dist, 'bower_components')))
})

// keep dependencies up to date with bower.json by filling in <!--bower:--> blocks
gulp.task('wiredep', () => {
  return gulp.src('app/index.html', {base: './'})
    .pipe(wiredep())
    .pipe(gulp.dest('./'))
})

gulp.task('wiredepDist', () => {
  return gulp.src('app/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest(dist))
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

gulp.task('ngAnnotate', () => {
  return gulp.src(path.join(dist, '**/*.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest(dist))
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

// go through the <!--build:--> blocks and concat and update references
gulp.task('useref', () => {
  return gulp.src(path.join(dist, 'index.html'))
    .pipe(useref())
    .pipe(gulp.dest(dist))
})

// make all bower references to google cdn
gulp.task('cdnizer', () => {
  return gulp.src(path.join(dist, 'index.html'))
    .pipe(cdnizer({
      relativeRoot: __dirname,
      allowRev: false,
      bowerComponents: 'bower_components',
      files: [
        'cdnjs:angular.js:angular.min.js@1.5.0',
        'cdnjs:angular.js:angular-resource.min.js@1.5.0',
        'cdnjs:angular.js:angular-sanitize.min.js@1.5.0',
        'cdnjs:angular.js:angular-route.min.js@1.5.0'
      ]
    }))
    .pipe(gulp.dest(dist))
})

// minifiers
gulp.task('minify:images', () => {
  return gulp.src('app/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(path.join(dist, 'images')))
})

gulp.task('minify:html', () => {
  return gulp.src([path.join(dist, 'index.html'), 'app/**/*.html', '!app/index.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(dist))
})

gulp.task('minify:js', callback => {
  pump([
    gulp.src(path.join(dist, 'scripts', 'scripts.js'), {base: './'}),
    uglify(),
    gulp.dest('./')
  ], callback)
})

gulp.task('minify:css', () => {
  return gulp.src(path.join(dist, '/**/main.css'))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist))
})

gulp.task('replace', () => {

})

// add files to aws
gulp.task('aws', () => {
  const params = {
    Bucket: 'nightwalkerdotclothing'
  }

  const publisher = awspublish.create({
    region,
    accessKeyId,
    secretAccessKey,
    params
  })

  const headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  }

  return gulp.src(path.join(dist, '**'))
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter())
})

gulp.task('default', ['wiredep'])

gulp.task('prep', callback => {
  runSequence('clean:dist', 'standard', 'copyBower', 'wiredepDist', 'babel', 'ngAnnotate', 'stylus', 'useref', 'replace', callback)
})

gulp.task('cdnMin', callback => {
  runSequence('cdnizer', ['minify:images', 'minify:html', 'minify:js', 'minify:css'])
})
