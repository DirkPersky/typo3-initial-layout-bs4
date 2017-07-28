jQuery(function($){
    /**
     * Aniamtion CSS on Scroll
     */
    $('.animated-hide').each(function(){
        $(this).addClass('animated');
        $(this).waypoint(function(direction){
            if(direction == 'down') this.adapter.$element.removeClass('animated-hide')
        },{
            triggerOnce: true,
            offset: '90%' // Way to top of Page
        });
    });
});
