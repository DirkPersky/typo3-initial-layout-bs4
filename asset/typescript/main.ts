import * as bootstrap from 'bootstrap';
import Fancybox from './fancybox/fancybox';
import Animate from './waypoints/animate';
// @ts-ignore
window.jQuery = jQuery;

class Init {
    bootstrap: any;

    constructor() {
        let me = this;
        this.bootstrap = bootstrap;
        // load Global Libs
        this.loadLibs();
        // bootstrap
        jQuery(function ($) {
            // init Fancybox
            new Fancybox();
            // Waypoint
            new Animate();
            // load old JS Files
            me.loadtemplates();
        });
    }
    /**
     * Load Js Scripts
     */
    loadtemplates() {
        // Load Template Files
        this.requireAll(require.context('../js/template', true, /\.js$/));
    }
    /**
     * Load Static Libs
     */
    loadLibs(){
        // LazyLoading
        require('lazysizes/plugins/print/ls.print'); // LazyLoading for Print
        require('lazysizes/plugins/respimg/ls.respimg'); // LazyLoading for Responsive Images
        require('lazysizes/plugins/bgset/ls.bgset'); // LazyLoading for Background-Images
        require('lazysizes'); // LazyLoading main lib
        // require('rrssb'); // Sozial share
    }
    /**
     * Require all Files from a Path
     * @param r
     */
    requireAll(r:any) {
        r.keys().forEach(r);
    }
}

const wk = new Init();


