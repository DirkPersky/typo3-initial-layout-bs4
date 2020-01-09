export default function initJS(){
    /**
     * Init Hamburger
     */
    $('.hamburger').each(function(){
        $(this).hamburgerButton();
    });
    /**
     * Init Navigation
     */
    $('.nav-inline .dropdown').dropDownMenu();
    /**
     * Bind Dynamic Searchform Loadind to Element
     */
    $('.search[search-loading]').searchLoading({
        type: 9718,
    });
    $('[search-loading]').searchLoading({
        type: 9718,
        onError: function (element, href) {
            $('div[data-target="#collapseSearch"]').on('click',(e) => {
                e.preventDefault();
                e.stopPropagation();

                window.location = href;
            });
        }
    });
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
    /**
     * Typo3 Bootstrap
     */
    $('#navbarResponsive,#collapseSearch').navigationBar();
}
