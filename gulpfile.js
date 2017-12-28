var gulp = require('gulp')
var sass = require('gulp-sass')
var prefixer = require('gulp-autoprefixer')
var minify = require('gulp-minify-css')
var imagemin = require('gulp-imagemin');
var wrap = require('gulp-wrap')
var browserSync = require('browser-sync')

function handleError(err) {
  console.log(err.toString())

  this.emit('end')
}

gulp.task('browser-sync', ['sass', 'build'], function () {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  })
})

gulp.task('rebuild', ['build'], function () {
  browserSync.reload();
})

gulp.task('build', function () {
  gulp.src('src/pages/*.html')
    .pipe(wrap({
      src: 'src/layout/_layout.html'
    }))
    .pipe(gulp.dest('dist/'))

})

gulp.task('imagemin', function () {
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
});



gulp.task('sass', function () {
  gulp.src('src/main.scss')
    .pipe(sass()).on('error', handleError)
    .pipe(prefixer())
    .pipe(minify())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('copy-assets', function () {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist/'))
})

gulp.task('watch', function () {
  // gulp.watch('src/*.html',['copy-assets'])
  gulp.watch('src/**/*.html', ['rebuild'])
  gulp.watch('src/*.scss', ['sass'])
})

gulp.task('default', ['browser-sync', 'watch'])