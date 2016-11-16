var gulp    = require('gulp'),
		browserSync = require('browser-sync'),
	  pngquant = require('imagemin-pngquant'),
    addsrc  = require('gulp-add-src'),
    batch = require('gulp-batch'),
    concat  = require('gulp-concat'),
    fs = require('fs'),
    ftp = require('vinyl-ftp'),
    gutil = require('gulp-util'),
    imagemin = require('gulp-imagemin'),
    jshint  = require('gulp-jshint'),
    order   = require('gulp-order'),
    sass = require('gulp-sass'),
    uglify  = require('gulp-uglify'),
    watch   = require('gulp-watch');

var reload = browserSync.reload;
/*
 |----------------------------------------------
 | Config JavaScript Path`s
 |----------------------------------------------
 */
var scriptPathIn  = 'asset/js',
    scriptPathOut = 'app/Resources/Public/js',
    angularPathIn = 'asset/AngularJS',
    imgPathIn     = 'asset/img',
    imgPathOut    = 'app/Resources/Public/img/layout';
/*
 |----------------------------------------------
 | Config SASS Path`s
 |----------------------------------------------
 */
var sassPathIn = 'asset/sass',
    sassPathOut = 'app/Resources/Public/css';
/*
 |----------------------------------------------
 | JavaScript Uglify Options
 |----------------------------------------------
 */
var _uglify = {
  mangle: true,
  // compress: false,
  // preserveComments: 'license'
};
/*
 |----------------------------------------------
 | SASS Uglify Options
 |----------------------------------------------
 */
var _sass = {
  outputStyle: false
};
/*
 |----------------------------------------------
 | NPM JavaScript Modules
 |----------------------------------------------
 */
var npmModules = [
	'node_modules/tether/dist/js/tether.min.js', // Needed for Bootstrap 4
	'node_modules/bootstrap/dist/js/bootstrap.min.js', // Bootstrap 4

    'node_modules/lazysizes/plugins/print/ls.print.js', // LazyLoading for Print
    'node_modules/lazysizes/plugins/respimg/ls.respimg.js', // LazyLoading for Responsive Images
    'node_modules/lazysizes/plugins/bgset/ls.bgset.js', // LazyLoading for Background-Images
    'node_modules/lazysizes/lazysizes.js', // LazyLoading main lib

    'node_modules/waypoints/lib/jquery.waypoints.js', // Waypoint Scrolling
    'node_modules/waypoints/lib/shortcuts/*.min.js', // Waypoint Scrolling Modules (sticky...)

    'node_modules/rrssb/js/*.min.js', // Rssb Scrolling Modules (sticky...)
];
/*
 |----------------------------------------------
 | FTP Auto Upload Files
 |----------------------------------------------
 */
var _localFilesGlob = [
  './app/Resources/Public/js/*',
	'./app/Resources/Public/css/*',
  './app/Resources/Public/img/*',
];
/*
 |----------------------------------------------
 | Default Tasks
 |----------------------------------------------
 */
var _tasks = [
  'sass',
  'sass:watch',
  'js',
  'js:watch',
  // 'ftp:watch',
  // 'imagemin',
  // 'imagemin:watch',
	'serve',
	'serve:watch'
];
/*
 |----------------------------------------------
 | Start Inital Gulp Task & JavaScript watcher
 |----------------------------------------------
 */
gulp.task('default', _tasks);
/*
 |----------------------------------------------
 | JavaScript Task for Combine Default Scripts
 |----------------------------------------------
 */
gulp.task('js', function() {
    // Build Combine Array´s
    var _order = [
					scriptPathIn+'/jquery/*.js',
					scriptPathIn+'/fancybox/jquery.fancybox.js',
					scriptPathIn+'/fancybox/helpers/jquery.fancybox-buttons.js',
					scriptPathIn+'/fancybox/helpers/jquery.fancybox-media.js',
					scriptPathIn+'/fancybox/helpers/jquery.fancybox-thumbs.js',
        ];
    var _addsrc = [
          './'+scriptPathIn+'/**/*.js'
        ];
    // Push All Modules to the Arrays
    for (var modules in npmModules) {
      if (npmModules.hasOwnProperty(modules)) {
        _order.push(npmModules[modules]);
        _addsrc.push('./'+npmModules[modules]);
      }
    }
    // Run the Gulp Task
    gulp.src('./'+scriptPathIn+'/script.js') // File ist not used
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(addsrc(_addsrc))
        .pipe(order(_order, { base: './' }))
        .pipe(concat('script.min.js'))
        .pipe(uglify(_uglify))
        .pipe(gulp.dest('./'+scriptPathOut+'/'));
});
/*
 |----------------------------------------------
 | Start Gulp File Watcher for JavaScripts
 |----------------------------------------------
 */
gulp.task('js:watch', function () {
  gulp.src('./'+scriptPathIn+'/**/script.js')
    .pipe(watch('./'+scriptPathIn+'/**/*.js', function(event) {
      gulp.start('js');
    }));
});
/*
 |----------------------------------------------
 | SASS Task for Combine & Minify
 |----------------------------------------------
 */
gulp.task('sass', function () {
  return gulp.src('./'+sassPathIn+'/*.scss')
    .pipe(sass(_sass).on('error', sass.logError))
    .pipe(gulp.dest('./'+sassPathOut));
});
/*
 |----------------------------------------------
 | Start Gulp File Watcher for SASS
 |----------------------------------------------
 */
gulp.task('sass:watch', function () {
  gulp.src('./'+sassPathIn+'/**/style.scss')
    .pipe(watch('./'+sassPathIn+'/**/*.scss', function(event) {
      gulp.start('sass');
    }));
});
/**
 |----------------------------------------------
 | Watch deploy task.
 | Watches the local copy for changes and copies the new files to the server whenever an update is detected
 |----------------------------------------------
 */
gulp.task('ftp:watch', function() {
  var env = JSON.parse(fs.readFileSync('./sftp-config.json'));
  /*
   |----------------------------------------------
   | Config FTP
   |----------------------------------------------
   */
  var _ftp = {};
      _ftp.user = env.user,
      _ftp.password = env.password,
      _ftp.host = env.host,
      _ftp.port = env.port || 21,
      _ftp.remoteFolder = env.remote_path,
      _ftp.protocol = env.type;

  if(_ftp.protocol === 'ftp'){
    /*
     |----------------------------------------------
     | Create FTP Connection
     |----------------------------------------------
     */
    var conn = ftp.create({
        host: _ftp.host,
        port: _ftp.port,
        user: _ftp.user,
        password: _ftp.password,
        parallel: 5,
        log: gutil.log
    });
    /*
     |----------------------------------------------
     | Initial FTP File Watcher
     |----------------------------------------------
     */
    gulp.watch(_localFilesGlob , function(event){
      console.log('Changes detected! Uploading file "' + event.path + '", ' + event.type);
      return gulp.src( [event.path], { base: '.', buffer: false } )
        .pipe( conn.newer( _ftp.remoteFolder ) ) // only upload newer files
        .pipe( conn.dest( _ftp.remoteFolder ) );
    });
  }
});
/*
 |----------------------------------------------
 | Imagemin Task to Optimize Images
 |----------------------------------------------
 */
gulp.task('imagemin', function () {
  return gulp.src('./'+imgPathIn+'/**/*.+(png|jpg|gif|jpeg|PNG)')
              .pipe(imagemin({
                optimizationLevel: 5,
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
              }))
              .pipe(gulp.dest(imgPathOut));
});
/*
 |----------------------------------------------
 | Start Gulp File Watcher for Imagemin
 |----------------------------------------------
 */
gulp.task('imagemin:watch', function () {
  gulp.src('./'+imgPathIn+'/**/*.+(png|jpg|gif|jpeg|PNG)')
    .pipe(watch('./'+imgPathIn+'/**/*.+(png|jpg|gif|jpeg|PNG)', function(event) {
      gulp.start('imagemin');
    }));
});
/*
 |----------------------------------------------
 | Serve Browser Sync
 |----------------------------------------------
 */
gulp.task('serve', function() {
	browserSync({
		server: {
			baseDir: 'app/Resources/Public'
		}
	});
});
/**
 |----------------------------------------------
 | Watch deploy task.
 | Watches the local copy for changes and refesh Browser
 |----------------------------------------------
 */
gulp.task('serve:watch', function() {
	var _folders = [
		'./app/Resources/Public/*.html',
	];

	for (var fol in _localFilesGlob) {
		_folders.push(_localFilesGlob[fol]);
	}
	/*
	 |----------------------------------------------
	 | Initial FTP File Watcher
	 |----------------------------------------------
	 */
	gulp.watch(_folders , function(event){
		console.log('Changes detected! Uploading file "' + event.path + '", ' + event.type);
		if(event.type === 'changed'){
			reload();
		}
	});
});