var installer  = require('gulp-install');
var rseq = require('run-sequence');
var rimraf = require('rimraf');
var git = require('gulp-git');
var async = require('async');
var gulp = require('gulp');
var fs = require('fs');

// CONFIG
var SOURCES_DIR = './src',
    SERVER_DIR = `${SOURCES_DIR}/server`;

// Function
function replaceConfig( file ){
    fs.readFile(file, function (err, contents) {
        var content = contents.toString().split('\n');
        var write = '';
        for (var i = 0; i < content.length; i++) {
            content[i] = content[i].replace(/config\/config\.js/, '../config');
            write += content[i] + "\n";
        }
        fs.writeFile(file, write);
    });
}

// GULP
gulp.task('server:update', (callback) => {
    async.series([
        _ => git.exec({args: `submodule deinit -f ${SERVER_DIR}`}, _),
        _ => git.updateSubmodule({ args: '--init --recursive' }, _)
    ], callback);
});

gulp.task('server:clear', (callback) => {
    async.parallel([
        _ => rimraf(`${SERVER_DIR}/config`, _),
        _ => async.concat(['README.md', '.eslintrc.js', 'CONTRIBUTING.md', '.gitignore'].map(x => `${SERVER_DIR}/${x}`), fs.unlink, _)
    ], callback);
});

gulp.task('server:install', (callback) => {
    async.parallel([
        _ => async.concat([
            'src/messages/initial.js', 
            'src/utils/math.js', 
            'index.js'
            ].map(x => `${SERVER_DIR}/${x}`), replaceConfig, _)
    ], callback);
    gulp.src([`${SERVER_DIR}/package.json`])
        .pipe(installer());
});

gulp.task('install', _ => rseq('server:update', ['server:clear', 'server:install'], _));