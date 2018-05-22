var gulp = require("gulp"),
  readConfig = require("read-config"),
  config = readConfig("_config.yml"),
  browserSync = require("browser-sync"),
  cp = require("child_process"),
  gutil = require("gulp-util");

var bundle = process.platform === "win32" ? "bundle.bat" : "bundle";

gulp.task("jekyll-build", function (done) {
  var config = "_config.yml" + (gutil.env.env !== "production" ? ",_config-dev.yml" : "");
  var command = ["exec", "jekyll", "build", "--config", config, "--trace"];
  browserSync.notify("<span style=\"color: grey\">Running:</span> $ " + bundle + " " + command.join(" "));
  return cp.spawn(bundle, command, {stdio: "inherit"})
    .on("exit", function(code){
      gutil.log("Exited", gutil.colors.cyan("'spawn'"), "command", gutil.colors.magenta(bundle + " " + command.join(" ")));
      return done(code === 0 ? null : "ERROR: Jekyll process exited with code: " + code);
    });
});

gulp.task("jekyll-rebuild", ["jekyll-build"], function () {
  browserSync.reload();
});