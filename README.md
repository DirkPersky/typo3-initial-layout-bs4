# Start Developing with SASS & combined JavaScript files for TYPO3
This project should help you to start developing with SASS and minified JavaScript to get an high [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) Ranking.

## Required
- [NPM-Package manager](https://nodejs.org/)
- [TYPO3 8.7.9+](https://typo3.org/download/)

## Recommended TYPO3 Extensions
**basics**
- [gridelements](https://extensions.typo3.org/extension/gridelements/)
- [dp_cookieconsent](https://github.com/DirkPersky/typo3-dp_cookieconsent)
- [cs_seo](https://extensions.typo3.org/extension/cs_seo/)
- [realurl](https://extensions.typo3.org/extension/realurl/)

**performance**
- [scriptmerger](https://extensions.typo3.org/extension/scriptmerger/)
- [sourceopt](https://extensions.typo3.org/extension/sourceopt/)
- [staticfilecache from **GitHub**](https://github.com/lochmueller/staticfilecache/)

**optional**
- [rte_ckeditor_fontawesome](https://github.com/DirkPersky/typo3-rte-ckeditor-fontawesome)
- [news](https://extensions.typo3.org/extension/news/)
- [recaptcha](https://extensions.typo3.org/extension/recaptcha/)
- [rlmp_language_detection](https://extensions.typo3.org/extension/rlmp_language_detection/)
- [frontend_editing](https://extensions.typo3.org/extension/frontend_editing/)


## Default used NPM-Modules
- [Bootstrap 4](http://getbootstrap.com/)
- [Font Awesome 5](https://fontawesome.com/)
- [Lazysizes](https://github.com/aFarkas/lazysizes)
- [Modernizr](https://modernizr.com)
- [Waypoints](http://imakewebthings.com/waypoints/)

## Download & Config
Clone this project to your remote-device and configure all relevant options

### Modernizr
You can config needed [Modernizr](https://modernizr.com/) options in the file:
```
/webpack.config.js
```

#### JavaScript
All JavaScript´s from the `/asset/js/template` and `/asset/js/jquery` folder structure will be combined to a single JavaScript File. You can define options to minify this result by default.
If you need different libraries which are not placed in the `/asset/js/template` or `/asset/js/jquery` folders you can add references in `/asset/js/script.js`.

#### SASS Precompiler to CSS
The SASS-Files from `/asset/saas` compile to an single CSS file.

## Initiate the project
Run `npm i` to install all dependencies.
Modify the `Jenkinsfile` and set the Webhook for it `http://{$URL}/bitbucket-scmsource-hook/notify`

## Run NPM
Lastly run NPM and choose your developing method:
```
npm run dev
npm run watch
npm run prod
```

## Please give me feedback
I would appreciate any kind of feedback or ideas for further developments to keep improving the starterkit for your needs.
