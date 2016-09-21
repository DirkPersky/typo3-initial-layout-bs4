(function($) {
	$.fn.verticalAlign = function( optionsConf ) {
		var $this = $(this),
			_timer = null,
			options = {
				children: '> div',
			};

		$.extend(options, optionsConf);

		var alignElements = function(){
			$this.find(options.children).each(function(){
				var $el = $(this),
					$height = 0; 

				if( $( window ).width() >= 768 ){
	          		$height = (($this.height() - $el.height())/2);
				} 

				$el.css('margin-top', $height +'px');
			});
		};

		_timer = setTimeout(alignElements, 500);

		$(window).resize(function(event) {
			clearTimeout(_timer);
			_timer = setTimeout(alignElements,500);
		});
	};

    // auto-initialize plugin
	$('.vAlign').each(function(){
        $(this).verticalAlign();
    });
})(jQuery);
