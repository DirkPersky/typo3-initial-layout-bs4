/**
 * Hamburger Button
 * Author: Dirk Persky
 * modify: 22.01.2016
 */
$.fn.hamburgerButton = function (optionsConf) {
  var $this = $(this),
      $html = $('html'),
      $backdrop = $('.nav--backdrop');
  $this.target = $this.data('target');

  $($this.data('target')).on('show.bs.collapse', function () {
    $this.addClass('is-active');
    $html.addClass('nav--open');
  });
  $($this.data('target')).on('hide.bs.collapse', function () {
    $this.removeClass('is-active');
    $html.removeClass('nav--open');
  });
  $backdrop.on('click', () => {
    $($this.data('target')).collapse('hide');
  });
};


window.Statemanager.attach('hamburger-button', function () {
  /**
   * Init Hamburger
   */
  $('.hamburger').each(function () {
    $(this).hamburgerButton();
  });
});
