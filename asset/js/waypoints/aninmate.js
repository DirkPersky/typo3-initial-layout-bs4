!function($){
  /**
   * Aniamtion CSS on Scroll
   */
  $('.animated-hide').each(function(){
    $(this).waypoint(function(direction){
      this.adapter.$element.toggleClass('animated-hide')
    },{
      triggerOnce: true,
      offset: '90%' // Way to top of Page
    });
  });
  
}(jQuery);
