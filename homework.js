const fs = require('fs-extra');


// Каждый пункт задания выполнил отдельно, но я понимаю, что например создать папку с файлом можно одно строчкой.
fs.emptyDirSync('./tmpDir');

const file = './tmpDir/tmpText.txt';
fs.ensureFileSync(file);

fs.emptyDirSync('./tmpDir_2');

fs.moveSync('./tmpDir/tmpText.txt', './tmpDir_2/tmpText.txt');

fs.emptyDirSync('./tmpDir_3');

fs.copySync('./tmpDir_2/tmpText.txt', './tmpDir_3/tmpText_copy.txt');

fs.removeSync('./tmpDir_2/tmpText.txt');
fs.removeSync('./tmpDir_3/tmpText_copy.txt');

fs.removeSync('./tmpDir');
fs.removeSync('./tmpDir_2');
fs.removeSync('./tmpDir_3');