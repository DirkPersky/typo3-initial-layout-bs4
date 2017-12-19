# Start Developing with SASS & combined JavaScript files for TYPO3
This project should help you to start developing with SASS and minified JavaScript to get an high [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) Ranking.

## Required
- NPM-Package manager

## Default used NPM-Modules
- [Bootstrap](http://getbootstrap.com/)
- [Font Awesome](https://fortawesome.github.io/Font-Awesome/)
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
All JavaScript´s from the `/assets/js/template` and `/assets/js/jquery` folder structure will be combined to a single JavaScript File. You can define options to minify this result by default.
If you need different libraries which are not placed in the `/assets/js/template` or `/assets/js/jquery` folders you can add references in `/assets/js/script.js`.

#### SASS Precompiler to CSS
The SASS-Files from `/assets/saas` compile to an single CSS file.

## Inital the Projekt
Run `npm i` to install all dependencies.

## Run NPM
Lastly run NPM and choose your developing method:
```
npm run dev
npm run watch
npm run prod
```

## Please give me feedback
I would appreciate any kind of feedback or ideas for further developments to keep improving the starterkit for your needs.
