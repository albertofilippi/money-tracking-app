const gulp = require("gulp");
const paths = require("./paths");
const viewTasks = require("./viewTasks");
const jsTasks = require("./jsTasks");
const serveTasks = require("./serveTasks");
const del = require("del");
const assetsTasks = require("./assetsTasks");

const series = gulp.series;

const clean = function (cb) {
  del.sync(paths.getDistFolder(), { force: true });
  cb();
};

const build = series(
  clean,
  viewTasks.compileIndex,
  assetsTasks.processIcons,
  assetsTasks.watchIcons,
  assetsTasks.processCSS,
  assetsTasks.watchCSS,
  jsTasks.boundleJS,
  jsTasks.watchJS,
  viewTasks.watchIndex,
  serveTasks.serve
);

module.exports = {
  build: build,
};
