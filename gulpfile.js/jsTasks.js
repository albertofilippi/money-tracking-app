const browserify = require("browserify");
const gulp = require("gulp");
const paths = require("./paths");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const args = require("yargs").argv;
const gulpIf = require("gulp-if");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");

const boundleJS = function () {
  return browserifyBundle().pipe(gulp.dest(paths.getJSOutputPath()));
};

const browserifyBundle = function () {
  const prod = args.prod;
  const debug = args.debug;

  return browserify({
    entries: paths.getJsEntryPath(),
  })
    .transform("babelify")
    .bundle()
    .pipe(source(paths.getJSOutputEntry()))
    .pipe(buffer())
    .pipe(gulpIf(debug, sourcemaps.init()))
    .pipe(gulpIf(prod, uglify()))
    .pipe(gulpIf(debug, sourcemaps.write("./")));
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
