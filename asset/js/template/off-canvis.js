!function($){
  /**
   * OFF CANVIS
   * Author: Dirk Persky
   * modify: 22.01.2016
   */
  $.fn.offCanvasPage = function( optionsConf ) {
    var $this = $(this),
        $ankerLink = $this.find('> a'),
        $childList = $this.find('> span.nav-trans').first(),
        $timer = false,
        $megaNav = false;

    if($this.parents('.navbar-mega').length > 0) $megaNav = true;

    $ankerLink.on('touchstart',function(e){
      // Set Click Start Time on Mobile
      clearTimeout($timer);
      $timer = setTimeout(function () {
        // Reset $timer Value
        $timer = false;
      }, 250);
    });
    $ankerLink.on('click',function(e){
      // If no Touch
      if(!$timer && !$megaNav) return true;

      // Stop Click when time is short;
      e.preventDefault();
      // Add Class to Parent
      if($childList.hasClass('on')) {
        $childList.removeClass('on');
      } else {
        $childList.addClass('on');
      }

      // Reset $timer Value
      $timer = false;
    });

    // Remove Class Action
    $childList.find(' > ul > li > .btn-close').on('click',function(e){
      e.preventDefault();
      $childList.removeClass('on');
    })
  };
  $('[data-nav="true"]').each(function(){
    $(this).offCanvasPage();
  });

  /**
   * Mega nav
   * Author: Dirk Persky
   * modify: 22.04.2016
   */
  $.fn.megaNav = function( optionsConf ) {
    var $this = $(this);
    var $child = jQuery($this.data('mega'));

    $this.on('click',function(e){
      if($child.length > 0) {
        // Stop Click when time is short;
        e.preventDefault();

        if($child.hasClass('on')) {
          slideUp();
        } else {
          slideDown();
        }
      }
    });

    function slideUp(){
      $child.stop().slideUp('slow', function(){
        $child.removeClass('on');
        $this.removeClass('toogle-mega');
      });
    }

    function slideDown(){
      $('a[data-mega]').each(function(){
        var _child = $($(this).data('mega'));
        $(this).removeClass('toogle-mega');

        _child.stop().slideUp('slow', function(){
          _child.removeClass('on');
        });
      });

      $child.stop().slideDown('slow', function(){
        $child.addClass('on');
        $this.addClass('toogle-mega');
      })
    }
  };
  $('a[data-mega]').each(function(){
    $(this).megaNav();
  });

}(jQuery);
