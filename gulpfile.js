// Inspired by https://gist.github.com/jeromecoupe/0b807b0c1050647eb340360902c3203a
'use strict'

// Load plugins
const autoprefixer = require('autoprefixer')
const browsersync = require('browser-sync').create()
const cssnano = require('cssnano')
const del = require('del')
const eslint = require('gulp-eslint')
const gulp = require('gulp')
const plumber = require('gulp-plumber')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const webpackconfig = require('./webpack.config.js')
const webpackstream = require('webpack-stream')

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './src/'
    },
    port: 3000
  })
  done()
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload()
  done()
}

// Clean assets
function clean() {
  return del(['./src/assets/'])
}

// CSS task
function css() {
  return gulp
    .src('./src/styles/**/*.scss')
    .pipe(plumber())
    .pipe(
      rename({
        basename: 'bundle'
      })
    )
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest('./src/assets/'))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(
      rename({
        basename: 'bundle',
        suffix: '.min'
      })
    )
    .pipe(gulp.dest('./src/assets/'))
    .pipe(browsersync.stream())
}

// Lint scripts
function scriptsLint() {
  return gulp
    .src(['./src/scripts/**/*', './gulpfile.js'])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
}

// Transpile, concatenate and minify scripts
function scripts() {
  return (
    gulp
      .src(['./src/scripts/**/*'])
      .pipe(sourcemaps.init())
      .pipe(webpackstream(webpackconfig))
      // folder only, filename is specified in webpack config
      .pipe(gulp.dest('./src/assets/'))
      .pipe(browsersync.stream())
  )
}

// Watch files
function watchFiles() {
  gulp.watch('./src/styles/**/*', css)
  gulp.watch('./src/scripts/**/*', gulp.series(scriptsLint, scripts))
  gulp.watch(['./src/**/*.html'], gulp.series(browserSyncReload))
}

// define complex tasks
const js = gulp.series(scriptsLint, scripts)
const build = gulp.series(clean, gulp.parallel(css, js))
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync))

// export tasks
exports.css = css
exports.js = js
exports.clean = clean
exports.build = build
exports.watch = watch
exports.default = build
