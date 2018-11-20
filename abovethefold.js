const penthouse = require('penthouse');
const CleanCSS = require('clean-css');
const fs = require('fs');
/**
 * Parsing URL
 * @type {string[]}
 */
const urls = [
    'example.de',
    'example.de/imprint'
];
/**
 * Path where css will be saved
 * @type {{mobile: string, desktop: string}}
 */
const outFiles = {
    mobile: 'app/Resources/Public/css/abovethefold-xs.css',
    desktop: 'app/Resources/Public/css/abovethefold.css'
};
/**
 * Above The Fild Config
 * @type {{css: string, width: number, height: number, propertiesToRemove: string[]}}
 */
const penthouseOptions = {
    css: 'app/Resources/Public/css/style.css',

    width: 1300,  // viewport width
    height: 900,  // viewport height

    propertiesToRemove: [
        '(.*)transition(.*)',
        'cursor',
        'pointer-events',
        '(-webkit-)?tap-highlight-color',
        '(.*)user-select',
        'background-image',
        'content',
        'src'
    ],
};
/**
 * Above The fold Config for Mobile
 * @type {{css: string, width: number, height: number, propertiesToRemove: string[]}}
 */
const penthouseMobileOptions = {
    ...penthouseOptions,

    width: 375,  // viewport width
    height: 667,  // viewport height
};
/**
 * CSS Optimierung
 * @type {{level: {"1": {all: boolean}, "2": {all: boolean}}, inline: string[], fetch: CSSOptions.fetch}}
 */
const CSSOptions = {
    level: {
        1: {all: true},
        2: {all: true}
    },
    inline: ['all'],
    fetch:function (uri, inlineRequest, inlineTimeout, callback) {
        // remove all @Imports
        callback(null, '');
    }
};
/**
 * CSS Temp store
 * @type {{mobile: Array, desktop: Array}}
 */
let CSS = {
    mobile: [],
    desktop: []
};
// recursively generates critical css for one url at the time,
// until all urls have been handled
function startNewJob (options, _urls, key) {
    const url = _urls.pop(); // NOTE: mutates urls array
    if (!url) {
        // no more new jobs to process (might still be jobs currently in process)
        return Promise.resolve()
    }
    // run penthouse
    return penthouse({
        url,
        ...options
    })
        .then(criticalCss => {
            // do something with your criticalCSS here!
            CSS[key].push(criticalCss);
            // Then call to see if there are more jobs to process
            return startNewJob(options, _urls, key)
        })
}
/**
 * Run Mobile CSS
 */
Promise.all([
    // Start Desktop Jobs
    startNewJob(penthouseOptions, urls, 'desktop'),
    // Start Mobile Jobs
    startNewJob(penthouseMobileOptions, urls, 'mobile'),
]).then(() => {
    // Create Desktop CSS
    new CleanCSS(CSSOptions).minify( CSS.desktop.join(''), function (error, output) {
        fs.writeFileSync(outFiles.desktop, '/*Desktop*/'+output.styles);
    });
    // Create Mobile CSS
    new CleanCSS(CSSOptions).minify( CSS.mobile.join(''), function (error, output) {
        fs.writeFileSync(outFiles.mobile, '/*Mobile*/'+output.styles);
    });
});
