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

      if ($childList.hasClass('hidden-sm-up') && window.matchMedia("(min-width: 544px)").matches) return true;
      if ($childList.hasClass('hidden-md-up') && window.matchMedia("(min-width: 768px)").matches) return true;
      if ($childList.hasClass('hidden-lg-up') && window.matchMedia("(min-width: 992px)").matches) return true;
      if ($childList.hasClass('hidden-xl-up') && window.matchMedia("(min-width: 1200px)").matches) return true;
      // Stop Click when time is short;
      e.preventDefault();
      // Add Class to Parent
      if($childList.hasClass('on')) {
        $this.removeClass('in-sub');
        $childList.removeClass('on');
      } else {
        $this.addClass('in-sub');
        $childList.addClass('on');
      }

      // Reset $timer Value
      $timer = false;
    });

    // Remove Class Action
    $childList.find(' > ul > li > .btn-close').on('click',function(e){
      e.preventDefault();
      $this.removeClass('in-sub');
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
      var $this = $(this),
          $child = jQuery($this.data('mega')),
          _slideUpTimer,
          _lockTimer;

      $this.on('click mouseenter mouseleave', function (e) {
          if ($child.length > 0) {
              // Stop Click when time is short;
              e.preventDefault();
              clearTimeout(_slideUpTimer);
              if (e.type == 'mouseleave') {
                  _slideUpTimer = setTimeout(slideUp, 750);
              } else if(e.type == 'mouseenter'){
                  slideDown();
                  _lockTimer = setTimeout(function () {
                      _lockTimer = null;
                  }, 50);
              } else if (!_lockTimer) {
                  if ($child.hasClass('on')) {
                      slideUp();
                  } else {
                      slideDown();
                  }
              }
          }
      });

      $('a[data-mega]').each(function () {
          var _child = $($(this).data('mega'));
          _child.on('mouseleave mouseenter', function (e) {
              clearTimeout(_slideUpTimer);
              if (e.type == 'mouseleave') {
                  _slideUpTimer = setTimeout(slideUp, 500);
              }
          });
      });

      function slideUp() {
          // $child.stop().slideUp('slow', function(){
          $child.removeClass('on');
          $this.removeClass('toogle-mega').blur();
          // });

          /** Find Active and rest **/
          $('a[data-mega]').each(function () {
              if ($(this).parent().hasClass('toogle-mega-holder')) {
                  $(this).parent().removeClass('toogle-mega-holder');
              }
          });
      }

      function slideDown() {
          $('a[data-mega]').each(function () {
              var _child = $($(this).data('mega'));
              $(this).removeClass('toogle-mega');

              // _child.stop().slideUp('slow', function(){
              _child.removeClass('on');
              // });
          });

          // $child.stop().slideDown('slow', function(){
          $child.addClass('on');
          $this.addClass('toogle-mega').blur();
          // })

          /** Find Active and Store **/
          $('a[data-mega]').each(function () {
              if ($(this).parent().hasClass('active')) {
                  $(this).parent().addClass('toogle-mega-holder');
              }
          });
      }
  };
  $('a[data-mega]').each(function(){
    $(this).megaNav();
  });
}(jQuery);
