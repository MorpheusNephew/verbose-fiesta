const fs = require('fs-extra');
const { zip } = require('zip-a-folder');


fs.copySync('./node_modules', './build/node_modules/');
zip('./build', './lambda.zip');