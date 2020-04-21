$.fn.dropDownMenu = function(){
    this.map(function(index, el){
        var self = $(el),
            link = self.find(' > .nav-link'),
            dropdown = self.find(' > .dropdown-wrap');
        // Create Toggle Button
        link.append('<span class="trigger"/>');
        // Add Label to SubNav
        dropdown.find('> ul').prepend('<li class="list-header">'+link.text()+'</li>');
        // Add CLick Bindings
        var btn = link.find('.trigger'),
            header = dropdown.find('> ul > .list-header');
        // Bind Open Handler
        btn.on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            dropdown.addClass('show');
        });
        // Bind Close Handler
        header.on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            dropdown.removeClass('show');
        });
    });
};

window.Statemanager.attach('dropdown-menu', function(){
    /**
     * Init Navigation
     */
    $('.nav-inline .dropdown').dropDownMenu();
});


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