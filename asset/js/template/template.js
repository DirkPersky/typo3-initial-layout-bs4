/**
 * To Top Button
 */
$('#to-top').on('click', function (e) {
    e.preventDefault();

    $('html, body').animate({
        scrollTop: 0
    }, 1500);
});
$(window).scroll(function () {
    if ($(this).scrollTop() > 300) { // Wenn 100 Pixel gescrolled wurde
        $('#to-top').fadeIn();
    } else {
        $('#to-top').fadeOut();
    }
});
/**
 * Anchor Scroll
 */
$('[data-link]').on('click', function (e) {
    if (scrollToAnchor($(this).attr('href'))) {
        e.preventDefault();
    }
});

function scrollToAnchor(_selector) {
    /**
     * Has Selector container Anchor?
     */
    if (_selector.indexOf("#") >= 0) {
        // Get Anchor
        var anchor = _selector.split("#")[1];
        // Get element
        var $self = jQuery('#' + anchor);
        if ($self.length > 0) {
        // Scroll To
            jQuery('html, body').animate({
                scrollTop: ($self.offset().top - parseInt(jQuery('body').css('padding-top')))
            }, 1500);

            return true;
        }
    }

    return false;
}

