import fancybox from '@fancyapps/fancybox';

export default class Fancybox {
    private fancy:any;

    constructor(){
        this.fancy = fancybox;
    }

    init(){
        /**
         * Fancybox
         */
        var classicLightbox = jQuery('.fancybox, a[rel="fancybox"]');
        classicLightbox.map((index, element) =>{
            var el = jQuery(element),
                rel = el.attr('rel') || null;

            if(rel) el.attr('data-fancybox', rel);
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
        jQuery('.various, a[rel="various"]').fancybox(<any>{
            type: 'iframe',
        });
    }
}
