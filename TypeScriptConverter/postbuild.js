const fs = require('fs-extra');
const { zip } = require('zip-a-folder');

fs.copySync('./node_modules', './build/node_modules/');
fs.copySync('./package.json', './build/package.json');
fs.copySync('./package-lock.json', './build/package-lock.json');
zip('./build', './typescript-lambda.zip');