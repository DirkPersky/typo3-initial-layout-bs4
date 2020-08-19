# Build modern and fast TYPO3 Websites with SASS, combined JavaScript and more!

This extensive boilerplate helps **you** to build fast, robust and modern website for the newest LTS version of the TYPO3 CMS. It provides you with fully working preconfigured enviroment to start working instantly. It streamlines many otherwise tedious tasks in TYPO3, like building a menu, including and creating all the folders for your Fluid Templates and many settings and stylings for often used extensions. 

Instead of writing and organizing dozens of files yourself, you have a soluid base system, and all yo uneed to do is make changes in the places you want 'em!

Additionally, there is a big focus on getting a high [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) ranking.  

## Requirements
- [NPM-Package manager](https://nodejs.org/)
- [TYPO3 9.5+](https://typo3.org/download/)

### Recommended TYPO3 Extensions
**Basics**
- [gridelements](https://extensions.typo3.org/extension/gridelements/)
- [dp_cookieconsent](https://github.com/DirkPersky/typo3-dp_cookieconsent)
- [cs_seo](https://extensions.typo3.org/extension/cs_seo/)

**Performance**
- [scriptmerger](https://extensions.typo3.org/extension/scriptmerger/)
- [sourceopt](https://extensions.typo3.org/extension/sourceopt/)
- [staticfilecache from **GitHub**](https://github.com/lochmueller/staticfilecache/)

**Optional**
- [rte_ckeditor_fontawesome](https://github.com/DirkPersky/typo3-rte-ckeditor-fontawesome)
- [news](https://extensions.typo3.org/extension/news/)
- [rlmp_language_detection](https://extensions.typo3.org/extension/rlmp_language_detection/)


### Included NPM-Packages
- [Bootstrap 4](http://getbootstrap.com/)
- [Font Awesome 5](https://fontawesome.com/)
- [Lazysizes](https://github.com/aFarkas/lazysizes)
- [Modernizr](https://modernizr.com)
- [Waypoints](http://imakewebthings.com/waypoints/)

## Download & Configure
To download, simply clone this repository.

### Initiate the project
Run `npm i` to install all dependencies.

### Run NPM
Lastly run NPM and choose your developing method:
```
npm run dev
npm run watch
npm run prod
```

This takes care all of the minifying and file-merging neccesary.

The files in `/asset/typ3conf` are *NOT* automatically included in your system. You *can* use them to replace the empty default configs that may be created by the system. You have to copy them to their paths manually.

When you want to ship your site to production, keep in mind that only the `app` folder is neccesary for your site. The asset folder is only needed for development, and may be ommited if desired. 

Alternatively you can use [Jenkins](https://jenkins.io/) to do that for you. Modify the `Jenkinsfile` and set the Webhook for it like this: `http://{$URL}/bitbucket-scmsource-hook/notify`

Make sure the `app` folder (or the contents of it) are in a path that is accesible by the webserver. Then include all the Configuartion files using `<INCLUDE_TYPOSCRIPT: source="FILE:/path/to/file>`.

The needed files are:
```
/app/Configuration/TypoScript/setup.txt
/app/Configuration/TypoScript/constant.txt
/app/Configuration/TSConfig/TSConfig.txt
```
All the other files will be included from within these three files.

**You should edit them** to include only the features you specifically need and comment everything out that you dont't.

### Modernizr
You can config needed [Modernizr](https://modernizr.com/) options in the file:
```
/webpack.config.js
```

### JavaScript
All JavaScript files from the `/asset/js/template` and `/asset/js/jquery` folders will be atomatically combined to a single JavaScript file. You can define options to modify that process.

If you need libraries that are not already placed inside the `/asset/js/template` or `/asset/js/jquery` folders, you can add references to those in `/asset/js/script.js`.

### SASS to CSS
The SASS-Files from `/asset/saas` will also be compiled into a single CSS file.

### TYPO 9.5 LTS Config.

**SEO**
Sites > Static Routes

**Robots.txt**
Sites > Static Text

### Robots.txt for development
```
User-Agent: *
Disallow: /
Disallow: /*datenschutz$
Disallow: /*impressum$
Disallow: /*agb$

User-Agent: Screaming Frog SEO Spider
Allow: /
Disallow: /*datenschutz$
Disallow: /*impressum$
Disallow: /*agb$

User-Agent: Seobility
Allow: /
Disallow: /*datenschutz$
Disallow: /*impressum$
Disallow: /*agb$
```

### Robots.txt for a live system
```
User-Agent: *
Allow: /

# folders
Disallow: /typo3/
Disallow: /typo3conf/
Allow: /typo3conf/ext/
Allow: /typo3temp/

# parameters
Disallow: /*?id=*               # non-realurl URLs
Disallow: /*cHash               # no cHash
Disallow: /*tx_powermail_pi1    # no powermail thanks pages
Disallow: /*tx_form_formframework    # no forms

# sitemap
Sitemap: http://example.org/sitemap.xml
```

### Clear History
```
git checkout --orphan temp_branch
git add -A
git commit -am "the first commit"
git branch -D master
git branch -m master
git push -f origin master
```

### BeUser Config:
```
### Loescht den FE-Cache
options.clearCache.pages = 1
### Loescht FE-Cache und Cache in typo3conf 
options.clearCache.all = 1

# Show NavTitle in Pagetree
options.pageTree.showNavTitle = 1
# Show Page ID's in Pagetree
options.pageTree.showPageIdWithTitle = 1
```

## Sitemap.xml
Page
```http://example.org/?type=1533906435```

## Please give me feedback

I appreciate any kind of feedback and ideas for further development. So I can keep improving the boilerplate for your needs.
