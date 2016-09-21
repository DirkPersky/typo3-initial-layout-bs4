/**
 * Onepage Funktions
 * Author: Dirk Persky
 * modify: 01.12.2015
 * @selector class="onepage"
 */
(function ($) {
  "use strict";

  $.fn.bs3onepage = function() {
      var $this = $(this);

      $this.find('a[data-onepage]').bind('click',function(e){
        e.preventDefault();
        var offset = parseInt($('body').css('padding-top')) || 50;

        switch ($(this).data('onepage')) {
          case 'prev':
            $('html, body').animate({
                scrollTop: $this.prev().offset().top - offset
            }, 1500);
            break;
          default:
            $('html, body').animate({
                scrollTop: $this.next().offset().top - offset
            }, 1500);
        }
      })
  };

  // auto-initialize plugin
  $('.onepage').each(function(){
      var $this = $(this);
      $this.bs3onepage();
  });
})(jQuery);
