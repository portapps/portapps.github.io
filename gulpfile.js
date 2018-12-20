var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var Bust = require("gulp-bust");
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var cp = require('child_process');
var del = require('del');
var filter = require('gulp-filter');
var flatten = require('gulp-flatten');
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');
var merge = require('merge-stream');
var minimist = require('minimist');
var noop = require("gulp-noop");
var order = require('gulp-order');
var readConfig = require('read-config');
var stream = require('stream');
var uglify = require('gulp-uglify');
var Vinyl = require('vinyl');

var options = minimist(process.argv.slice(2), null);
var bundle = process.platform === 'win32' ? 'bundle.bat' : 'bundle';
var config = readConfig('_config.yml');
var bust = new Bust();

var assetsApp = [];
var assetsVendor = [];

var files = mainBowerFiles({
  paths: {
    bowerDirectory: 'node_modules',
    bowerJson: 'package.json'
  }
});

function stringInject(filename, string) {
  var src = stream.Readable({ objectMode: true });
  src._read = function () {
    this.push(new Vinyl({
      cwd: '',
      base: './',
      path: filename,
      contents: Buffer.from(string)
    }));
    this.push(null)
  };
  return src;
}

function browserSyncReload(done) {
  browserSync.reload();
  done();
}

function browserSyncRun(done) {
  browserSync({
    server: {
      baseDir: config.destination
    },
    ui: {
      port: 3001
    },
    open: false,
    port: 3000
  });
  done();
}

function assetsAppInit(done) {
  browserSync.notify('<span style="color: grey">Reloading:</span> assets');
  assetsToInject = [];
  done();
}

function assetsAppClean() {
  return del([
    config.destination + '/' + config.paths.assets + '/*.js',
    config.destination + '/' + config.paths.assets + '/*.css',
    '!' + config.destination + '/' + config.paths.assets + '/lightgallery.js'
  ]);
}

function assetsAppScripts(done) {
  assetsApp = merge(assetsApp, gulp.src(config.filters.js)
    .pipe(order(['**/*.js', '**/main.js']))
    .pipe(options.env === 'production' ? concat('portapps.js') : noop())
    .pipe(options.env === 'production' ? uglify() : noop())
    .pipe(options.env === "production" ? bust.resources() : noop())
    .pipe(flatten())
    .pipe(gulp.dest(config.destination + '/' + config.paths.assets)));
  done();
}

function assetsAppStyles(done) {
  assetsApp = merge(assetsApp, gulp.src(config.filters.css)
    .pipe(order(['**/main.css', '**/*.css']))
    .pipe(options.env === 'production' ? cleanCss({ keepSpecialComments: 0 }) : noop())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(options.env === 'production' ? concat('portapps.css') : noop())
    .pipe(options.env === "production" ? bust.resources() : noop())
    .pipe(flatten())
    .pipe(gulp.dest(config.destination + '/' + config.paths.assets)));
  done();
}

function assetsAppInject() {
  return stringInject(config.source + '/_data/' + config.assets.app, '{\n  "js": [\n  ],\n  "css": [\n  ],\n  "html": [\n  ]\n}')
    .pipe(inject(assetsApp, {
      empty: true,
      ignorePath: config.destination,
      starttag: '"{{ext}}": [',
      endtag: ']',
      transform: function (filepath, file, i, length) {
        return '  "' + filepath + '"' + (i + 1 < length ? ',' : '');
      }
    }))
    .pipe(gulp.dest('.'));
}

function assetsVendorInit(done) {
  assetsVendor = [];
  done();
}

function assetsVendorClean() {
  return del([
    config.destination + '/' + config.paths.assets + '/**/*',
    '!' + config.destination + '/' + config.paths.assets + '/*.js',
    '!' + config.destination + '/' + config.paths.assets + '/*.css'
  ]);
}

function assetsVendorScripts(done) {
  assetsVendor = merge(assetsVendor, gulp.src(files, { base: config.paths.npm })
    .pipe(filter(['**/*.js', '**/*.map', '!**/*.css.map']))
    .pipe(order(['**/webfontloader.js', '**/jquery.js', '**/bootstrap.js', '**/*.js']))
    .pipe(options.env === 'production' ? uglify() : noop())
    .pipe(options.env === "production" ? bust.resources() : noop())
    .pipe(gulp.dest(config.destination + '/' + config.paths.assets)));
  done();
}

function assetsVendorStyles(done) {
  assetsVendor = merge(assetsVendor, gulp.src(files, { base: config.paths.npm })
    .pipe(filter(['**/*.css', '**/*.css.map']))
    .pipe(order(['**/github-markdown.css', '**/bootstrap.css', '**/*.css']))
    .pipe(options.env === 'production' ? cleanCss() : noop())
    .pipe(options.env === "production" ? bust.resources() : noop())
    .pipe(gulp.dest(config.destination + '/' + config.paths.assets)));
  done();
}

function assetsVendorFonts() {
  return gulp.src(files, { base: config.paths.npm })
    .pipe(filter(['**/*.eot', '**/*.woff', '**/*.svg', '**/*.ttf', '**/*.woff2']))
    .pipe(gulp.dest(config.destination + '/' + config.paths.assets));
}

function assetsVendorImg() {
  return gulp.src(files, { base: config.paths.npm })
    .pipe(filter(['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif']))
    .pipe(gulp.dest(config.destination + '/' + config.paths.assets));
}

function assetsVendorInject() {
  return stringInject(config.source + '/_data/' + config.assets.vendor, '{\n  "js": [\n  ],\n  "css": [\n  ],\n  "html": [\n  ]\n}')
    .pipe(inject(assetsVendor, {
      empty: true,
      ignorePath: config.destination,
      starttag: '"{{ext}}": [',
      endtag: ']',
      transform: function (filepath, file, i, length) {
        return '  "' + filepath + '"' + (i + 1 < length ? ',' : '');
      }
    }))
    .pipe(gulp.dest('.'));
}

function jekyll(done) {
  var config = '_config.yml' + (options.env !== 'production' ? ',_config-dev.yml' : '');
  var command = ['exec', 'jekyll', 'build', '--config', config, '--trace'];
  browserSync.notify('<span style="color: grey">Running:</span> $ ' + bundle + ' ' + command.join(' '));
  return cp.spawn(bundle, command, {stdio: 'inherit'})
    .on('exit', function(code){
      return done(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
    });
}

var assetsAppRebuild = gulp.series(
  assetsAppInit,
  assetsAppClean,
  assetsAppStyles,
  assetsAppScripts,
  browserSyncReload
);

var assetsAppRebuildFull = gulp.series(
  assetsAppInit,
  assetsAppClean,
  assetsAppStyles,
  assetsAppScripts,
  assetsAppInject,
  jekyll,
  browserSyncReload
);

var jekyllRebuild = gulp.series(
  jekyll,
  browserSyncReload
);

function watch(done) {
  gulp.watch(config.filters.css)
    .on('change', assetsAppRebuild)
    .on(['add', 'addDir', 'unlink', 'unlinkDir'], assetsAppRebuildFull);
  gulp.watch(config.filters.js)
    .on('change', assetsAppRebuild)
    .on(['add', 'addDir', 'unlink', 'unlinkDir'], assetsAppRebuildFull);
  gulp.watch(config.filters.jekyll, jekyllRebuild);
  gulp.watch('!src/_data/assets*.json', jekyllRebuild);
  done();
}

gulp.task('build', gulp.series(
  assetsAppInit,
  assetsAppClean,
  assetsAppStyles,
  assetsAppScripts,
  assetsAppInject,
  assetsVendorInit,
  assetsVendorClean,
  assetsVendorStyles,
  assetsVendorScripts,
  assetsVendorFonts,
  assetsVendorImg,
  assetsVendorInject,
  jekyll
));

gulp.task('serve', gulp.series(
  'build',
  browserSyncRun,
  watch
));

gulp.task('default', gulp.series(
  'build'
));
