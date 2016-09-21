!function($){
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

}(jQuery);
