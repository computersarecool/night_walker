const wiredep = require('wiredep').stream
const gulp = require('gulp')

gulp.task('bower', () => {
  gulp.src('app/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('app'))
})
gulp.task('default', ['bower'])
