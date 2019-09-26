!function ($) {
    $.fn.navigationBar = function() {
        var parent = $(this);

        parent.each((index, el) => {
            var self = $(el);

            self.on('hide.bs.collapse', function () {
                $('.navbar').removeClass('show');
            });
            self.on('show.bs.collapse', function () {
                parent.trigger('collapse.navigation.bar', index);

                $('.navbar').addClass('show');

                var _input = self.find('input[name="tx_indexedsearch_pi2[search][sword]"]');
                if(_input.length) {
                    setTimeout(function () {
                        _input.focus();
                    }, 400)
                }
            });
            self.on('collapse.navigation.bar', function(e, targetIndex){
                if(targetIndex !== index) {
                    self.collapse('hide');
                }
            });
        });
    };

    $('#navbarResponsive,#collapseSearch').navigationBar();

    $.fn.accordionCollape = function(){
        var parent = $(this);

        parent.map(function(i, e) {
            var self = $(e),
                target = self.attr('href'),
                icon = self.data('icon');

            $(target).on('show.bs.collapse', () => {
                $(icon).addClass('in');
            });

            $(target).on('hide.bs.collapse', () => {
                $(icon).removeClass('in');
            });
        })
    };

    $('a[data-icon]').accordionCollape();

}(jQuery);
