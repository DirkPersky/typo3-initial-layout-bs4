const penthouse = require('penthouse');
const CleanCSS = require('clean-css');
const fs = require('fs');

const urls = [
    'example.de',
    'example.de/imprint'
];

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

const penthouseMobileOptions = {
    ...penthouseOptions,

    width: 375,  // viewport width
    height: 667,  // viewport height
};

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
        fs.writeFileSync('app/Resources/Public/css/abovethefold.css', '/*Desktop*/'+output.styles);
    });
    // Create Mobile CSS
    new CleanCSS(CSSOptions).minify( CSS.mobile.join(''), function (error, output) {
        fs.writeFileSync('app/Resources/Public/css/abovethefold-xs.css', '/*Mobile*/'+output.styles);
    });
});
