var gulp = require("gulp"),
  readConfig = require("read-config"),
  config = readConfig("_config.yml"),
  del = require("del"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  rename = require("gulp-rename"),
  mainBowerFiles = require("main-bower-files"),
  inject = require("gulp-inject"),
  filter = require("gulp-filter"),
  order = require("gulp-order"),
  cleanCSS = require("gulp-clean-css"),
  Bust = require("gulp-bust"),
  merge = require("merge-stream"),
  gutil = require("gulp-util");

var bust = new Bust();
var assetsVendorToInject = [];
var files = mainBowerFiles({
  paths: {
    bowerDirectory: 'node_modules',
    bowerJson: 'package.json'
  }
});

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

gulp.task("assets-vendor-build", [
  "assets-vendor-init",
  "assets-vendor-clean",
  "assets-vendor-styles",
  "assets-vendor-scripts",
  "assets-vendor-fonts",
  "assets-vendor-img",
  "assets-vendor-inject"
]);

gulp.task("assets-vendor-init", function() {
  assetsVendorToInject = [];
  return null;
});

gulp.task("assets-vendor-clean", function(done) {
  del([
    config.destination + "/" + config.paths.assets + "/**/*",
    "!" + config.destination + "/" + config.paths.assets + "/*.js",
    "!" + config.destination + "/" + config.paths.assets + "/*.css"
  ]);
  done();
});

gulp.task("assets-vendor-scripts", function() {
  assetsVendorToInject = merge(assetsVendorToInject, gulp.src(files, { base: config.paths.npm })
    .pipe(filter(["**/*.js", "**/*.map", "!**/*.css.map"]))
    .pipe(order(["**/webfontloader.js", "**/jquery.js", "**/bootstrap.js", "**/*.js"]))
    .pipe(gutil.env.env === "production" ? uglify() : gutil.noop())
    .pipe(gutil.env.env === "production" ? bust.resources() : gutil.noop())
    .pipe(gulp.dest(config.destination + "/" + config.paths.assets)));
});

gulp.task("assets-vendor-styles", function() {
  assetsVendorToInject = merge(assetsVendorToInject, gulp.src(files, { base: config.paths.npm })
    .pipe(filter(["**/*.css", "**/*.css.map"]))
    .pipe(order(["**/github-markdown.css", "**/bootstrap.css", "**/*.css"]))
    .pipe(gutil.env.env === "production" ? cleanCSS() : gutil.noop())
    .pipe(gutil.env.env === "production" ? bust.resources() : gutil.noop())
    .pipe(gulp.dest(config.destination + "/" + config.paths.assets)));
});

gulp.task("assets-vendor-fonts", function() {
  return gulp.src(files, { base: config.paths.npm })
    .pipe(filter(["**/*.eot", "**/*.woff", "**/*.svg", "**/*.ttf", "**/*.woff2"]))
    .pipe(gulp.dest(config.destination + "/" + config.paths.assets));
});

gulp.task("assets-vendor-img", function() {
  return gulp.src(files, { base: config.paths.npm })
    .pipe(filter(["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif"]))
    .pipe(gulp.dest(config.destination + "/" + config.paths.assets));
});

gulp.task("assets-vendor-inject", function() {
  return string_src(config.source + "/_data/" + config.assets.vendor, "{\n  \"js\": [\n  ],\n  \"css\": [\n  ],\n  \"html\": [\n  ]\n}")
    .pipe(inject(assetsVendorToInject, {
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