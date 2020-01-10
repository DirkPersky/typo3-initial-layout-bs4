window.Statemanager.attach('dp-cookieconsent-hooks', function(){
    /**
     * Bin Consent Handling for Content Elements
     */
    if(typeof window.DPCookieConsent != 'undefined'){
        // init overlays
        window.DPCookieConsent.overlays();
        // start chouse handling
        var status = window.DPCookieConsent.popup.getStatus();
        if (window.DPCookieConsent.popup.hasConsented() && (status == 'dismiss' || status == 'allow')){
            window.DPCookieConsent.loadCookies();
        }
    }
});
