const gulp = require("gulp");
const paths = require("./paths");
const viewTasks = require("./viewTasks");
const jsTasks = require("./jsTasks");
const serveTasks = require("./serveTasks");
const del = require("del");

const series = gulp.series;

const clean = function (cb) {
  del.sync(paths.getDistFolder(), { force: true });
  cb();
};

const build = series(
  clean,
  viewTasks.compileIndex,
  jsTasks.boundleJS,
  jsTasks.watchJS,
  viewTasks.watchIndex,
  serveTasks.serve
);

module.exports = {
  build: build,
};
