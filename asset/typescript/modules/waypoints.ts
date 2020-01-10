interface JQuery {
    waypoint(options?: any, options2?: any): JQuery;
}

// Waypoints
export default class Animate {
    constructor(){
        this.loadLibs();
        (<any>window).Statemanager.attach('waypoints-init',()=> {
            /**
             * Aniamtion CSS on Scroll
             */
            jQuery('.animated-hide').map(function (element: any) {
                jQuery(element).addClass('animated');
                // @ts-ignore
                jQuery(element).waypoint(function (direction: any) {
                    if (direction == 'down') {
                        // @ts-ignore
                        this.adapter.$element.removeClass('animated-hide')
                    }
                }, {
                    triggerOnce: true,
                    offset: '90%' // Way to top of Page
                });
            });
        });
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
