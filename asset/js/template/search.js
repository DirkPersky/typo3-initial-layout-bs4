jQuery(function ($) {
    $.fn.searchLoading = function (options) {
        /**
         * Set Configuration Array
         */
        var settings = $.extend({
            type: 9718,
            clearHTML: true,
            submitSelector: 'a',
            formSelector: '[form-input]',
            inputSelector: '#tx-indexedsearch-searchbox-sword',
            parentFormSelector: '#tx_indexedsearch',
            onError :null,
            onSuccess:null,
        }, options);
        $(this).each(function (index, element) {
            /**
             * Loop Over Elements
             */
            var parent = $(element),
                submitBtn = parent.find(settings.submitSelector),
                href = parent.data('href'),
                targetContainer = parent.find(settings.formSelector),
                ajaxTimer = null;
            // Load Form from URL
            clearTimeout(ajaxTimer);
            ajaxTimer = setTimeout(function () {
                // Call Ajax
                $.ajax({
                    url: href,
                    data: {
                        type: settings.type
                    },
                }).then(function(data, status, request)  {
                    // Get Ajax Table
                    var targetTable = $(data).find(settings.parentFormSelector);
                    // Call Success Handling
                    onSucces(targetTable);
                },function(status)  {
                    // Errot Handling bind link to Seach Form
                    onError();
                });
            }, 50);
            /**
             * Global Functions
             */
            function onSucces(content) {
                // get Input
                var input = content.find(settings.inputSelector);
                // Clear Index Search HTMl
                if(settings.clearHTML) {
                    // move Submit Button
                    var submit = content.find('.tx-indexedsearch-search-submit');
                    submit.hide();
                    content.append( submit );
                    // append Input to Form
                    content.append(input.detach());
                    // add Focus bar after Input
                    content.append('<div class="focus-bar"/>');
                    // Remove Fieldset
                    content.find('fieldset').remove();
                }
                // clear & remove IDS
                content.attr('id', 'ajax-form-loaded');
                content.find('input').removeAttr('id');
                content.find('select').removeAttr('id');
                // Write to HTMl
                targetContainer.append(
                    content
                );
                // Add Class to Form for Animatio
                setTimeout(function(){
                    targetContainer.addClass('show');
                }, 50);
                // Bind Submit
                submitBtn.on('click', function(e){
                    e.preventDefault();
                    // Submit form now
                    content.submit();
                });
                // call Success Handling
                if(settings.onSuccess) {
                    settings.onSuccess(parent, content);
                }
            }
            /**
             * On Error Link to Form on Button Click
             */
            function onError() {
                submitBtn.on('click', function(e){
                    e.preventDefault();
                    // ridirect now
                    window.location = href;
                });
                // call Error Handling
                if(settings.onError) {
                    settings.onError(parent);
                }
            }
        });
    };
    /**
     * Bind Dynamic Searchform Loadind to Element
     */
    $('.search[search-loading]').searchLoading({
        type: 9718,
    });
    $('[search-loading]').searchLoading({
        type: 9718,
        onError: function (element, href) {
            $('div[data-target="#collapseSearch"]').on('click',(e) => {
                e.preventDefault();
                e.stopPropagation();

                window.location = href;
            });
        }
    });
});
