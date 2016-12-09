<?php
/*
 |--------------------------------
 | Default Konfiguration 
 |--------------------------------
 */
$_defaultConf = array(
    'init' => array(
        'appendMissingSlash' => 'ifNotFile,redirect',
        'emptyUrlReturnValue' => '/',
    ),
    'pagePath' => array(//   'rootpage_id' => '1',
    ),
    'fileName' => array(
        'defaultToHTMLsuffixOnPrev' => 0,
        'acceptHTMLsuffix' => 1,
        'index' => array(
            'print' => array(
                'keyValues' => array(
                    'type' => 98,
                ),
            ),
            'feed.rss' => array(
                'keyValues' => array(
                    'type' => 9818,
                )
            ),
        ),
    ),
    'preVars' => array(
        array(
            /*
             |--------------------------------
             | Language Configuration
             |--------------------------------
            */
            'GETvar' => 'L',
            'valueMap' => array(
                'en' => '1',
                'nl' => '2',
            ),
            'noMatch' => 'bypass',
        ),
    ),
    'postVarSets' => array(
        '_DEFAULT' => array(
            'news' => array(
                array(
                    'GETvar' => 'tx_news_pi1[news]',
                    'lookUpTable' => array(
                        'table' => 'tx_news_domain_model_news',
                        'id_field' => 'uid',
                        'alias_field' => 'title',
                        'useUniqueCache' => 1,
                        'useUniqueCache_conf' => array(
                            'strtolower' => 1,
                            'spaceCharacter' => '-',
                        ),
                    ),
                ),
            ),
        ),
    ),
);
/*
 |--------------------------------
 | RealURL Config
 |--------------------------------
 */
$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl'] = array(
    '_DEFAULT' => $_defaultConf,
    /*
     |--------------------------------
     | WebSeite Route
     |--------------------------------
     */
    'web-kon.de' => array_merge($_defaultConf, array(
        'pagePath' => array(
            'rootpage_id' => '1',
        ),
    )),
    /*
     |--------------------------------
     | WebSeite Redirect www to none
     |--------------------------------
     */
    'www.web-kon.de' => 'web-kon.de',
);
