try {
    // jQuery
    window.$ = window.jQuery = require('jquery');
    // Fancybox
    require('./fancybox/jquery.fancybox.init');
    // Bootsrap
    require('tether'); // Needed for Bootstrap 4
    require('popper.js'); // Popper.js
    require('bootstrap'); // Bootstrap 4
    // LazyLoading
    require('lazysizes/plugins/print/ls.print'); // LazyLoading for Print
    require('lazysizes/plugins/respimg/ls.respimg'); // LazyLoading for Responsive Images
    require('lazysizes/plugins/bgset/ls.bgset'); // LazyLoading for Background-Images
    require('lazysizes'); // LazyLoading main lib
    // Waypoints
    require('waypoints/lib/jquery.waypoints'); // Waypoint Scrolling
    require('waypoints/lib/shortcuts/infinite'); // Waypoint Scrolling Modules (infinite...)
    require('waypoints/lib/shortcuts/inview'); // Waypoint Scrolling Modules (inview...)
    require('waypoints/lib/shortcuts/sticky'); // Waypoint Scrolling Modules (sticky...)
    require('./waypoints/aninmate');
    // RSSB
    require('rrssb');
    // Load jQuery Plugins
    require.context("./jquery", true, /^\.\/.*\.js/);
    // Load Template Files
    require.context("./template", true, /^\.\/.*\.js/);
} catch (e) {}
