const fs = require('fs-extra');

fs.copySync('./package.json', './build/package.json');
fs.copySync('./package-lock.json', './build/package-lock.json');
