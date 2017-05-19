/**
 * Onepage Funktions
 * Author: Dirk Persky
 * modify: 19.05.2017
 * @selector class="onepage"
 */
(function ($) {
    "use strict";
    $.fn.onepageHandler = function () {
        var parent = $(this);

        parent.each(function (index, el) {
            var self = $(el),
                next = null,
                prev = null;

            // Get prev Element
            if (index == 0) {
                prev = parent.eq(parent.length - 1);
            } else {
                prev = parent.eq(index - 1);
            }
            // Get Next Element
            if (index == ( parent.length - 1)) {
                next = parent.eq(0);
            } else {
                next = parent.eq(index + 1);
            }
            // Bind CLick Action
            self.find('a[data-onepage]').bind('click', function (e) {
                e.preventDefault();
                var offset = parseInt($('.navbar').height()) || 100;

                switch ($(this).data('onepage')) {
                    case 'prev':
                        $('html, body').stop().animate({
                            scrollTop: prev.offset().top - offset
                        }, 1500);
                        break;
                    default:
                        $('html, body').stop().animate({
                            scrollTop: next.offset().top - offset
                        }, 1500);
                }

            });
        });
    };

    $('.onepage').onepageHandler();

})(jQuery);
