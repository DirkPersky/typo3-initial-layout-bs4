// // CODELAB: Register service worker.
if ("serviceWorker" in navigator) {
    window.addEventListener('load', () => {

        if (navigator.serviceWorker.controller) {
            console.log("[PWA Builder] active service worker found, no need to register");
        } else {
            var manifest = jQuery('link[rel="manifest"]');
            if(manifest.length > 0){
                // Register the service worker
                navigator.serviceWorker
                    .register(manifest.data('worker'), {
                    })
                    .then(function (reg) {
                        console.log("[PWA Builder] Service worker has been registered for scope: " + reg.scope);
                    });
            }

        }

    });
}
