const klawSync = require('klaw-sync');
const path = require('path');
const async = require('async');

const tests = {};

let testName;
let dir;

function prepareTests() {
    let file;
    for (file of klawSync(path.resolve(__dirname+'/tests'), { depthLimit:1, nodir:true })) {

        if (!file.path.match(/[0-9]{3}/)) {
            continue;
        }

        testName = path.basename(file.path).replace(/\.js/, '');
        dir = path.dirname(file.path).split('/');
        dir = dir[dir.length-1];
        testName = dir+'/'+testName;
        tests[testName] = require(file.path);
    }
}

prepareTests();

async.mapSeries(
    tests,
    (test, next) => {
        test.run(next);
    }
);
