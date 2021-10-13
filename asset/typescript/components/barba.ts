// do not import Barba like this if you load the library through the browser
import barba from '@barba/core';

export default class BarbaJS {
    private overlay:any;
    private selector:string;
    private navbarCloseOnPageShift:boolean;
    private collapseSelector: string;
    private body: any;

    constructor() {
        this.selector = '.navbar-nav';
        this.navbarCloseOnPageShift = true;
        this.collapseSelector = '#navigation #navbarResponsive';
        this.overlay = jQuery('.barba-overlay');
        this.body = jQuery('html, body');

        var me = this;
        // init Barba with a default "opacity" transition
        barba.init({
            timeout: 8000,
            prevent: (data: any) => this.prevent(data),
            // cacheIgnore: true,
            // logLevel: 'debug',
            requestError: (trigger: any, action: string, url: string, response: any) => {
                if (action === 'click') {
                    setTimeout(() => {
                        barba.force(url);
                    }, 100); // TImeout needed to make sure the force is not aborted
                }
                // return false;
            },
            transitions: [{
                name: 'Animation Loader',
                leave: function (data: any) {
                    var done = (<any>this).async();
                    if (me.overlay.length > 0) {
                        me.overlay.on('transitionend webkitTransitionEnd oTransitionEnd', () => {
                            done();
                        });
                        me.overlay.addClass('show');
                    } else {
                        done();
                    }
                },
                enter: function(data:any) {
                    if (!me.barbaHasScroll(data.trigger)) {
                        me.body.stop().animate({
                            scrollTop: 0
                        }, 10);
                    }
                    // active Navigation
                    jQuery(window).trigger('dp--canvas');
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

    powermail() {
        if (typeof (<any>window).PowermailForm == 'undefined') return;
        var t = new (<any>window).PowermailForm(jQuery);
        t.initialize()
    }

    barbaHasScroll(trigger: any) {
        // error handling Browser Back/Forward
        try {
            var href = trigger.href,
                target: any = false;

            // default scroll element exist
            if (href.indexOf('#') != -1) {
                target = jQuery('#' + href.split("#")[1]);
            } else {
                // try to find default scroll position
                target = jQuery('[data-barba-scroll]');
            }

            if (target && target.length > 0) return target;
        } catch (e) {
        }
        return;
    }


    barbaScroll(trigger: any) {
        // error handling Browser Back/Forward
        try {
            var href = trigger.href,
                target: any = false,
                position: any = 0,
                me: any = this;

            jQuery('body').removeClass('noscroll');

            if (typeof href == 'undefined') return;
            setTimeout(() => {
                // default scroll element exist
                if (href.indexOf('#') != -1) {
                    target = jQuery('#' + href.split("#")[1]);
                } else {
                    // try to find default scroll position
                    target = jQuery('[data-barba-scroll]');
                }

                if (target && target.length > 0) {
                    position = target.offset().top - 40 - parseInt(<any>(jQuery(this.collapseSelector).outerHeight(true) || 0));

                    me.body.stop().animate({
                        scrollTop: position
                    }, 700);
                }
            }, 100);
        } catch (e) {
        }
    }

    prevent(data:any) {
        if (typeof data.el.dataset.noAjax != 'undefined') return true;
        // abort if PDF
        try {
            if (data.href.match(/\.pdf$/)) {
                return true;
            }
            if (data.target.href.match(/\.pdf$/)) {
                return true;
            }
        } catch (e) {
        }

        return data.event.defaultPrevented;
    }
}
