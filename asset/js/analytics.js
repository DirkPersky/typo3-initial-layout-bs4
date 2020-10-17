/**
 * Update Analytics on Barba Reload
 */
window.Statemanager.attach('analytics-update', function() {
    if (typeof window.dataLayer != 'function' && typeof window.dataLayer != 'undefined') {
        window.dataLayer.some(set => {
            if (set[0] == 'config') {
                var config = set[2];
                config.page_title = document.title;
                config.page_path = (window.location.href).replace(window.location.origin, '').toLowerCase();

                gtag('js', new Date());
                gtag(set[0], set[1], config);
                return true;
            }
        });
    }
});
