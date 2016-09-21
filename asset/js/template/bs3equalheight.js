/**
 * Bootstrap Row Equal Height
 * Author: Dirk Persky
 * modify: 01.12.2015
 * @selector class="row row-equalize"
 * @config data-child="{selector}"
 * @config data-child-attribute="height"
 * @config data-ignore="true" //On Row Child Element
 */
(function($) {
    $.fn.bs3equalHeights = function(options) {
      // Config Array
      var self = {
            $this: $(this),
            maxHeight: 0,
            config: {
              xs: false,
              sm: '(min-width: 768px)',
              md: '(min-width: 992px)',
              lg: '(min-width: 1200px)'
            },
            css :'min-height',
            childElement: false
          };
      // Working Variables
      var equalizeTimer,
          $childStyle = self.$this.data('child-attribute') || self.css,
          $childElement = self.$this.data('child') || self.childElement,
          $calcObj = {size: 0, el: []};

          // Initial
          equalizeTimer = setTimeout(init,400);
          // Bind Events for Resizing;
          bindEvents();

      function bindEvents(){
        // Re Init on Rezise
        $(window).resize(function(event) {
          clearTimeout(equalizeTimer);
          equalizeTimer = setTimeout(init,400);
        });
        // Waypoint Recalc
        if( $.fn.waypoint ) {
          self.$this.waypoint(function(direction){
            clearTimeout(equalizeTimer);
            equalizeTimer = setTimeout(init,400);
          },{
            triggerOnce: true,
            offset: '100%' // Way to top of Page
          });
        }
        // If Image Loading
        self.$this.find('.img-responsive').bind('load',function(){
          clearTimeout(equalizeTimer);
          equalizeTimer = setTimeout(init,400);
        });
      }
      function init(){
        // reset Values
        resetCalc();
        // Iterate over all cols
        self.$this.children('[class*=col-]').each( function(index){
          var $el = $(this);
              _width = 12; // row max colum before line break
          // reset Height of element
          $el.css(self.css,0);
          // reset Child Height of element
          if($childElement) {
            switch ($childStyle) {
              case 'height':
                $el.find($childElement).css($childStyle, 'auto');
                break;
              default:
                $el.find($childElement).css($childStyle, 0);
            }
          }
          // get Current element width depends on viewport
          for (var media in self.config) {
            if(self.config.hasOwnProperty(media) &&  window.matchMedia(self.config[media]).matches ){
              _temp = getHeight($el, media);
              if(_temp) _width = _temp;
            }
          }
          if(_width == 12){
            _temp = getHeight($el, 'xs');
            if(_temp) _width = _temp;
          }
          // Set the New Heights for Elements in a Row
          if(($calcObj.size + _width) > 12) {
            if(_width == 12) {
              resetCalc();
            } else {
              setHeight();
            }
          }
          // Calc max Height of element
          var height = $el.outerHeight();
          if(height > self.maxHeight && !$el.data('ignore')) {
            self.maxHeight = parseInt(height);
          }
          // Push to Que
          $calcObj.size += _width;
          $calcObj.el.push({el: $el, width: _width});
        });
        // Set the New Heights for all Elements witch stays in que
        setHeight();
      }
      function setHeight(){
        // Iterate over alle Elements in Que and set ne height
        for (var index in $calcObj.el) {
          // If Object FullWidth do nothing
          if($calcObj.el[index].width !== 12) {
            $calcObj.el[index].el.css('min-height', self.maxHeight);
            if($childElement) {
              $calcObj.el[index].el.find($childElement).css($childStyle, self.maxHeight);
            }
          }
        }
        // Reset que
        resetCalc();

        return true;
      }
      function resetCalc(){
        // reset Values
        self.maxHeight = 0;
        $calcObj = {size: 0, el: []};
      }
      function getHeight(_el, _media){
        _class = _el.attr('class');
        _index = _class.indexOf('col-'+_media+'-');

        if(_index >= 0 ) {
          // get media Query class from bootstrap
          match =  new RegExp('col-'+_media+'-([0-9]{1,2})', 'i');
          match = _class.match(match);

          if(match[1]) return parseInt(match[1]);
        }

        return false;
      }
    };

    // auto-initialize plugin
    $('.row.row-equalize').each(function(){
        $(this).bs3equalHeights();
    });
})(jQuery);
