window.Statemanager.attach('dp-cookieconsent-hooks', function(){
    // init overlays
    if(typeof window.DPCookieConsent != 'undefined'){
        window.DPCookieConsent.overlays();
    }
});
