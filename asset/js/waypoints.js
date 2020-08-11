window.Statemanager.attach('waypoint-animations', function () {
    setTimeout(() => {
        var items = jQuery('.animate');
        if (items.length > 0) {
            items.waypoint(function (direction) {
                if (direction == 'down') {
                    this.adapter.$element.addClass('animated-show')
                } else {
                    this.adapter.$element.removeClass('animated-show')
                }
            }, {
                offset: '95%' // Way to top of Page
            });
        }
        // Waypoint.refreshAll();
    }, 500);
});
