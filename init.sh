#!/bin/sh
npm install
node_modules/modernizr/bin/modernizr -c asset/js/config-modernizr.json -d app/Resources/Public/js/modernizr.min.js -u
bin/config

echo "Please run gulp to compile JavaScripts";
echo "Enter Kex to exit";
read key
