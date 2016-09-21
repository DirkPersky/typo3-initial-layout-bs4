jQuery.noConflict();
jQuery(document).ready(function($) {
  $('.fancybox').fancybox({
    closeBtn  : true,
    arrows    : true,
    nextClick : true,

    helpers : {
      thumbs : {
        width  : 50,
        height : 50
      }
    }
  });
  $('a[rel="fancybox"]').fancybox({
    closeBtn  : true,
    arrows    : true,
    nextClick : true,

    helpers : {
      thumbs : {
        width  : 50,
        height : 50
      }
    }
  });
 $(".various").fancybox({
    maxWidth  : 960,
    maxHeight  : 600,
    fitToView  : false,
    width    : '80%',
    height    : '80%',
    autoSize  : false,
    closeClick  : false,
    openEffect  : 'none',
    closeEffect  : 'none',
    type: 'iframe',
    nextClick : false,
    arrows     : false,
    
  });

 $('a[rel="various"]').fancybox({
    maxWidth  : 1024,
    maxHeight  : 800,
    fitToView  : false,
    width    : '90%',
    height    : '90%',
    autoSize  : true,
    closeClick  : false,
    openEffect  : 'none',
    closeEffect  : 'none',
    type: 'iframe',
    nextClick : false,
    arrows     : false,

  });
});