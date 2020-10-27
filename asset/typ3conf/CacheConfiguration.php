<?php

if (!function_exists('mw_setCacheBackend')) {
    function mw_setCacheBackend($backendClassName, $cacheName, $lifetime = NULL)
    {
        $GLOBALS['TYPO3_CONF_VARS']['SYS']['caching']['cacheConfigurations'][$cacheName]['backend'] = $backendClassName;

        if (isset($lifetime)) {
            $GLOBALS['TYPO3_CONF_VARS']['SYS']['caching']['cacheConfigurations'][$cacheName]['options'] = array("defaultLifetime" => $lifetime);
        } else {
            $GLOBALS['TYPO3_CONF_VARS']['SYS']['caching']['cacheConfigurations'][$cacheName]['options'] = array();
        }
    }
}

$mw_apcExtensionLoaded = extension_loaded('apc');
$mw_apcuExtensionLoaded = extension_loaded('apcu');
$mw_apcAvailable = $mw_apcExtensionLoaded || $mw_apcuExtensionLoaded;
$mw_apcEnabled = ini_get('apc.enabled') == TRUE;

if (method_exists('TYPO3\CMS\Core\Information\Typo3Version', 'getBranch') && method_exists('TYPO3\CMS\Core\Core\Environment', 'getContext')) {
    $get_version = new TYPO3\CMS\Core\Information\Typo3Version();
    $version = $get_version->getBranch();
    $context = TYPO3\CMS\Core\Core\Environment::getContext();
} else {
    $version = TYPO3_version;
    $context = TYPO3\CMS\Core\Utility\GeneralUtility::getApplicationContext();
}

if (PHP_SAPI !== 'cli' && $context !== 'Development' && $mw_apcAvailable && $mw_apcEnabled) {
    $mw_backendClassName = 'TYPO3\\CMS\\Core\\Cache\\Backend\\ApcuBackend';
} else {
    $mw_backendClassName = 'TYPO3\\CMS\\Core\\Cache\\Backend\\FileBackend';
}

if (substr($version, 0, 2) === "10") {
    mw_setCacheBackend($mw_backendClassName, 'hash');
    mw_setCacheBackend($mw_backendClassName, 'pages');
    mw_setCacheBackend($mw_backendClassName, 'pagesection', 2592000);
    mw_setCacheBackend($mw_backendClassName, 'rootline', 2592000);
    mw_setCacheBackend($mw_backendClassName, 'imagesizes', 0);
} elseif ($version[0] === "9") {
    mw_setCacheBackend($mw_backendClassName, 'cache_hash');
    mw_setCacheBackend($mw_backendClassName, 'cache_pages');
    mw_setCacheBackend($mw_backendClassName, 'cache_pagesection', 2592000);
    mw_setCacheBackend($mw_backendClassName, 'cache_rootline', 2592000);
    mw_setCacheBackend($mw_backendClassName, 'cache_imagesizes', 0);
    mw_setCacheBackend($mw_backendClassName, 'extbase_reflection', 0);
    mw_setCacheBackend($mw_backendClassName, 'extbase_datamapfactory_datamap', 0);
} elseif ($version[0] === "8" || $version[0] === "6") {
    mw_setCacheBackend($mw_backendClassName, 'cache_hash');
    mw_setCacheBackend($mw_backendClassName, 'cache_pages');
    mw_setCacheBackend($mw_backendClassName, 'extbase_datamapfactory_datamap');
    mw_setCacheBackend($mw_backendClassName, 'cache_pagesection', 2592000);
    mw_setCacheBackend($mw_backendClassName, 'cache_rootline', 2592000);
    mw_setCacheBackend($mw_backendClassName, 'cache_imagesizes', 0);
    mw_setCacheBackend($mw_backendClassName, 'extbase_object', 0);
    mw_setCacheBackend($mw_backendClassName, 'extbase_reflection', 0);
} elseif ($version[0] === "7") {
    mw_setCacheBackend($mw_backendClassName, 'cache_hash');
    mw_setCacheBackend($mw_backendClassName, 'cache_pages');
    mw_setCacheBackend($mw_backendClassName, 'extbase_datamapfactory_datamap');
    mw_setCacheBackend($mw_backendClassName, 'extbase_typo3dbbackend_queries');
    mw_setCacheBackend($mw_backendClassName, 'cache_pagesection', 2592000);
    mw_setCacheBackend($mw_backendClassName, 'cache_rootline', 2592000);
    mw_setCacheBackend($mw_backendClassName, 'cache_imagesizes', 0);
    mw_setCacheBackend($mw_backendClassName, 'extbase_object', 0);
    mw_setCacheBackend($mw_backendClassName, 'extbase_reflection', 0);
} else {
    mw_setCacheBackend($mw_backendClassName, 'cache_hash');
    mw_setCacheBackend($mw_backendClassName, 'cache_pages');
    mw_setCacheBackend($mw_backendClassName, 'cache_pagesection', 2592000);
    mw_setCacheBackend($mw_backendClassName, 'cache_rootline', 2592000);
    mw_setCacheBackend($mw_backendClassName, 'cache_imagesizes', 0);
    mw_setCacheBackend($mw_backendClassName, 'extbase_datamapfactory_datamap', 0);
}