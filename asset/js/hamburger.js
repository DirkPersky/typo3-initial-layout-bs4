/**
 * Hamburger Button
 * Author: Dirk Persky
 * modify: 22.01.2016
 */
$.fn.hamburgerButton = function( optionsConf ) {
  var $this = $(this);
      $this.target = $this.data('target');

    $($this.data('target')).on('show.bs.collapse', function(){
      $this.addClass('is-active');
    });
    $($this.data('target')).on('hide.bs.collapse', function(){
      $this.removeClass('is-active');
    });
};


window.Statemanager.attach('hamburger-button', function(){
  /**
   * Init Hamburger
   */
  $('.hamburger').each(function(){
    $(this).hamburgerButton();
  });
});
