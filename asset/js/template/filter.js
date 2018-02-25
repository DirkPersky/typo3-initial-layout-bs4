jQuery(function($){
   $.fn.mediaFilter = function () {
       /**
        * Set Configuration Array
        */
       var settings = $.extend({
           elementSelector: '.ce-column',
           filterActiveClass: 'active',
           hideClass: 'hide-column',
           figCaption: '.image-caption',
           hideCSS: {
               width: 0,
               padding: 0,
           }
       }, options);
       // Bind to Elements
       $(this).each(function (index, element) {
           var parent = $(this),
               targetContainer = $(parent.attr('filter-media')),
               elements = targetContainer.find(settings.elementSelector),
               filter = [];

           elements.map(function(i, e){
               console.log(i,e);
           });

           function bindFilter(){
               parent.find('a').on('click', function (e) {
                   e.preventDefault();
                   // add Class to Element
                   e.addClass(settings.filterActiveClass);
                   console.log(e);
                   // Filter Elements
                   filterElemenst();
               })
           }
           function filterElemenst(key) {
                elements.each(function (i, e) {
                   var self = $(e),
                       caption = self.find(settings.figCaption);
                   // has Element Caption
                   if(key && caption.length > 0) {
                       var text = caption.text();
                       if(text.indexOf(key) != -1) {
                           // Caption Has text
                           resetFilter(self);
                       } else {
                           // Caption hasn't text
                           if(settings.hideClass.length > 0){
                               self.addClass(settings.hideClass);
                           }
                           if(settings.hideCSS.length > 0) {
                               self.css(settings.hideCSS);
                           }
                       }
                   } else {
                       resetFilter(self);
                   }
                });
           }
           /**
            * Restore all Elements
            */
           function resetFilter(element){
               if(settings.hideClass.length > 0){
                   element.removeClass(settings.hideClass);
               }
               if(settings.hideCSS.length > 0) {
                   element.removeAttr('style');
               }
           }
       });
   };

   $('.filter[filter-media]').mediaFilter();
});