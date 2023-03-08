const gulp = require("gulp");
const args = require("yargs").argv;
const gulpIf = require("gulp-if");
const minifyCSS = require("gulp-minify-css");
const paths = require("./paths");
const concat = require("gulp-concat");
const svgmin = require("gulp-svgmin");

const processCSS = () => {
  const prod = args.prod;
  return gulp
    .src(paths.getCSSSrcPath("**/*"))
    .pipe(concat(paths.getOutputCSSFilename()))
    .pipe(gulpIf(prod, minifyCSS()))
    .pipe(gulp.dest(paths.getCSSOutputPath()));
};

const watchCSS = (cb) => {
  const prod = args.prod;
  if (prod) {
    return cb();
  }
  gulp.watch(paths.getCSSSrcPath("**/*"), processCSS);
  cb();
};

const processIcons = () => {
  return gulp
    .src(paths.getIconsSrcPath("**/*.svg"), {
      relative: true,
      base: paths.getSrcFolder(),
    })
    .pipe(svgmin())
    .pipe(gulp.dest(paths.getDistFolder()));
};

const watchIcons = (cb) => {
  const prod = args.prod;
  if (prod) {
    return cb();
  }
  gulp.watch(paths.getIconsSrcPath("**/*"), processIcons);
  cb();
};

module.exports = {
  processCSS: processCSS,
  watchCSS: watchCSS,
  processIcons: processIcons,
  watchIcons: watchIcons,
};
