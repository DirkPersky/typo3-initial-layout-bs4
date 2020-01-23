// do not import Barba like this if you load the library through the browser
import barba from '@barba/core';

export default class BarbaJS {
    private overlay:any;
    private selector:string;

    constructor() {
        this.selector = '#navigation > .navbar';
        this.overlay = jQuery('.barba-overlay');

        var me = this;
        // init Barba with a default "opacity" transition
        barba.init({
            timeout: 5000,
            prevent: (data:any) => this.prevent(data),
            transitions: [{
                name: 'legacy-example',
                leave: function (data:any) {
                    var done = (<any>this).async();
                    if(me.overlay.length > 0) {
                        me.overlay.on('transitionend webkitTransitionEnd oTransitionEnd', () => {
                            done();
                        });
                        me.overlay.addClass('show');
                    } else {
                        done();
                    }
                },
                enter: function(data:any){
                    jQuery('html, body').animate({
                        scrollTop: 0
                    }, 10);
                    // active Navigation
                    me.markActiveNav(data.trigger);
                },
                afterEnter: function (data:any) {
                    if(me.overlay.length > 0) me.overlay.removeClass('show');
                    me.afterEnter(data);
                }
            }]
        });
    }

    afterEnter(data:any) {
        // scroll trigger
        this.barbaScroll(data.trigger);
        // rebind powermail
        this.powermail();
        // init handlers
        (<any>window).Statemanager.call();
    }

    markActiveNav(trigger:any){
        var link = jQuery(trigger),
            parent = link.parent();

        if(parent.is('li')){
            link.parents('ul').find('li').removeClass('active');
            parent.addClass('active');
        }
    }

    powermail(){
        if(typeof (<any>window).PowermailForm == 'undefined') return;
        var t = new (<any>window).PowermailForm(jQuery);
        t.initialize()
    }

    barbaScroll(trigger: any) {
        var href = trigger.href,
            target: any = false,
            position: any = 0;

        jQuery('body').removeClass('noscroll');

        setTimeout(() => {

            // default scroll element exist
            if (href.indexOf('#') != -1) {
                target = jQuery('#' + href.split("#")[1]);
            } else {
                // try to find default scroll position
                target = jQuery('[data-barba-scroll]');
            }

            if (target && target.length > 0) {
                position = target.offset().top - parseInt(<any>(jQuery(this.selector).outerHeight() || 0));

                jQuery('html, body').stop().animate({
                    scrollTop: position
                }, 1500);
            }
        }, 500);

    }

    prevent(data:any) {
        return data.event.defaultPrevented;
    }
}
