# Start Developing with SASS & Combined JavaScript Files for TYPO3
This Porjekt shoud help you to start developing with SASS and minifyed JavaScripts to get an high Google Page Insight Ranking.

## Required
- NPM-Packacke Manager

## Default used NPM-Modules
- [Bootstrap](http://getbootstrap.com/)
- [Font Awesome](https://fortawesome.github.io/Font-Awesome/)
- [Lazysizes](https://github.com/aFarkas/lazysizes)
- [Modernizr](https://modernizr.com)
- [Waypoints](http://imakewebthings.com/waypoints/)

## Download & Config
Clone this Projekt to your Remote-Device and config all relevant Options

### Modernizr
You can config your needed [Modernizr](https://modernizr.com/) options in the file:
```
/webpack.config.js
```

#### JavaScripts
All JavaScript´s from the `/asses/js/template` and `/asses/js/jquery` Folder Strukture will be Combined to an singel JavaScript File. You cann define options to Minify this Result by setup:
If you need Diferent Libeys which are not places in the `/asses/js/template` or `/asses/js/jquery` Folder you can add this referenzen in the `/asses/js/script.js`.

#### SASS Precompiler to CSS
The SASS-File from `/asses/css/style.scss` compiled to an Single CSS File. You can define the Output bei configure:

## Inital the Projekt
run `npm i` to install all Dependencies.

## Run NPM
at least run NPM and chouse your developing method
```
npm run dev
npm run watch
npm run prod
```

## Please give me feedback
I would appreciate any kind of feedback or ideas for further developments to keep improving the Starterkit for your needs.
