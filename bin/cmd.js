#!/usr/bin/env node
var subdeps = require('../');

var entry = process.argv[2] || process.cwd();;
var fs = require('fs');
var path = require('path');

if (fs.existsSync(entry)) {
    if (fs.statSync(entry).isDirectory()) {
        if (fs.existsSync(path.join(entry, 'package.json'))) {
            entry = path.join(entry, 'index.js');
        }
        else if (fs.existsSync(path.join(entry, 'index.js'))) {
            entry = path.join(entry, 'index.js');
        }
        else {
            console.error('not a file or package');
            process.exit(1);
        }
    }
}
else {
    console.error('file not found');
    process.exit(1);
}

var deps = subdeps.sync(entry);
var basedir = path.dirname(path.resolve(entry));
deps.forEach(function (dep) {
    var file = path.resolve(basedir, dep); 
    if (file.slice(0, basedir.length + 1) === basedir + '/') {
        file = '.' + file.slice(basedir.length);
    }
    console.log(file);
});
