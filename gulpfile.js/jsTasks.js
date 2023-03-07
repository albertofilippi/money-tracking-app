const browserify = require("browserify");
const gulp = require("gulp");
const paths = require("./paths");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const args = require("yargs").argv;
const gulpIf = require("gulp-if");
const uglify = require("gulp-uglify");

const boundleJS = function () {
  return browserifyBundle().pipe(gulp.dest(paths.getJSOutputPath()));
};

const browserifyBundle = function () {
  const prod = args.prod;

  return browserify({
    entries: paths.getJsEntryPath(),
  })
    .bundle()
    .pipe(source(paths.getJSOutputEntry()))
    .pipe(buffer())
    .pipe(gulpIf(prod, uglify()));
};

const watchJS = function (cb) {
  const prod = args.prod;
  if (prod) {
    return cb();
  }
  gulp.watch(paths.getJsSrcPath("**/*"), boundleJS);
  cb();
};
module.exports = {
  boundleJS: boundleJS,
  watchJS: watchJS,
};
