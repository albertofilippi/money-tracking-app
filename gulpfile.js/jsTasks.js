const browserify = require("browserify");
const gulp = require("gulp");
const paths = require("./paths");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");

const boundleJS = function () {
  return browserifyBundle().pipe(gulp.dest(paths.getJSOutputPath()));
};

const browserifyBundle = function () {
  return browserify({
    entries: paths.getJsEntryPath(),
  })
    .bundle()
    .pipe(source(paths.getJSOutputEntry()))
    .pipe(buffer());
};

const watchJS = function (cb) {
  gulp.watch(paths.getJsSrcPath("**/*"), boundleJS);
  cb();
};
module.exports = {
  boundleJS: boundleJS,
  watchJS: watchJS,
};
