var gulp = require("gulp"),
  readConfig = require("read-config"),
  config = readConfig("_config.yml"),
  autoprefixer = require("gulp-autoprefixer"),
  Bust = require("gulp-bust"),
  cleanCSS = require("gulp-clean-css"),
  concat = require("gulp-concat"),
  flatten = require("gulp-flatten"),
  inject = require("gulp-inject"),
  order = require("gulp-order"),
  uglify = require("gulp-uglify"),
  gutil = require("gulp-util"),
  browserSync = require("browser-sync"),
  del = require("del"),
  merge = require("merge-stream");

var bust = new Bust();
var assetsToInject = [];

function string_src(filename, string) {
  var src = require("stream").Readable({ objectMode: true });
  src._read = function () {
    this.push(new gutil.File({
      cwd: "",
      base: "",
      path: filename,
      contents: new Buffer(string)
    }));
    this.push(null)
  };
  return src;
}

gulp.task("assets-build", [
  "assets-init",
  "assets-clean",
  "assets-styles",
  "assets-scripts",
  "assets-inject"
]);

gulp.task("assets-build-light", [
  "assets-init",
  "assets-clean",
  "assets-styles",
  "assets-scripts"
]);

gulp.task("assets-init", function() {
  browserSync.notify("<span style=\"color: grey\">Reloading:</span> assets");
  assetsToInject = [];
  return null;
});

gulp.task("assets-clean", function(done) {
  del([
    config.destination + "/" + config.paths.assets + "/*.js",
    config.destination + "/" + config.paths.assets + "/*.css",
    "!" + config.destination + "/" + config.paths.assets + "/lightgallery.js"
  ]);
  done();
});

gulp.task("assets-scripts", function() {
  assetsToInject = merge(assetsToInject, gulp.src(config.filters.js)
    .pipe(order(["**/*.js", "**/main.js"]))
    .pipe(gutil.env.env === "production" ? concat("portapps.js") : gutil.noop())
    .pipe(gutil.env.env === "production" ? uglify() : gutil.noop())
    .pipe(gutil.env.env === "production" ? bust.resources() : gutil.noop())
    .pipe(flatten())
    .pipe(gulp.dest(config.destination + "/" + config.paths.assets)));
});

gulp.task("assets-styles", function() {
  assetsToInject = merge(assetsToInject, gulp.src(config.filters.css)
    .pipe(order(["**/main.css", "**/*.css"]))
    .pipe(gutil.env.env === "production" ? cleanCSS({ keepSpecialComments: 0 }) : gutil.noop())
    .pipe(autoprefixer("last 2 version", "safari 5", "ie 8", "ie 9"))
    .pipe(gutil.env.env === "production" ? concat("portapps.css") : gutil.noop())
    .pipe(gutil.env.env === "production" ? bust.resources() : gutil.noop())
    .pipe(flatten())
    .pipe(gulp.dest(config.destination + "/" + config.paths.assets)));
});

gulp.task("assets-inject", function() {
  return string_src(config.source + "/_data/" + config.assets.app, "{\n  \"js\": [\n  ],\n  \"css\": [\n  ],\n  \"html\": [\n  ]\n}")
    .pipe(inject(assetsToInject, {
      empty: true,
      ignorePath: config.destination,
      starttag: "\"{{ext}}\": [",
      endtag: "]",
      transform: function (filepath, file, i, length) {
        return "  \"" + filepath + "\"" + (i + 1 < length ? "," : "");
      }
    }))
    .pipe(gulp.dest("."));
});

gulp.task("assets-rebuild", ["assets-build-light"], function () {
  browserSync.reload();
});

gulp.task("assets-rebuild-full", ["assets-build", "jekyll-build"], function () {
  browserSync.reload();
});