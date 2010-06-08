#!/bin/bash

java -jar yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar sitedev/js/global.js -o sitedev/js/global-min.js
java -jar yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar sitedev/css/global.css -o sitedev/css/global-min.css
java -jar yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar sitedev/css/plugins.css -o sitedev/css/plugins-min.css
