var gulp = require('gulp'), watch = require('gulp-watch'),
  helpers = require('./gulp/helpers'),
  vendors = require('./gulp/vendors'),
  merge = require('utils-merge'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  nodemon = require('gulp-nodemon'),
  browserifyIncremental = require('browserify-incremental'),
  babelify = require('babelify'),
  watchify = require('watchify'),
  nodeResolve = require('resolve'),
  browserSync = require('browser-sync').create(),

  autoprefixer = require('gulp-autoprefixer'),
  stylus = require('gulp-stylus'),
  nib = require('nib'),
  jeet = require('jeet'),
  rupture = require('rupture');

gulp.task('bundle-scripts', function () {
  var entryPoint = './application/entry.js', filename = 'bundle.js',
    browserifyInstance = browserifyIncremental(entryPoint, {
      cacheFile: './build/bundle-cache.json',
      debug: true
    });

  vendors.forEach(function (lib) {
    browserifyInstance.external(lib);
  });

  var bundler = watchify(browserifyInstance).transform(babelify, {presets: ["react", "es2015", "stage-0"]});

  helpers.bundleScript(bundler, filename, browserSync, true);
  bundler.on('update', function () {
    helpers.bundleScript(bundler, filename, browserSync, true);
  }).on('log', helpers.mapLog);
});

gulp.task('bundle-vendors', function () {
  var filename = 'vendor.js', browserifyInstance = browserifyIncremental({debug: true});
  vendors.forEach(function (lib) {
    browserifyInstance.require(nodeResolve.sync(lib), {expose: lib});
  });
  helpers.bundleScript(browserifyInstance, filename, browserSync);
});

gulp.task('bundle-server', function () {
  var entryPoint = './server/server.js', filename = 'server.js',
    browserifyInstance = browserifyIncremental(entryPoint, {
      cacheFile: './build/bundle-cache-server.json',
      debug: true, bundleExternal: false, builtins: false,
      detectGlobals: true,
      browserField: false,
      ignoreMissing: false
    });

  var serverBundler = watchify(browserifyInstance).transform(babelify, {presets: ["react", "es2015", "stage-0"]});

  helpers.bundleScript(serverBundler, filename, browserSync, true, './build');
  serverBundler.on('update', function () {
    helpers.bundleScript(serverBundler, filename, browserSync, true, './build');
  }).on('log', helpers.mapLog);
});

gulp.task('bundle-styles', function () {
  gulp.src(['./application/entry.styl'])
    .pipe(sourcemaps.init())
    .pipe(stylus(stylus({use: [nib(), jeet(), rupture()]})))
    .pipe(autoprefixer({}))
    .pipe(concat("bundle.css"))
    .pipe(sourcemaps.write('./sourcemaps'))
    .pipe(gulp.dest('./build/client'))
    .pipe(browserSync.stream());
});

gulp.task("clone-template", function () {
  gulp.src(['./application/template/**/*']).pipe(gulp.dest('./build/client/template')).pipe(browserSync.stream());
});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    port: 2015,
    proxy: "http://localhost:7015",
    files: ["./build/client/index.html"],
    open: false
  });

  watch("./application/**/*.styl", function () { gulp.start('bundle-styles')});
  watch("./application/template/**/*", function () { gulp.start('clone-template')});
});

var nodemonIgnores = [
  'application/**/*',
  'node_modules/**/*',
  'gulp/**/*',
  'server/**/*',
  'build/client/**/*',
  'build/**/*.json'
];

gulp.task('nodemon', function (callback) {
  var started = false;
  nodemon({script: 'build/server.js', ignore: nodemonIgnores}).on('start', function () {
    if (!started) { callback(); started = true; }
  });
});

gulp.task('default', ['bundle-server', 'clone-template', 'bundle-scripts', 'bundle-styles', 'browser-sync']);