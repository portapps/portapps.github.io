var gulp = require("gulp"),
  readConfig = require("read-config"),
  config = readConfig("_config.yml");

gulp.task("watch", function() {
  gulp.watch([config.filters.css, config.filters.js], function(event) {
    if (event.type === "changed" ) {
      gulp.start("assets-rebuild");
    } else {
      gulp.start("assets-rebuild-full");
    }
  });
  gulp.watch([config.filters.jekyll, "!src/_data/assets*.json"], function(event) {
    gulp.start("jekyll-rebuild");
  });
});