interface JQuery {
    waypoint(options?: any, options2?: any): JQuery;
}

// Waypoints
export default class Animate {
    constructor(){
        this.loadLibs();
    }
    /**
     * Load Static Libs
     */
    loadLibs(){
        require('waypoints/lib/jquery.waypoints'); // Waypoint Scrolling
        require('waypoints/lib/shortcuts/infinite'); // Waypoint Scrolling Modules (infinite...)
        require('waypoints/lib/shortcuts/inview'); // Waypoint Scrolling Modules (inview...)
        require('waypoints/lib/shortcuts/sticky'); // Waypoint Scrolling Modules (sticky...)
    }
}
