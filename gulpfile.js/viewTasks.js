const gulp = require("gulp");
const inject = require("gulp-inject");
const paths = require("./paths");
const args = require("yargs").argv;

const compileIndex = function () {
  const jsIndex = gulp.src(paths.getJsEntryPath());
  const cssIndex = gulp.src(paths.getCSSEntryPath());
  return gulp
    .src(paths.getHTMLEntryPath())
    .pipe(inject(cssIndex, { relative: true, name: "custom" }))
    .pipe(inject(jsIndex, { relative: true, name: "custom" }))
    .pipe(gulp.dest(paths.getDistFolder()));
};

const watchIndex = function (cb) {
  const prod = args.prod;
  if (prod) {
    return cb();
  }

  gulp.watch(paths.getHTMLEntryPath(), compileIndex);
  cb();
};

module.exports = {
  compileIndex: compileIndex,
  watchIndex: watchIndex,
};
