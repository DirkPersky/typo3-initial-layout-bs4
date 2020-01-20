window.Statemanager.attach('waypoint-animations', function () {
    jQuery('.animated-hide').map(function (element) {
        jQuery(element).addClass('animated');
        jQuery(element).waypoint(function (direction) {
            if (direction == 'down') {
                this.adapter.$element.removeClass('animated-hide')
            }
        }, {
            triggerOnce: true,
            offset: '90%' // Way to top of Page
        });
    });
});
