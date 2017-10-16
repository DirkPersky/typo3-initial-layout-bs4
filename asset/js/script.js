try {
    function requireAll(r) { r.keys().forEach(r); }
    // jQuery
    window.$ = window.jQuery = require('jquery');
    // Bootsrap
    window.Tether = require('tether'); // Tether - Needed for Bootstrap 4
    window.Popper = require('popper.js'); // Popper.js - Needed for Bootstrap 4
    require('bootstrap'); // Bootstrap 4
    // Fancybox
    require('@fancyapps/fancybox');
    require('./fancybox/fancybox_v3.init');
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
    require('jquery.finger');
    requireAll(require.context("./jquery", true, /^\.\/.*\.js/));
    // // Load Template Files
    requireAll(require.context('./template', true, /\.js$/));

} catch (e) {}
