# Start Developing with SASS & Combined JavaScript Files for TYPO3
This Porjekt shoud help you to start developing with SASS and minifyed JavaScripts to get an high Google Page Insight Ranking.

## Required
- NPM-Packacke Manager

## Default used NPM-Modules
- [animate.css](https://daneden.github.io/animate.css/)
- [Bootstrap SASS](http://getbootstrap.com/)
- [Font Awesome](https://fortawesome.github.io/Font-Awesome/)
- [Lazysizes](https://github.com/aFarkas/lazysizes)
- [Modernizr](https://modernizr.com)
- [Waypoints](http://imakewebthings.com/waypoints/)

## Download & Config
Clone this Projekt to your Remote-Device and config all relevant Options

### Modernizr
You can config your needed [Modernizr](https://modernizr.com/) options in the file:
```
/asses/js/config-modenizr.js
```

### GULP Task Manager
In the  `guilpfile.js` you can setup diferent Options to Combile and Minify JavaScripts and SASS-Files.

#### JavaScripts
All JavaScript´s from the `/asses/js/` Folder Strukture will be Combined to an singel JavaScript File. You cann define options to Minify this Result by setup:
```
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
```

If you need Diferent Libeys which are not places in the `/asses/js` Folder you can add this to the npmModules list
```
var npmModules = [
  'node_modules/tether/dist/js/tether.min.js', // Needed for Bootstrap 4
  'node_modules/bootstrap/dist/js/bootstrap.min.js', // Bootstrap 4
  
  'node_modules/lazysizes/plugins/print/ls.print.js', // LazyLoading for Print
  'node_modules/lazysizes/plugins/respimg/ls.respimg.js', // LazyLoading for Responsive Images
  'node_modules/lazysizes/plugins/bgset/ls.bgset.js', // LazyLoading for Background-Images
  'node_modules/lazysizes/lazysizes.js', // LazyLoading main lib

  'node_modules/waypoints/lib/jquery.waypoints.js', // Waypoint Scrolling
  'node_modules/waypoints/lib/shortcuts/*.min.js', // Waypoint Scrolling Modules (sticky...)
];
```

#### SASS Precompiler to CSS
The SASS-File from `/asses/css/style.scss` compiled to an Single CSS File. You can define the Output bei configure:
```
/*
 |----------------------------------------------
 | SASS Uglify Options
 |----------------------------------------------
 */
var _sass = {
  outputStyle: false
};
```

#### FTP-Upload Compiles Files
If you want to upload the Compiles CSS/JS File to an FTP Server you can Setup the
```
#.sftp-config.json
{
    "type": "ftp",
    "host": "example.com",
    "port": 21,
    "user": "user",
    "password": "password",
    "remote_path": "/htdocs",
}    
```

#### Gulp Task Watchers
You can define which task the Gulpfile will do by config:
```
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
```

#### Gulp Serve
with serve you can develope yout HTML, if you Update a SASS, JS, or HTML File your Browser will refreshed after the compiling is complete.

## Inital the Projekt
if you have changed the config to your need go forward and run in the shell
```
init.sh
```

### what init.sh do
- the script first inital all NPM-Modules by run `npm install`
- after that it build the Modenizr
- than it Copy all `Font-Files` form `Bootstrap` and `Font-Awesome` to the Public folder

## Run gulp
at least run gulp and start your developing
```
gulp
```

## Please give me feedback
I would appreciate any kind of feedback or ideas for further developments to keep improving the Starterkit for your needs.
