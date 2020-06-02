// do not import Barba like this if you load the library through the browser
import barba from '@barba/core';

export default class BarbaJS {
    private overlay:any;
    private selector:string;

    constructor() {
        this.selector = '#navigation #navbarResponsive .navbar-nav';
        this.overlay = jQuery('.barba-overlay');

        var me = this;
        // init Barba with a default "opacity" transition
        barba.init({
            timeout: 8000,
            prevent: (data:any) => this.prevent(data),
            requestError: (trigger:any, action:string, url:string, response:any) => {
                if (action === 'click') {
                    setTimeout(() => {
                        barba.force(url);
                    }, 100); // TImeout needed to make sure the force is not aborted
                }

                return false;
            },
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
        barba.hooks.afterLeave((data:any) => {
            me.afterLeave(data);
        });
    }

    afterLeave(data:any){
        // Set <body> classes for "next" page
        var nextHtml = data.next.html,
            response = nextHtml.replace(/(<\/?)body( .+?)?>/gi, '$1notbody$2>', nextHtml),
            body = jQuery(response).filter('notbody'),
            bodyClass:any = body.attr('class'),
            bodyID:any = body.attr('id');

        jQuery("body").attr("class", bodyClass).attr("id", bodyID);
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
            parent = link.parents('li');

        if(parent.is('li')){
            link.parents('.navbar-nav').find('li').removeClass('active');
            $(this.selector).find('li').removeClass('active');
            if(parent.length > 0 ) parent.addClass('active');
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
        if(typeof data.el.dataset.noAjax != 'undefined') return true;
        return data.event.defaultPrevented;
    }
}
