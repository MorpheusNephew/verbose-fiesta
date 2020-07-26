const fs = require("fs-extra");
const path = require('path');

const prependCurrentDir = (filePath) => {
    return path.join(__dirname, filePath);
}

fs.copySync(prependCurrentDir('package.json'), prependCurrentDir('build/package.json'));
fs.copySync(prependCurrentDir('package-lock.json'), prependCurrentDir('build/package-lock.json'));
