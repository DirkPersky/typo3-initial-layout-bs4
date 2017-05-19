!function ($) {
    /**
     * Popover for Typo3
     */
    // $('[data-toggle="popover"]').popover({
    //   html: true,
    //   content: function () {
    //     selector = $(this).data('innerhtml');
    //     return $(selector).html();
    //   },
    //   placement: function(){
    //     placement = this.$element.data('placement');
    //     id = this.$element.data('id');
    //     this.$tip.attr('id', id);
    //     return placement;
    //   }
    // });

    /**
     * modal
     */
    // $('.modal').on('show.bs.modal',function(e){
    //   window.location.hash = e.target.id;
    //
    //   form = $(this).find('form');
    //   if(form.length > 0 && form.attr('action').indexOf('#') == -1)
    //      form.attr('action',form.attr('action') + window.location.hash);
    // });
    // $('.modal').on('hide.bs.modal',function(e){
    //   if(window.location.hash == '#'+e.target.id)
    //     window.location.hash = '';
    // });
    // if(window.location.hash){
    //   var hashID = window.location.hash;
    //   if(hashID.indexOf('/') == -1) {
    //     hashID = $(hashID);
    //     if(hashID.hasClass('modal')){
    //       hashID.modal('show');
    //     }
    //   }
    // }

    /**
     * Accordion
     */
    $('.panel-collapse').on('show.bs.collapse hide.bs.collapse', function (e) {
        var type = e.type,
            id = e.target.id,
            anker = $('.panel-heading a[href="#' + id + '"]');

        switch (type) {
            case 'hidden':
            case 'hide':
                $(anker.data('icon')).removeClass('in');
                break;
            case 'shown':
            case 'show':
                $(anker.data('icon')).addClass('in');
                break;
        }
    });


    $.fn.navDropdown = function () {
        var parent = $(this);

        parent.each(function(){
            var self = $(this),
                target = $(self.data('attach')),
                close = $(self.data('close'));
            // Show Handler
            self.on('show.bs.collapse', function(e){
                // CLose all Open
                close.collapse('hide');
                // Add in Class
                target.addClass('in');
                self.parents('.navbar').addClass('in');
                // Hide Extended Buttons
                $('.navbar-toggler-buttons').addClass('out');
                // Get Input for Focus if exist
                var hasInput = self.find('input');
                if(hasInput){
                    setTimeout(function () {
                        hasInput.first().focus();
                    }, 400)
                }
            });
            // Close Handler
            self.on('hide.bs.collapse', function(e){
                // Remove Classes
                target.removeClass('in');
                self.parents('.navbar').removeClass('in');
                // Show Extended Buttons
                $('.navbar-toggler-buttons').removeClass('out');
            });
            // Handler Close button Click
            target.find('> .close').on('click', function(e){
                e.preventDefault();
                self.collapse('hide');
            });
        });
    };

    $('#navbarResponsive,#navbarSearch').navDropdown();
}(jQuery);
