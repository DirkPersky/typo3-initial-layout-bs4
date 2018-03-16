/**
 * Load WebKon Information via Remote
 * <div data-webkon="info"></div>
 */
jQuery(function($){
    $.fn.webkonRemote = function(options){
        /**
         * Set Configuration Array
         */
        var settings = $.extend({
            url: 'https://marketing.gutenberghaus.de/typo3brand/'
        }, options);
        $(this).each(function (index, element) {
            var self = $(element),
                method = self.data('webkon') || 'info';
            // Load Form from URL
            $.ajax({
                url: settings.url + method + '.php',
                data: {
                    type: method,
                    host: window.location.host || null
                }
            }).then(onSuccess, onError);
            /**
             * Success Handling
             * @param data
             */
            function onSuccess(data) {
                // Add to HTML
                self.html(data);
                // find Mail Link
                self.find('a[data-link]').on('click', function(e){
                    var link = $(this).data('link');

                    if(link.length > 0) {
                        e.preventDefault();
                        e.stopPropagation();

                        window.location.href = 'mailto:'+link.replace('(at)','@');
                    }
                });
            }
            /**
             * Error Handling
             */
            function onError(staus) {
                // Do Nothing
            }
        });
    };
    /**
     * Bind Dynamic Searchform Loadind to Element
     */
    $('div[data-webkon]').webkonRemote();
});