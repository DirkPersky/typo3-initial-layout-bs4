import * as bootstrap from 'bootstrap';
import Fancybox from './modules/fancybox';
import Animate from './modules/waypoints';
import BarbaJS from './components/barba';
import './components/statemanager';

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
            // Waypointmodules
            new Animate();
            // load jQuery Functions Files
            me.loadtemplates();
            // BarbaJS
            try {
                var ua = window.navigator.userAgent;
                var msie = ua.indexOf("MSIE ");

                if (msie > 0 || !!ua.match(/Trident.*rv\:11\./)) {  // If Internet Explorer, return version number
                    console.log('Please update your Browser!');
                } else {
                    new BarbaJS();
                }
            } catch (e) { }
            // run Statemanager
            (<any>window).Statemanager.call();
        });
    }
    /**
     * Load Js Scripts
     */
    loadtemplates() {
        // Load Template Files
        this.requireAll(require.context('../js', true, /\.js$/));
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
        // require('picturefill'); // IE 11 FIX
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


