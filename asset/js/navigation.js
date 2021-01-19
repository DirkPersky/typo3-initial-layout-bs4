/*
 * Copyright (c) 2020.
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    MIT
 */
$.fn.DPCanvas = function (options){
    /**
     * Set Configuration Array
     */
    var settings = $.extend({
        type: 22,
        wrap: '<div class="canvas--menu"/>',
        backdrop: '.nav--backdrop'
    }, options);
    // container
    var $button = $(this);
    $container = $(settings.wrap);
    // add data class
    if($button.data('dp-canvis')) $container.addClass($button.data('dp-canvis'));
    // at wrapper to body
    $('body').append($container);
    // Initial Load Content
    loadNavigationContent();
    // bind trigger events
    bindTriggers();
    /**
     * Load Ajax Content from System
     */
    function loadNavigationContent(){
        var current = window.location.protocol+'//' + window.location.hostname + window.location.pathname;
        // make Ajax Request
        var response = $.get({
            url: current,
            cache: true
        }, {
            type: settings.type
        });
        // handle Response
        response.then(function (data){
            $container.html(data);
            // add Bindings
            linkBindings();
            // add Toggle Button now
            toggleButtonEvents();
            // sync action
            syncNav(data);
        }, function (error){ });
    }
    /**
     * Element Click Bindings
     */
    function linkBindings(){
        // Add CLick Bindings
        var btn = $container.find('.trigger'),
            header = $container.find('.list-header');
        // Bind Open Handler
        btn.on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // get Parent Droddown
            $(e.delegateTarget).closest('.dropdown').find('> .dropdown-wrap').addClass('show');
        });
        // Bind Close Handler
        header.on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // get Parent Droddown
            $(e.delegateTarget).closest('.dropdown').find('> .dropdown-wrap').removeClass('show');
        });
    }
    /**
     * Toggle button Events
     */
    function toggleButtonEvents(){
        // close event on Backdropclick
        $(settings.backdrop).off('click').on('click', () => {
            $('html').removeClass('nav--open');
            $button.removeClass('is-active');
        });
        // bind button click
        $button.off('click').on('click', () => {
            $('html').toggleClass('nav--open');
            $button.toggleClass('is-active');
        });
        // remove disable attribute
        $button.removeAttr('disabled');
    }

    /**
     * Reinit Triggers
     */
    function bindTriggers(){
        $(window).on('dp--canvas', () => {
            // Initial Load Content
            loadNavigationContent();
            // close events
            $(settings.backdrop).trigger('click');
        });
    }

    /**
     * Sync Main Action
     */
    function syncNav(data){
        var $syncTarget = $button.data('sync');
        if($syncTarget && ($syncTarget = $($syncTarget)).length > 0) {
            $syncTarget.html($container.find('.navbar-nav').clone());
        }
    }
};

$('[data-dp-canvis]').DPCanvas();

window.Statemanager.attach('dropdown-menu-position', function () {
    /**
     * Position dropdown left/right
     */
    $('.nav-item.dropdown').on('mouseenter', function () {
        var dropdownList = $(this).find('.dropdown-wrap'),
            dropdownWidth = dropdownList.width(),
            dropdownOffset = dropdownList.offset(),
            offsetLeft = dropdownOffset.left,
            docWidth = $(window).width(),
            isDropdownVisible = (offsetLeft + dropdownWidth <= docWidth);

        if (!isDropdownVisible) {
            dropdownList.addClass('pull-right');
        }
    });

    $('.nav-item.dropdown').on('mouseleave', function () {
        var dropdownList = $(this).find('.dropdown-wrap');

        dropdownList.removeClass('pull-right');
    });
});