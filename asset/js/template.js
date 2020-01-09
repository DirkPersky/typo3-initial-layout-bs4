/**
 * Anchor Scroll
 */
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

