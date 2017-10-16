jQuery(function($){
    var classicLightbox = $('.fancybox, a[rel="fancybox"]');
    classicLightbox.each((index, el) =>{
        var el = $(el),
            rel = el.attr('rel');

        el.attr('data-fancybox', rel);
    });
    classicLightbox.fancybox({
        buttons : [
            'close',
            'thumbs'
        ],
        thumbs : {
            autoStart : true
        }
    });
    $('.various, a[rel="various"]').fancybox({
        type: 'iframe',
    });
});